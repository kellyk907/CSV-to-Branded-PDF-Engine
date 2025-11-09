// test-flashcards.js
// Run with: node test-flashcards.js
// Requires: npm install axios form-data fs

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const URL = 'https://bilingual-flashcard-generator.vercel.app/api/generate'; // Update if your API route differs
const ROWS = 1000;

// 1. Generate dummy CSV
function generateCSV() {
  let csv = 'term,definition,language,image\n';
  for (let i = 1; i <= ROWS; i++) {
    csv += `Term ${i},Definition ${i},es,https://via.placeholder.com/150\n`;
  }
  const filePath = path.join(__dirname, 'test-1000-rows.csv');
  fs.writeFileSync(filePath, csv);
  console.log(`Generated ${ROWS}-row CSV`);
  return filePath;
}

// 2. Upload & measure time
async function uploadAndTime(csvPath) {
  const form = new FormData();
  form.append('file', fs.createReadStream(csvPath));

  console.log('Uploading...');
  const start = Date.now();

  try {
    const response = await axios.post(URL, form, {
      headers: form.getHeaders(),
      responseType: 'arraybuffer',
      timeout: 30000,
    });

    const end = Date.now();
    const duration = ((end - start) / 1000).toFixed(2);

    // Save PDF for proof
    const pdfPath = path.join(__dirname, `flashcards-${ROWS}-rows.pdf`);
    fs.writeFileSync(pdfPath, response.data);

    console.log(`PDF generated: ${pdfPath}`);
    console.log(`\n✅ ${ROWS} rows → ${ROWS * 2} cards in ${duration} seconds\n`);

    // Recruiter-ready one-liner
    console.log(`Copy-paste: **Parses ${ROWS} rows + renders ${ROWS * 2} PDF cards in ${duration}s**`);
  } catch (err) {
    console.error('Failed:', err.message);
  }
}

// Run
const csvFile = generateCSV();
uploadAndTime(csvFile);
