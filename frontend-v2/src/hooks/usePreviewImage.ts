import { useState } from "react";
import { toast } from "sonner";
import Compressor from "compressorjs";

const usePreviewImage = () => {
    const [previewImgUrl, setPreviewImgUrl] = useState(null);

    const compressImage = async (file) => {
        return new Promise((resolve, reject) => {
            // Adjust quality based on original file size
            const initialQuality = file.size > 150 * 1024 ? 0.8 :  // >150KB
                                  file.size > 50 * 1024 ? 0.9 :    // 50-150KB
                                  0.9;                             // <50KB

            new Compressor(file, {
                quality: initialQuality,
                width: 100,
                height: 100,
                convertSize: 100000, // Only convert to JPEG if >100KB
                mimeType: 'image/jpeg',
                success(result) {
                    // Accept if between 20-50KB
                    if (result.size >= 20 * 1024 && result.size <= 50 * 1024) {
                        resolve(result);
                    } else {
                        // Adjust quality dynamically
                        const newQuality = result.size > 50 * 1024 ? 
                            initialQuality * 0.8 : 
                            Math.min(0.9, initialQuality * 1.1);

                        new Compressor(file, {
                            quality: newQuality,
                            width: 100,
                            height: 100,
                            mimeType: 'image/jpeg',
                            success(finalResult) {
                                resolve(finalResult);
                            },
                            error(err) {
                                reject(err);
                            }
                        });
                    }
                },
                error(err) {
                    reject(err);
                },
            });
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Invalid file type. Please select an image file");
            return;
        }

        try {
            // const compressedFile = await compressImage(file);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImgUrl(reader.result);
            };
            // reader.readAsDataURL(compressedFile);
            reader.readAsDataURL(file);

            // console.log(
            //     `Original: ${(file.size / 1024).toFixed(2)}KB | ` +
            //     `Compressed: ${(compressedFile.size / 1024).toFixed(2)}KB | ` +
            //     `Dimensions: 100x100px`
            // );

        } catch (error) {
            toast(`${error}` || "Failed to compress image");
            setPreviewImgUrl(null);
        }
    };

    return { handleImageChange, previewImgUrl, setPreviewImgUrl };
};

export default usePreviewImage;