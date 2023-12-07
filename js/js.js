const { google } = require('googleapis');

exports.handler = async (event) => {
    const requestBody = JSON.parse(event.body);

    // Initialize Google Sheets API
    const sheets = google.sheets({ version: 'v4' });

    // Add your Google Sheets API credentials and spreadsheetId
    const auth = new google.auth.GoogleAuth({
        keyFile: 'path/to/your/credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheetsApi = await sheets.spreadsheets.values.append({
        spreadsheetId: 'your-spreadsheet-id',
        range: 'Sheet1', // Change to the actual sheet name
        valueInputOption: 'RAW',
        resource: {
            values: [
                [
                    requestBody.firstName,
                    requestBody.lastName,
                    requestBody.email,
                    requestBody.subject,
                    requestBody.message,
                ],
            ],
        },
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Form submitted successfully!' }),
    };
};
