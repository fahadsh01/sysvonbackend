import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileuploader = async (file) => {
  try {
    if (!file) return null;
    const response = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    fs.unlinkSync(file);
    return response;
  } catch (error) {
    fs.unlinkSync(file);
    return null;
  }
};
const deleteFile = async (publicId) => {
  try {
    if (!publicId) return null;

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      console.warn(`Cloudinary did not delete the image: ${publicId}`);
    } else {
      console.log(`Image deleted: ${publicId}`);
    }
    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error.message);
    return null;
  }
};

export { fileuploader, deleteFile };
