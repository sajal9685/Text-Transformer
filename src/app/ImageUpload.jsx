import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage"; // This must return a Blob

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setFinalImage(null);
    }
  };

  const onCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedBlob = await getCroppedImg(file, croppedAreaPixels);
      const croppedURL = URL.createObjectURL(croppedBlob);

      const template = new Image();
      template.crossOrigin = "anonymous";
      template.src = "/templates/image.png";

      template.onload = () => {
        const cropped = new Image();
        cropped.crossOrigin = "anonymous";
        cropped.src = croppedURL;

        cropped.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          canvas.width = template.width;
          canvas.height = template.height;

          // Draw template background
          ctx.drawImage(template, 0, 0);

          // Frame position (must match Canva layout)
          const frameX = 303;
          const frameY = 287;
          const frameWidth = 900;
          const frameHeight = 1140;

          // Insert cropped image into template frame
          ctx.drawImage(cropped, frameX, frameY, frameWidth, frameHeight);

          // Output result
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            setFinalImage(url);
          }, "image/png");
        };

        cropped.onerror = () => console.error("Error loading cropped image");
      };

      template.onerror = () => console.error("Error loading template image");
    } catch (e) {
      console.error("Crop processing failed:", e);
    }
  }, [file, croppedAreaPixels]);

  return (
    <div style={{ padding: 20 }}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {file && !finalImage && (
        <div style={{ position: "relative", width: 300, height: 300, marginTop: 20 }}>
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <Cropper
            image={file}
            crop={crop}
            zoom={zoom}
            aspect={390 / 460} // Match frame ratio
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
