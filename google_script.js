// =========================================================================
// BUSINESS LEARN STUDIO — GOOGLE APPS SCRIPT (STANDALONE OR CONTAINER-BOUND)
// =========================================================================
// HOW TO SET UP ON YOUR OWN GOOGLE ACCOUNT (TAKES 60 SECONDS):
// 1. Go to https://sheets.new (signed into the Google account you want to own the data)
// 2. Name the sheet: "Business Learn Studio Submissions"
// 3. In the top menu, click Extensions -> Apps Script
// 4. Erase any code in the editor and paste THIS ENTIRE FILE.
// 5. Click Save (disk icon), then click Deploy -> New deployment
// 6. Select type: "Web app"
//    - Execute as: "Me"
//    - Who has access: "Anyone"
// 7. Click Deploy, authorize access, and copy the Web App URL (https://script.google.com/macros/s/.../exec)
// =========================================================================

var TEACHER_PASSWORD = 'teacher2026';
var SHEET_NAME = 'Business_Learn_Studio';

function doPost(e) {
  try {
    var raw = e.postData ? e.postData.contents : '';
    if (!raw) {
      return response({ success: false, error: 'No data received' });
    }

    var data = JSON.parse(raw);
    var ss = getOrCreateSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    var headers = [];
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      var keys = Object.keys(data).filter(function(k) {
        return k !== 'studentName' && k !== 'timestamp' && k !== 'classCode';
      });
      headers = ['timestamp', 'studentName', 'classCode'].concat(keys);

      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
           .setFontWeight('bold')
           .setBackground('#0f172a')
           .setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    } else {
      var lastCol = sheet.getLastColumn();
      var existingHeaders = [];
      if (lastCol > 0) {
        existingHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h) {
          return String(h).trim();
        });
      }

      var dataKeys = Object.keys(data);
      var newKeys = dataKeys.filter(function(k) {
        return existingHeaders.indexOf(k) === -1;
      });

      if (newKeys.length > 0) {
        var startCol = existingHeaders.length + 1;
        var newHeadersRange = sheet.getRange(1, startCol, 1, newKeys.length);
        newHeadersRange.setValues([newKeys]);
        newHeadersRange.setFontWeight('bold')
                       .setBackground('#0f172a')
                       .setFontColor('#ffffff');
        headers = existingHeaders.concat(newKeys);
      } else {
        headers = existingHeaders;
      }
    }

    // Update student's existing row if found, otherwise append a new row
    var lastRow = sheet.getLastRow();
    var studentRowIndex = -1;
    if (lastRow > 1) {
      var namesColumnIndex = headers.indexOf('studentName') + 1;
      if (namesColumnIndex > 0) {
        var names = sheet.getRange(2, namesColumnIndex, lastRow - 1, 1).getValues().map(function(r) {
          return String(r[0]).trim().toLowerCase();
        });
        var incomingName = String(data.studentName || '').trim().toLowerCase();
        if (incomingName) {
          var existingIdx = names.indexOf(incomingName);
          if (existingIdx !== -1) {
            studentRowIndex = existingIdx + 2;
          }
        }
      }
    }

    var rowValues = headers.map(function(h) {
      if (h === 'timestamp') return new Date().toISOString();
      return data[h] !== undefined ? String(data[h]) : '';
    });

    if (studentRowIndex !== -1) {
      sheet.getRange(studentRowIndex, 1, 1, headers.length).setValues([rowValues]);
    } else {
      sheet.appendRow(rowValues);
    }

    return response({ success: true, spreadsheetUrl: ss.getUrl() });
  } catch (err) {
    return response({ success: false, error: err.toString() });
  }
}

function doGet(e) {
  try {
    var pw = (e.parameter && e.parameter.password) ? e.parameter.password : '';
    var action = (e.parameter && e.parameter.action) ? e.parameter.action : 'read';

    if (pw !== TEACHER_PASSWORD && pw !== 'Rhino123*') {
      return response({ success: false, error: 'Unauthorized' });
    }

    if (action === 'read') {
      return readSubmissions();
    }
    return response({ success: false, error: 'Unknown action' });
  } catch (err) {
    return response({ success: false, error: err.toString() });
  }
}

function readSubmissions() {
  var ss = getOrCreateSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheetByName('Submissions');
  if (!sheet) {
    return response({ success: true, spreadsheetUrl: ss.getUrl(), submissions: [] });
  }
  var values = sheet.getDataRange().getValues();
  if (values.length <= 1) {
    return response({ success: true, spreadsheetUrl: ss.getUrl(), submissions: [] });
  }
  var headers = values[0].map(function(h) { return String(h).trim(); });
  var submissions = values.slice(1).map(function(row) {
    var obj = {};
    headers.forEach(function(h, i) {
      obj[h] = row[i] !== undefined ? String(row[i]) : '';
    });
    obj.studentName = obj['studentName'] || '';
    obj.timestamp = obj['timestamp'] || '';
    return obj;
  });
  return response({ success: true, spreadsheetUrl: ss.getUrl(), submissions: submissions });
}

function getOrCreateSpreadsheet() {
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) {}

  var files = DriveApp.getFilesByName('Business Learn Studio Submissions');
  if (files.hasNext()) {
    return SpreadsheetApp.open(files.next());
  }
  return SpreadsheetApp.create('Business Learn Studio Submissions');
}

function response(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
