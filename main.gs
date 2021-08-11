/***************************************************************************
 - mainファイル
 - トリガーから実行される場合は、main()が呼ばれる
 - カレンダーの削除＆作成を短時間でやりすぎるとエラーを吐くので、同期対象＆期間でそれぞれ
   分散している
 - main()で定義したnowには「今何時？」が入っており、例えば早朝（0 ~ 6時）であれば
   syncThisWeek()が呼ばれる
 - syncToday()系関数がそれぞれ「どのカレンダーを書き換えたか」を返してくれるので、そのま
   まログを取る
   
 - 万が一途中で止まった場合はcatch節に飛び、応急処置として今日のイベントだけ同期する
***************************************************************************/

function main() {
  let refreshedCalendar;

  refreshedCalendar = syncToday();
  Logger.log(`Executed syncToday(). Refreshed calendar: ${refreshedCalendar}.`);
  refreshedCalendar = syncThisWeek();
  Logger.log(`Executed syncThisWeek(). Refreshed calendar: ${refreshedCalendar}.`);
  // refreshedCalendar = syncThisMonth();
  // Logger.log(`Executed syncThisMonth(). Refreshed calendar: ${refreshedCalendar}.`);
}
