import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setCroppedImage(null);
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(file, croppedAreaPixels);
      setCroppedImage(URL.createObjectURL(croppedImg));
    } catch (e) {
      console.error(e);
    }
  }, [file, croppedAreaPixels]);

  return (
    <div className="file-upload">
      <div className="upload-container">
        <input
          type="file"
          className="file-input"
          onChange={handleImageUpload}
        />

        {file && !croppedImage && (
          <div style={{ position: "relative", width: 300, height: 300 }}>
            <Cropper
              image={file}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            <button
              onClick={showCroppedImage}
              style={{ position: "absolute", bottom: 10, left: 10 }}
            >
              Crop Image
            </button>
          </div>
        )}

        {croppedImage && (
          <div>
            <h4>Cropped Image Preview:</h4>
            <div p-10>
              {" "}
              <img
                src={croppedImage}
                alt="Cropped"
                style={{ width: 240, height: 180 }}
              />
            </div>
          </div>
        )}
        <br></br>
      </div>
    </div>
  );
}
