import { useState } from "react";
import { toast } from "sonner";
import Compressor from "compressorjs";

const usePreviewImage = () => {
  const [previewImgUrl, setPreviewImgUrl] = useState<string | null>(null);

    // const compressImage = async (file) => {
    //     return new Promise((resolve, reject) => {
    //         // Adjust quality based on original file size
    //         const initialQuality =  0.5
    //                                 // file.size > 500 * 1024 ? 0.5 :  // >500KB
    //                                 // file.size > 400 * 1024 ? 0.6 :  // >400KB
    //                                 // file.size > 300 * 1024 ? 0.7 :  // >300KB
    //                                 // file.size > 150 * 1024 ? 0.8 :  // >150KB
    //                                 // file.size > 50 * 1024 ? 0.9 :   // 50-150KB
    //                                 // 0.9;                            // <50KB

    //         new Compressor(file, {
    //             quality: initialQuality,
    //             width: 100,
    //             height: 100,
    //             convertSize: 100000, // Only convert to JPEG if >100KB
    //             mimeType: 'image/jpeg',
    //             success(result) {
    //                 // Accept if between 20-50KB
    //                 if (result.size >= 20 * 1024 && result.size <= 50 * 1024) {
    //                     resolve(result);
    //                 } else {
    //                     // Adjust quality dynamically
    //                     const newQuality = result.size > 50 * 1024 ? 
    //                         initialQuality * 0.8 : 
    //                         Math.min(0.9, initialQuality * 1.1);

    //                     new Compressor(file, {
    //                         quality: newQuality,
    //                         width: 100,
    //                         height: 100,
    //                         mimeType: 'image/jpeg',
    //                         success(finalResult) {
    //                             resolve(finalResult);
    //                         },
    //                         error(err) {
    //                             reject(err);
    //                         }
    //                     });
    //                 }
    //             },
    //             error(err) {
    //                 reject(err);
    //             },
    //         });
    //     });
    // };




    const compressImage = async (file: File) => {
        return new Promise((resolve, reject) => {
          const initialQuality = 0.8; // Start with good quality
      
          new Compressor(file, {
            quality: initialQuality,
            convertSize: 500 * 1024, // Convert only if >500KB
            maxWidth: 600,           // Limit width but not too small
            maxHeight: 600,          // Keep a decent size
            mimeType: 'image/jpeg',
            success(result) {
              // If the result is still too big, retry with lower quality
              if (result.size > 200 * 1024) {
                new Compressor(file, {
                  quality: 0.6, // retry with lower quality
                  maxWidth: 600,
                  maxHeight: 600,
                  mimeType: 'image/jpeg',
                  success(finalResult) {
                    resolve(finalResult);
                  },
                  error(err) {
                    reject(err);
                  }
                });
              } else {
                resolve(result);
              }
            },
            error(err) {
              reject(err);
            }
          });
        });
      };

      

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            toast.error("No files selected. Please select an image file.");
            return;
        }
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Invalid file type. Please select an image file");
            return;
        }

        try {
            const compressedFile = await compressImage(file);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImgUrl(reader.result as string);
            };
            reader.readAsDataURL(compressedFile as Blob);
            // reader.readAsDataURL(file);

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

    console.log("previewImgUrl", previewImgUrl)

    return { handleImageChange, previewImgUrl, setPreviewImgUrl };
};




export default usePreviewImage;