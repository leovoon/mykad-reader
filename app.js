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

      const user = scanIC();

      console.log(`Done: ${user.Name}'s record saved.`);
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

  const user = extractInformation();

  return user;
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

  const user = {
    Name: result.Name.replace(/[^\w\s]/gi, "")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    IC: result.IC,
    Sex: result.Sex.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
    "Old IC": result["Old IC"],
    DOB: result.DOB,
    "State of birth": result["State of birth"]
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    "Validity Date": result["Validity Date"],
    Nationality: result.Nationality.toLowerCase().replace(/\b\w/g, (c) =>
      c.toUpperCase()
    ),
    "Ethnic/Race": result["Ethnic/Race"]
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    Religion: result.Religion.toLowerCase().replace(/\b\w/g, (c) =>
      c.toUpperCase()
    ),
    Address: result.Address.toLowerCase().replace(/\b\w/g, (c) =>
      c.toUpperCase()
    ),
  };

  console.log({ user });

  return user;
}
