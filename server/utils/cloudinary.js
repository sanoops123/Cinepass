/*import { cloudinaryInstance } from "../config/cloudinaryConfig.js";

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
*/
import { cloudinaryInstance } from "../config/cloudinaryConfig.js";

export const handleImageUpload = async (path) => {
    try {
        console.log("Uploading image from path:", path);
        
        // Ensure the path is correct and the file exists
        if (!path) {
            throw new Error("File path is required for image upload");
        }

        // Upload the image to Cloudinary
        const uploadResult = await cloudinaryInstance.uploader.upload(path);
        console.log("Upload result:", uploadResult);
        
        // Return the image URL
        return uploadResult.url;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw new Error("Cloudinary upload failed");
    }
};
