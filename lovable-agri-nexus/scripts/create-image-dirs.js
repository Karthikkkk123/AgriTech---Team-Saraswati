const fs = require("fs");
const path = require("path");

// Define the base directory for images
const baseDir = path.join(__dirname, "../public/images/land");

// Create directories if they don't exist
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
  console.log("Created directory:", baseDir);
}

// Sample images URLs (replace these with your actual farm images)
const sampleImages = {
  "punjab-farm.jpg":
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2",
  "kerala-spice.jpg":
    "https://images.unsplash.com/photo-1530267981375-f09e0f45b07c",
  "maharashtra-farm.jpg":
    "https://images.unsplash.com/photo-1500076656116-558758c991c1",
  "karnataka-farm.jpg":
    "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9",
  "gujarat-farm.jpg":
    "https://images.unsplash.com/photo-1559333086-b0a56225a93c",
  "coastal-farm.jpg":
    "https://images.unsplash.com/photo-1559533077-4dc3f7b50370",
  "mountain-farm.jpg":
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  "rice-farm.jpg":
    "https://images.unsplash.com/photo-1567834788186-076c45f23888",
  "tea-estate.jpg":
    "https://images.unsplash.com/photo-1582126892906-5ba111b3c9dd",
  "mango-farm.jpg":
    "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e",
};
