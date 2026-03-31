const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
require('dotenv').config({ path: '.env.local' });

async function fixSheet() {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  await sheet.loadHeaderRow();
  
  if (!sheet.headerValues.includes('likes')) {
    console.log("Adding 'likes' column...");
    await sheet.setHeaderRow([...sheet.headerValues, 'likes']);
    console.log("Column added successfully.");
  } else {
    console.log("'likes' column already exists.");
  }
}

fixSheet().catch(console.error);
