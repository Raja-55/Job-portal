import DataUriParser from "datauri/parser.js";
import path from "path";
import fs from "fs";

const getDataUri = (file) => {
  if (!file) return null;
  const parser = new DataUriParser();
  const originalName = file.originalname || file.filename || file.path || "";
  const extName = path.extname(originalName).toString();

  let buffer;
  if (file.buffer) buffer = file.buffer;
  else if (file.path) buffer = fs.readFileSync(file.path);
  else return null;

  return parser.format(extName, buffer);
};

export default getDataUri;
