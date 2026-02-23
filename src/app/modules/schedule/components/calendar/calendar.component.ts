import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  calendarMonth: Date = new Date();

  onNextMonth() {
    this.calendarMonth = new Date(this.calendarMonth);
    this.calendarMonth.setMonth(this.calendarMonth.getMonth() + 1);
    this.calendarMonth.setDate(1);
  }

  onPreviusMonth() {
    let previousData = new Date(this.calendarMonth);
    previousData.setMonth(previousData.getMonth() - 1);
    previousData.setDate(1);

    if (this.isDateInFuture(previousData)) {
      this.calendarMonth = previousData;
    } else {
      if (this.isDateInCurrentMonth(previousData)) {
        previousData.setDate(new Date().getDate());
        this.calendarMonth = previousData;
      }
    }
  }

  showPreviousMonthButton(): boolean {
    return !this.isDateInCurrentMonth(this.calendarMonth);
  }

  isDateInFuture = (date: Date): boolean => date >= new Date();
  isDateInCurrentMonth = (date: Date): boolean => date.getMonth() === this.calendarMonth.getMonth() && date.getFullYear() === this.calendarMonth.getFullYear();



}
