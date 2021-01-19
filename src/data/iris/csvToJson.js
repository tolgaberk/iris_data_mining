#!/usr/bin/env node

// a script to convert csv file to a json object
// so i can import and work with it
const fs = require("fs");

const csv = fs.readFileSync(process.argv[2], "utf-8");

const rows = csv.split("\n");

// eliminate last empty row
rows[rows.length - 1].trim() === "" && rows.pop();

const headers = rows[0].split(",");
const json = [];

// loop every row and generate a object/dictionary from rows.
for (const row of rows.slice(1)) {
  const values = row.split(",");
  const obj = {};
  for (let i = 0; i < values.length; i += 1) {
    obj[headers[i]] = values[i];
  }
  json.push(obj);
}

fs.writeFileSync(
  process.argv[2].replace("./", "").split(".")[0] + ".json",
  JSON.stringify(json, null, 2)
);
