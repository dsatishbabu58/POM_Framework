const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Format: random five-digit number
const randomSuffix = Math.floor(10000 + Math.random() * 90000).toString();
const email = `satish.${randomSuffix}@gmail.com`;
const wb = XLSX.utils.book_new();
const data = [
  ['First name', 'Last name', 'Email', 'Password', 'Confirm password'],
  ['Babu', 'satish', email, '12345678', '12345678'],
];
const ws = XLSX.utils.aoa_to_sheet(data);
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
const outputPath = path.join(dataDir, 'login-validation.xlsx');
XLSX.writeFile(wb, outputPath);
console.log('Created', outputPath);
console.log('Email used:', email);
