const fs = require("fs");
const { exec } = require("child_process");

const cwd = process.cwd();
const resultFile = `${cwd}/tools/output.txt`;

function extractInformation() {
  const data = fs.readFileSync(resultFile, "utf8");

  const patterns = [
    { key: "Name", pattern: /Name:\s+(.*)/ },
    { key: "IC", pattern: /IC:\s+(.*)/ },
    { key: "Sex", pattern: /Sex:\s+(.*)/ },
    { key: "Old IC", pattern: /Old IC:\s*(.?)\s/ },
    { key: "DOB", pattern: /DOB:\s+(.*)/ },
    { key: "State of birth", pattern: /State of birth:\s+(.*)/ },
    { key: "Validity Date", pattern: /Validity Date:\s+(.*)/ },
    { key: "Nationality", pattern: /Nationality:\s+(.*)/ },
    { key: "Ethnic/Race", pattern: /Ethnic\/Race:\s+(.*)/ },
    { key: "Religion", pattern: /Religion:\s+(.*)/ },
    { key: "Address", pattern: /Address:\s+([\s\S]*?)(?=Reading JPN file 5)/m },
  ];

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

  fs.writeFileSync(`${cwd}/tools/user.json`, JSON.stringify(result));
}

function scanIC() {
  const bat = exec(`${cwd}/tools/automatic_reader.bat`, (error) => {
    if (error) {
      console.log(error);
      return;
    }

    extractInformation();
  });

  bat.stdout.on("data", (data) => {
    console.log(data.toString());
  });
}

scanIC();
