const fs = require('fs');
const path = require('path');

const timingFileName = '.timing';
const timingFilePath = path.join(__dirname, timingFileName);
const doesTimingFileExist = fs.existsSync(timingFilePath);

const isStarting = process.argv[2] === 'start';

if (isStarting) {
  fs.writeFileSync(timingFilePath, `${Date.now()}`, `utf8`);
}

if (!isStarting && doesTimingFileExist) {
  const end = Date.now();
  const start = fs.readFileSync(timingFilePath);
  fs.unlinkSync(timingFilePath);
  console.log(`\n\x1b[35mTotal time: ${(end - start) / 1000}s ⌛\x1b[0m\n`);
}
