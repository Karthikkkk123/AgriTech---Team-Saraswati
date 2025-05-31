const fs = require("fs");
const path = require("path");

// Create supplies directory if it doesn't exist
const suppliesDir = path.join(__dirname, "../public/images/supplies");
if (!fs.existsSync(suppliesDir)) {
  fs.mkdirSync(suppliesDir, { recursive: true });
}

// List of required image names that match the farmSupplies data
const requiredImages = [
  "organic-fertilizer.jpg", // Premium Organic Fertilizer
  "drip-irrigation.jpg", // Advanced Drip Irrigation Kit
  "solar-pump.jpg", // Solar Water Pump
  "bio-pesticide.jpg", // Bio Pesticide Pack
  "mini-tractor.jpg", // Mini Tractor
  "soil-test-kit.jpg", // Smart Soil Testing Kit
  "polysheet.jpg", // Greenhouse Polysheet
  "sprayer.jpg", // Electric Sprayer
];

console.log("Required images for farm supplies:");
requiredImages.forEach((imageName, index) => {
  console.log(`${index + 1}. ${imageName}`);
});
