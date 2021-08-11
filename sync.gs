/***************************************************************************
 - プログラムのコアとなるファイル
 - 最上部のsyncForDays()がメインの処理を担い、それ以外は振り分けを行っている
 - 例えばsyncToday()に偶数の時間（14時とか）が渡された場合、書換対象はPersonal
 - ちなみにGo Visionsカレンダーはほとんど使用しないため、最も頻度の高いsyncToday()では
   書換を行わない
 - syncToday()系関数は、処理が終わると「どのカレンダーを書き換えたか」をmain()に返す
***************************************************************************/

function syncForDays(targetCalendar, originalCalendar, daysToStartTime, daysToEndTime) {
  const today = new Date();
  const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysToStartTime, 0, 00, 00, 00);
  const endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysToEndTime, 23, 59, 59, 59);

  deleteEventsCreatedByGAS(targetCalendar, startTime, endTime);
  copyEvents(targetCalendar, originalCalendar, startTime, endTime);
}

// 毎朝1度だけ実行
function syncYesterday() {
  let refreshedCalendar = 'nothing';

  syncForDays(kCalendarPersonal, kCalendarSoftbank, -1, -1);
  syncForDays(kCalendarSoftbank, kCalendarPersonal, -1, -1);
  refreshedCalendar = `${kCalendarPersonal.getName()} and ${kCalendarSoftbank.getName()}`;

  return refreshedCalendar;
}

function syncLastWeek() {
  let refreshedCalendar = 'nothing';

  syncForDays(kCalendarPersonal, kCalendarSoftbank, -80, -77);
  // syncForDays(kCalendarSoftbank, kCalendarPersonal, -78, -77);
  refreshedCalendar = `${kCalendarPersonal.getName()} and ${kCalendarSoftbank.getName()}`;

  return refreshedCalendar;
}

function syncToday() {
  let refreshedCalendar = 'nothing';

  syncForDays(kCalendarPersonal, kCalendarSoftbank, 0, 0);
  syncForDays(kCalendarSoftbank, kCalendarPersonal, 0, 0);
  refreshedCalendar = `${kCalendarPersonal.getName()} and ${kCalendarSoftbank.getName()}`;

  return refreshedCalendar;
}

function syncThisWeek() {
  let refreshedCalendar = 'nothing';

  syncForDays(kCalendarPersonal, kCalendarSoftbank, 1, 7);
  syncForDays(kCalendarSoftbank, kCalendarPersonal, 1, 7);
  refreshedCalendar = `${kCalendarPersonal.getName()} and ${kCalendarSoftbank.getName()}`;

  return refreshedCalendar;
}

function syncThisMonth() {
  let refreshedCalendar = 'nothing';

  syncForDays(kCalendarPersonal, kCalendarSoftbank, 8, 30);
  syncForDays(kCalendarSoftbank, kCalendarPersonal, 8, 30);
  refreshedCalendar = `${kCalendarPersonal.getName()} and ${kCalendarSoftbank.getName()}`;

  return refreshedCalendar;
}
