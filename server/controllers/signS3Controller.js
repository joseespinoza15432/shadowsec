// server/controllers/signS3Controller.js
import { s3Client } from "../utils/s3Client.js";
import { v4 as uuidv4 } from "uuid";

export const handleSignS3 = async (req, res) => {
  try {
    const { filename } = req.body;
    const key = `${Date.now()}-${uuidv4()}-${filename}`;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Expires: 60,
      ContentType: "application/octet-stream",
    };

    const uploadUrl = await s3Client.getSignedUrlPromise("putObject", params);

    res.status(200).json({ uploadUrl, objectKey: key });
  } catch (err) {
    console.error("S3 signing error:", err);
    res.status(500).json({ error: "Failed to generate presigned URL" });
  }
};
