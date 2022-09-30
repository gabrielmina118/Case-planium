const fs = require("fs");
function readFileJson(file) {
  try {
    let content = fs.readFileSync(file, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { readFileJson };
