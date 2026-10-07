const fs = require("fs");
const path = require("path");

const graphDir = path.join(__dirname, "../public/img/UX");
const outputFile = path.join(__dirname, "../src/datas/projetsUX.json");

const extensions = [".webp"];

const files = fs
  .readdirSync(graphDir)
  .filter((file) => extensions.includes(path.extname(file).toLowerCase()))
  .sort();

fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));

//console.log(`✓ ${files.length} images trouvées → projetsUX.json`);
