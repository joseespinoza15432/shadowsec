import mongoose from "mongoose";

const EncryptedFileSchema = new mongoose.Schema({
  objectKey: { type: String, required: true, unique: true },
  originalFilename: { type: String, required: true },
  salt: { type: String, required: true }, // base64 or hex
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("EncryptedFile", EncryptedFileSchema);
