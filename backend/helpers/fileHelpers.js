const path = require("path");
const fs = require("fs/promises");
const { BASE_URL } = require("../consts");

const saveFile = async (file, folderName) => {
  const fileName = Date.now() + "-" + file.name;
  const savePath = path.join(__dirname, "../uploads", folderName, fileName);
  await file.mv(savePath);
  return `${BASE_URL}/uploads/${folderName}/${fileName}`;
};

const deleteFile = async (url, folderName) => {
  const fileName = path.basename(url);
  const folderPath = path.join(__dirname, "../uploads", folderName);
  const filesInFolder = await fs.readdir(folderPath);

  if (filesInFolder.includes(fileName)) {
    const deletePath = path.join(folderPath, fileName);
    await fs.unlink(deletePath);
  }
};

module.exports = { saveFile, deleteFile };
