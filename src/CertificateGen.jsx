import { useState, useRef, useEffect } from "react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import certificateBg from "./assets/dummycertificate.png";

const validNames = [
  "Nilanjan Pradhan",
  "Ananya Sharma",
  "Atmakuri Sree Harshini",
  "SAKTHI T",
  "PRADEEP S",
  "Nirnay Ghosh",
  "Harshi Adamya",
  "Ujjwal Jain",
  "Shankesh Raja V",
  "Merlyn Jennie G",
  "Vivek Varia",
  "Manav Maini",
  "Adithya Naik",
  "B Chaitanya Reddy",
  "Alok Kumar Sahoo",
  "Kanimozhi. K",
  "Sruthi",
  "OM",
  "Vaishnavi Lakade",
  "Gunjan Daiya",
  "vilasini",
  "Raj Patel",
  "Swetha G",
  "Apurva Khangal",
  "Jyotsna Priya B",
  "Juanita Grace Singh",
  "Suryansh Singh",
  "w karunakaran",
  "vishal",
  "Humayun Mirza",
  "Keerti",
  "Varkey Josu",
  "Rugved Kulkarni",
  "Jay Patel",
  "Dheeraj Ray",
  "Tanya Rishikesh",
  "Mohnish Joshi"
];


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

    // Ensure canvas has been updated with the background and text
    const image = await html2canvas(canvas, {
      scale: 2,  // Use higher scale for better resolution
    });

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
    img.crossOrigin = "Anonymous";  // Make sure the image is loaded correctly
    img.src = certificateBg;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Ensure the canvas is cleared before drawing
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#000";
      ctx.font = "48px 'Lavishly Yours', cursive";
      ctx.textAlign = "center";
      ctx.fillText(name, canvas.width / 2, 370);

      ctx.font = "20px sans-serif";
    };

    img.onerror = (error) => {
      console.error("Image loading failed", error);
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
        disabled={isValid}
      />

      <div className="flex gap-4 mb-10">
        <button onClick={checkName} className="bg-blue-500 text-white px-4 py-2 rounded">Check Name</button>
        <button
          onClick={() => {
            setName("");
            setIsValid(false);
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Try Another Name
        </button>
      </div>


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
