import EncryptedFile from "../models/EncryptedFile.js";

export const saveFileMetadata = async (req, res) => {
  try {
    const { objectKey, originalFilename, salt } = req.body;

    if (!objectKey || !originalFilename || !salt) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newFile = new EncryptedFile({ objectKey, originalFilename, salt });
    await newFile.save();

    res.status(201).json({ message: "Metadata saved successfully" });
  } catch (err) {
    console.error("Save metadata error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllFiles = async (req, res) => {
  try {
    const files = await EncryptedFile.find().sort({ uploadedAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch files" });
  }
};
