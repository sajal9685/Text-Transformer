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
//   import React, { useState } from "react";
//   import Cropper from 'react-easy-crop'
//   export default function ImageUpload() {
//       const [file , setFile]=useState()
//       const [crop, setCrop] = useState({ x: 0, y: 0 })
//       const [zoom, setZoom] = useState(1)
//       const handleImageUpload =(event) =>{
//           setFile(URL.createObjectURL( event.target.files[0]))
//       }
      
//       const handleImageClick =(croppedArea, croppedAreaPixels) =>{
//           console.log(croppedArea, croppedAreaPixels)
//       }
//    return (
//       <div className="file-upload">
//           <div className="upload-container">
//               <div className="upload-icon">
//                   <img width={240} height={240} src ={file} alt=""/>
//                   <Cropper
//         image={file}
//         crop={crop}
//         zoom={zoom}
//         aspect={4 / 3}
//         onCropChange={setCrop}
//         onCropComplete={handleImageClick}
//         onZoomChange={setZoom}
//       />
//               </div>
//               <input 
//               type="file"
//               className="file-input"
//               onChange={handleImageUpload}>
  
//               </input>
//           </div>
//           </div>
//    );
//   }
//   import react, {useRef, useState } from "react";
// import ReactCrop from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
// const ImageUpload = () => {
//   const [src, selectFile] = useState(null);
//   const [crop, setCrop] = useState({
//     unit: 'px',
//     x: 0,
//     y: 0,
//     width: 100,
//     height: 100,
//     aspect: 16 / 9,
//   });
  
//   const [image, setImage] = useState(null);
//   const [result, setResult]=useState(null);
//   const imgRef = useRef(null);
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       console.log("Selected Image URL:", imageUrl);
//       selectFile(imageUrl);
//     }
//   };
//   function getCroppedImage() {
//     const canvas = document.createElement("canvas");
//     const scaleX=image.naturalWidth /image.width;
//     const scaleY=image.naturalHeight /image.height;
//     canvas.width = crop.width;
//     canvas.height = crop.height;
//     const ctx = canvas.getContext("2d");

//     ctx.drawImage(
//     imgRef.current,
//       crop.x *scaleX,
//       crop.y * scaleY,
//       crop.width*scaleX,
//       crop.height*scaleY,
//       0,
//       0,
//       crop.width,
//       crop.height
//     );
// const base64Image =canvas.toDataURL('image/jpeg');
//             setResult(base64Image)
//   }
//   const onImageLoaded = (img) => {
//     imgRef.current = img;
//   };
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-6">
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//         </div>

//         {src && 
//           <div className="col-6">
           
//             <ReactCrop
//               src={src}
//               onImageLoaded={onImageLoaded}
//               crop={crop}
//               onChange={(newCrop) => setCrop(newCrop)}
//             />
//             <button className="btn btn-danger" onClick={getCroppedImage}>
//               CropImage
//             </button>
//           </div>
//         }
//         {result && <div className="col-6">
//             <img src={result} alt="crop image"className="img-fluid"/>
//         </div>
//             }
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;
