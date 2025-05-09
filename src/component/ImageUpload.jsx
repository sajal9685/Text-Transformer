  import React, {useRef, useState } from "react";
import ReactCrop from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
  export default function ImageUpload() {
      const [file , setFile]=useState()
      const [crop, setCrop] = useState({ x: 0, y: 0 })
      const [zoom, setZoom] = useState(1)
        const imgRef = useRef(null);
      const handleImageUpload =(event) =>{
          setFile(URL.createObjectURL( event.target.files[0]))
      }
        const onImageLoaded = (img) => {
    imgRef.current = img;
  };
      
      const handleImageClick =(croppedArea, croppedAreaPixels) =>{
          console.log(croppedArea, croppedAreaPixels)
      }
   return (
      <div className="file-upload">
          <div className="upload-container">
              <div className="upload-icon">
                  <img width={240} height={240} src ={file} alt=""/>
              </div>
              
       {file && 
          <div className="col-6">
           
            <ReactCrop
              src={file}
              onImageLoaded={onImageLoaded}
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
            />
       
          </div>
        }
              <input 
              type="file"
              className="file-input"
              onChange={handleImageUpload}>
  
              </input>
          </div>
          </div>
   );
  }