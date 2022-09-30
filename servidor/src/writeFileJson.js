const fs = require("fs");
function writeFileJson(file,data) {
    fs.writeFile(
        file,
        JSON.stringify(data, null, 4),
        "utf-8",
        (error, data) => {
          if (error) {
            console.error(error);
            return;
          }
        }
      );
}

module.exports = { writeFileJson };
