// export default function getCroppedImg(imageSrc, crop) {
//     return new Promise((resolve, reject) => {
//       const image = new Image();
//       image.src = imageSrc;
//       image.crossOrigin = "anonymous";
//       image.onload = () => {
//         const canvas = document.createElement("canvas");
//         canvas.width = crop.width;
//         canvas.height = crop.height;
//         const ctx = canvas.getContext("2d");
  
//         ctx.drawImage(
//           image,
//           crop.x,
//           crop.y,
//           crop.width,
//           crop.height,
//           0,
//           0,
//           crop.width,
//           crop.height
//         );
  
//         canvas.toBlob((blob) => {
//           if (!blob) {
//             reject(new Error("Canvas is empty"));
//             return;
//           }
//           resolve(blob);
//         }, "image/jpeg");
//       };
//       image.onerror = reject;
//     });
//   }

//   import React, { useState, useCallback } from "react";
//   import Cropper from "react-easy-crop";
//   import getCroppedImg from "./cropImage"; // Utility to extract the cropped image
  
//   export default function ImageUpload() {
//     const [file, setFile] = useState(null); // image URL
//     const [crop, setCrop] = useState({ x: 0, y: 0 });
//     const [zoom, setZoom] = useState(1);
//     const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//     const [croppedImage, setCroppedImage] = useState(null);
  
//     const handleImageUpload = (event) => {
//       const selectedFile = event.target.files[0];
//       if (selectedFile) {
//         setFile(URL.createObjectURL(selectedFile));
//         setCroppedImage(null); // reset on new upload
//       }
//     };
  
//     const onCropComplete = useCallback((_, croppedAreaPixels) => {
//       setCroppedAreaPixels(croppedAreaPixels);
//     }, []);
  
//     const showCroppedImage = useCallback(async () => {
//       try {
//         const croppedImg = await getCroppedImg(file, croppedAreaPixels);
//         setCroppedImage(URL.createObjectURL(croppedImg));
//       } catch (e) {
//         console.error(e);
//       }
//     }, [file, croppedAreaPixels]);
  
//     return (
//       <div className="file-upload">
//         <div className="upload-container">
//           <input type="file" className="file-input" onChange={handleImageUpload} />
  
//           {file && !croppedImage && (
//             <div style={{ position: "relative", width: 300, height: 300 }}>
//               <Cropper
//                 image={file}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={4 / 3}
//                 onCropChange={setCrop}
//                 onCropComplete={onCropComplete}
//                 onZoomChange={setZoom}
//               />
//               <button onClick={showCroppedImage} style={{ position: "absolute", bottom: 10, left: 10 }}>
//                 Crop Image
//               </button>
//             </div>
//           )}
  
//           {croppedImage && (
//             <div>
//               <h4>Cropped Image Preview:</h4>
//               <img src={croppedImage} alt="Cropped" style={{ width: 240, height: 180 }} />
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
  
  