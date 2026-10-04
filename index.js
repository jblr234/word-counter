import { readFile } from "fs/promises";
import path from "path";

// 1. Kuhaa ang filename gikan sa command line
const filename = process.argv[2];

// 2. Kung walay filename, pakita ang help message ug undang
if (!filename) {
  console.log("Palihug maghatag og filename.");
  console.log("Usage: npm start <filename>");
  console.log("Example: npm start sample.txt");
  process.exit(1);
}

try {
  // 3. Basaha ang file
  const filePath = path.resolve(filename);
  const text = await readFile(filePath, "utf-8");

  // 4. Pag-ihap
  const lineList = text.split(/\r?\n/);
  if (lineList[lineList.length - 1] === "") lineList.pop();

  const lines = lineList.length;
  const words = text.split(/\s+/).filter(Boolean).length;
  const characters = text.length;

  // 5. I-print ang summary
  console.log(`File: ${filename}`);
  console.log(`Lines: ${lines}`);
  console.log(`Words: ${words}`);
  console.log(`Characters: ${characters}`);
} catch (error) {
  if (error.code === "ENOENT") {
    console.error(`Error: Wala makita ang file "${filename}".`);
  } else {
    console.error(`Error: ${error.message}`);
  }
  process.exit(1);
}