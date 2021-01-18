#!/usr/bin/env node

const fs = require("fs");

const csv = fs.readFileSync(process.argv[2], "utf-8");

const rows = csv.split("\n");

rows[rows.length - 1].trim() === "" && rows.pop();

const headers = rows[0].split(",");
const json = [];

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
