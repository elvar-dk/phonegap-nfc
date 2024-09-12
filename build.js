const fs = require("fs");

const destinationFolder = "out";
if (fs.existsSync(destinationFolder)) {
  fs.rmSync(destinationFolder, { recursive: true, force: true });
}
fs.mkdirSync(destinationFolder);

const ignore_exact = [
  destinationFolder,
  "build.js",
  ".git",
  ".gitignore",
  "package-lock.json",
  "doc",
  "tests",
];
const ignore_file_extension = [
  ".tar.gz",
];
const filenames = fs.readdirSync(__dirname);
const filteredFilenames = filenames.filter((filename) => {
  if (ignore_exact.includes(filename)) {
    return false;
  }

  let ignore = false;
  ignore_file_extension.some(
    (fileExtension) => {
      if (filename.endsWith(fileExtension)) {
        ignore = true;
      }
      return ignore;
    }
  );

  if (ignore) {
    return false;
  }

  return true;
});
filteredFilenames.forEach((filename) => {
  fs.cpSync(filename, `${destinationFolder}/${filename}`, {
    recursive: true,
    force: true,
  });
});
