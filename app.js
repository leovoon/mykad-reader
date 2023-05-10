import pcsclite from "pcsclite";
import fs from "fs";
import { execSync } from "child_process";
import { outputFile, outputUserFile, patterns, runFile } from "./const.js";

const pcsc = pcsclite();

pcsc.on("reader", (reader) => {
  console.log(`Reader '${reader.name}' detected`);

  reader.on("status", (status) => {
    const changes = reader.state ^ status.state;

    if (
      changes & reader.SCARD_STATE_PRESENT &&
      status.state & reader.SCARD_STATE_PRESENT
    ) {
      console.log("Card inserted");

      scanIC();

      const user = JSON.parse(fs.readFileSync(outputUserFile));

      console.log(`Done: ${user.Name}'s information saved.`);
    }

    if (
      changes & reader.SCARD_STATE_EMPTY &&
      status.state & reader.SCARD_STATE_EMPTY
    ) {
      console.log("Card removed");
    }
  });
});

function scanIC() {
  const response = execSync(runFile, (error) => {
    if (error) {
      console.log(error);
      return;
    }
  });

  if (!response) return;

  extractInformation();
}

function extractInformation() {
  const data = fs.readFileSync(outputFile, "utf8");

  const result = patterns.reduce((acc, { key, pattern }) => {
    const match = data.match(pattern);

    if (match) {
      acc[key] = match[1]
        .trim()
        .replace(/[\r\n]+/g, ", ")
        .replace(/\t/g, " ");
    }

    return acc;
  }, {});

  fs.writeFileSync(outputUserFile, JSON.stringify(result));
}
