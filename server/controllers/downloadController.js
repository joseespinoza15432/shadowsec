import { s3Client, uploadFileToS3 } from "../utils/s3Client.js";

export const handleDownload = async (req, res) => {
  const key = req.params.key;
  if (!key) return res.status(400).json({ error: "No key provided" });

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Expires: 60 * 5, // 5 minute expiration
  };

  try {
    const url = await s3Client.getSignedUrlPromise("getObject", params);
    res.status(200).json({ url });
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Could not generate download" });
  }
};
