// Paste into Extensions → Apps Script of your Google Sheet, then
// Deploy → New deployment → Web app → Execute as: Me, Access: Anyone.
// Copy the web-app URL into NUXT_SHEET_WEBHOOK_URL in .env.
// Optional: set NOTIFY_EMAIL to also get an email for every lead (free, no SMTP needed).

const NOTIFY_EMAIL = 'info@vanchers.com' // e.g. ''

function doPost(e) {
  const data = JSON.parse(e.postData.contents)
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Submitted At', 'Name', 'Phone', 'Email', 'Project', 'Visit Date', 'Message'])
  }
  sheet.appendRow([data.submittedAt, data.name, data.phone, data.email, data.project, data.visitDate, data.message])

  if (NOTIFY_EMAIL) {
    MailApp.sendEmail(NOTIFY_EMAIL, 'New consultation request — ' + data.name,
      Object.keys(data).map(k => k + ': ' + (data[k] || '—')).join('\n'))
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON)
}
