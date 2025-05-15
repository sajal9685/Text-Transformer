import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage"; // Keep this in the same folder

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [finalImage, setFinalImage] = useState(null);

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setFinalImage(null);
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

 const showCroppedImage = useCallback(async () => {
  try {
    const croppedBlob = await getCroppedImg(file, croppedAreaPixels);
    const croppedURL = URL.createObjectURL(croppedBlob);

    const template = new Image();
    template.crossOrigin = "anonymous";
    template.src = "/templates/10.png";

    template.onload = () => {
      const cropped = new Image();
      cropped.crossOrigin = "anonymous";
      cropped.src = croppedURL;

      cropped.onload = () => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = template.width;
        canvas.height = template.height;

        ctx.drawImage(template, 0, 0);

        const frameX = 185;
        const frameY = 142;
        const frameWidth = 390;
        const frameHeight = 460;

        ctx.drawImage(cropped, frameX, frameY, frameWidth, frameHeight);

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setFinalImage(url);
        });
      };

      cropped.onerror = (err) => console.error("Error loading cropped image:", err);
    };

    template.onerror = (err) => console.error("Error loading template image:", err);
  } catch (e) {
    console.error("Cropping error:", e);
  }
}, [file, croppedAreaPixels]);


  return (
    <div style={{ padding: 20 }}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {file && !finalImage && (
        <div style={{ position: "relative", width: 300, height: 300, marginTop: 20 }}>
          <canvas id="canvas" style={{ display: "none" }} />
          <Cropper
            image={file}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <button
            onClick={showCroppedImage}
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              padding: "6px 12px",
              background: "#333",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Crop & Insert
          </button>
        </div>
      )}

      {finalImage && (
        <div style={{ marginTop: 20 }}>
          <h4>Final Image:</h4>
          <img src={finalImage} alt="Result" style={{ width: 300, border: "1px solid #ccc" }} />
          <br />
          <a href={finalImage} download="framed-output.png">
            <button style={{ marginTop: 10 }}>Download</button>
          </a>
        </div>
      )}
    </div>
  );
}
