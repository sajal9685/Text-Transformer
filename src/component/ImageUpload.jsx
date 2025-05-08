import React, { useState } from "react";
import Cropper from 'react-easy-crop'
export default function ImageUpload() {
    const [file , setFile]=useState()
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const handleImageUpload =(event) =>{
        setFile(URL.createObjectURL( event.target.files[0]))
    }
    
    const handleImageClick =(croppedArea, croppedAreaPixels) =>{
        console.log(croppedArea, croppedAreaPixels)
    }
 return (
    <div className="file-upload">
        <div className="upload-container">
            <div className="upload-icon">
                <img width={240} height={240} src ={file} alt=""/>
                <Cropper
      image={file}
      crop={crop}
      zoom={zoom}
      aspect={4 / 3}
      onCropChange={setCrop}
      onCropComplete={handleImageClick}
      onZoomChange={setZoom}
    />
            </div>
            <input 
            type="file"
            className="file-input"
            onChange={handleImageUpload}>

            </input>
        </div>
        </div>
 );
}