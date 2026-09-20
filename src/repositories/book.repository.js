const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "..", "..", "data", "books.json");

function readBooksFromFile() {
  if (!fs.existsSync(FILE_PATH)) {
    const dir = path.dirname(FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function saveBooksToFile(books) {
  const dir = path.dirname(FILE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(FILE_PATH, JSON.stringify(books, null, 2));
}

module.exports = {
  readBooksFromFile,
  saveBooksToFile
};