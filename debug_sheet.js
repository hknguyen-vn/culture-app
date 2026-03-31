const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
require('dotenv').config({ path: '.env.local' });

async function debugSheet() {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  
  await sheet.loadHeaderRow();
  console.log("Sheet Title:", sheet.title);
  console.log("Headers:", sheet.headerValues);
  
  const rows = await sheet.getRows();
  if (rows.length > 0) {
    // console.log("First Row Data (Raw):", rows[0].toObject());
    console.log("First Row ID:", rows[0].get('id'));
    console.log("First Row Likes:", rows[0].get('likes'));
    console.log("Row Object Keys:", Object.keys(rows[0].toObject()));
  } else {
    console.log("No rows found.");
  }
}

debugSheet().catch(console.error);
