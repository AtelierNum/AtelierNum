let crypto = require("crypto");
let sha = crypto.createHash("sha256");
let fs = require("fs").promises;
let { join } = require("path");

fs.readFile(join(__dirname, "..", "db.json")).then((dbStr) => {
  sha.update(dbStr);
  const hash = sha.digest("hex");
  fs.writeFile(join(__dirname, "..", "db.sha256"), hash);
});
