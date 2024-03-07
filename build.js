const fs = require("fs");

const destinationFolder = "out";
if (fs.existsSync(destinationFolder)) {
  fs.rmSync(destinationFolder, { recursive: true, force: true });
}
fs.mkdirSync(destinationFolder);

const ignore = [
  destinationFolder,
  "build.js",
  ".git",
  ".gitignore",
  "package-lock.json",
  "doc",
  "tests",
];
const filenames = fs.readdirSync(__dirname);
const filteredFilenames = filenames.filter((filename) => {
  return !ignore.includes(filename);
});
filteredFilenames.forEach((filename) => {
  fs.cpSync(filename, `${destinationFolder}/${filename}`, {
    recursive: true,
    force: true,
  });
});
