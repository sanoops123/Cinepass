import { cloudinaryInstance } from "../config/cloudinaryConfig.js";

export const handleImageUpload = async (path) => {
    try {
        console.log("path ==",path);
        
        const uploadResult = await cloudinaryInstance.uploader.upload(path);
        return uploadResult.url;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:",error);
        next(error)
    }
};