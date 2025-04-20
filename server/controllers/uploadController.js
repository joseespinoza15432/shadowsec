import { s3Client, uploadFileToS3 } from "../utils/s3Client.js";

export const handleUpload = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const key = `${Date.now()}-${file.originalname}`;

    await uploadFileToS3(file.buffer, key, file.mimetype);

    res.status(200).json({ message: "File uploaded successfully", key });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};
