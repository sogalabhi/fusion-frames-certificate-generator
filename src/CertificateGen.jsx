import { useState, useRef, useEffect } from "react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import certificateBg from "./assets/certificate.png";

const validNames = ["Alice Johnson", "Bob Smith", "Charlie Davis"];

export default function CertificateGenerator() {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const canvasRef = useRef(null);

  const checkName = () => {
    setIsValid(validNames.includes(name));
  };

  const downloadCertificate = async () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const image = await html2canvas(canvas);
    image.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `${name}-certificate.png`);
      }
    });
  };

  useEffect(() => {
    if (!isValid) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = certificateBg;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#000";
      ctx.font = "48px 'Lavishly Yours', cursive";
      ctx.textAlign = "center";
      ctx.fillText(name, canvas.width / 2, 330);
      
      ctx.font = "20px sans-serif";
    };
  }, [isValid, name]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Fusion Frames Certificate Generator</h1>
      <input
        type="text"
        placeholder="Enter your name"
        className="border p-2 rounded mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={checkName} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Check Name</button>
      {isValid && (
        <>
          <canvas ref={canvasRef} width={800} height={600} className="border shadow-lg rounded-lg" />
          <button onClick={downloadCertificate} className="bg-green-500 text-white px-4 py-2 rounded mt-4">Download Certificate</button>
        </>
      )}
      {!isValid && name && <p className="text-red-500 mt-2">Name not found in the list.</p>}
    </div>
  );
}