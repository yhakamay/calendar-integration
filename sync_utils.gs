/***************************************************************************
 - 同期に必要なパーツを集めたファイル
***************************************************************************/

function deleteEventsCreatedByGAS(calendar, startTime, endTime) {
  const events = calendar.getEvents(startTime, endTime);

  for (const event of events) {
    if (event.getTag('createdBy') == 'GAS' || event.getTitle() == 'Busy') {
      event.deleteEvent();
      Logger.log(`Deleted: ${event.getTitle()}`);
    }
  }
  Logger.log('Delete done!');
}

function copyEvents(targetCalendar, originalCalendar, startTime, endTime) {
  const originalEvents = originalCalendar.getEvents(startTime, endTime);
  const title = `Busy`;

  try {
    for (const originalEvent of originalEvents) {
      if (originalEvent.getTag('createdBy') == 'GAS') continue;
      if (originalEvent.getMyStatus() == 'NO') continue;
      if (originalEvent.getTitle() == 'Busy') continue;

      const copiedEvent = targetCalendar.createEvent(
        title,
        originalEvent.getStartTime(),
        originalEvent.getEndTime(),
      )

      Logger.log(`Copied: ${originalEvent.getTitle()}`);
      copiedEvent.setTag('createdBy', 'GAS');
      Logger.log(`Tag set: createdBy: GAS`);
      copiedEvent.setTag('originalCalendar', originalCalendar.getName());
      Logger.log(`Tag set: originalCalendar: ${originalCalendar.getName()}`);
      copiedEvent.setVisibility(CalendarApp.Visibility.PRIVATE);
      Logger.log(`Set to PRIVATE`);
    }
  } catch (e) {
    Logger.log(e);
  }
}
