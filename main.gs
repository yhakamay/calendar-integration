const kCalendarID = Session.getActiveUser().getEmail();

function main() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const startRow = 3;
  const startColumn = 2;
  const startTime = getStartTime();
  const endTime = getEndTime();
  const calendar = CalendarApp.getCalendarById(kCalendarID);
  const todaysEvents = calendar.getEvents(startTime, endTime);
  const values = [];

  cleanUp(sheet, startRow, startColumn);

  for (const todaysEvent of todaysEvents) {
    if (!shouldCopied(todaysEvent)) {
      Logger.log('skipped.');
    }
    
    const record = [
      todaysEvent.getTitle(),
      todaysEvent.getStartTime(),
      todaysEvent.getEndTime(),
      todaysEvent.getLocation(),
      todaysEvent.getVisibility(),
    ];
    values.push(record);
  }

  sheet.getRange(startRow, startColumn, values.length, values[0].length).setValues(values);
}

function cleanUp(sheet, startRow, startColumn) {
  for (let i = startColumn; i < sheet.getLastColumn(); i++) {
    for (let j = startRow; j < sheet.getLastRow(); j++) {
      const cell = SpreadsheetApp.getActiveSheet().getRange(i, j);
      cell.clearContent();
    }
  }

  Logger.log('cleared!');
}

function getStartTime() {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0);
}

function getEndTime() {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 23, 59, 59, 59);
}

function shouldCopied(todatsEvent) {
    if (todatsEvent.getTag('createdBy') == 'GAS') return false;
    if (todatsEvent.getMyStatus() == CalendarApp.GuestStatus.NO) return false;
    if (todatsEvent.getMyStatus() == CalendarApp.GuestStatus.MAYBE) return false;
    if (todatsEvent.getVisibility() == CalendarApp.Visibility.PRIVATE) return false;
    else return true;
}
