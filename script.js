import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  fromUnixTime,
  getUnixTime,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";

const datePickerButton = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");
const datePickerHeaderText = document.querySelector(".current-month");
const prevMonthButton = document.querySelector(".prev-month-button");
const nextMonthButton = document.querySelector(".next-month-button");
const dateGrid = document.querySelector(".date-picker-grid-dates");

let currentDate = new Date();

datePickerButton.addEventListener("click", (e) => {
  datePicker.classList.toggle("show");
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  currentDate = selectedDate;
  setupDatePicker(selectedDate);
});

function setDate(date) {
  datePickerButton.innerText = format(date, "MMMM do, uuuu");
  datePickerButton.dataset.selectedDate = getUnixTime(date);
  datePickerHeaderText.innerText = format(date, "MMMM");
}

function setupDatePicker(selectedDate) {
  datePickerHeaderText.innerText = format(currentDate, "MMMM - uuuu");
  setupDates(selectedDate);
}

nextMonthButton.addEventListener("click", () => {
  currentDate = addMonths(currentDate, 1);
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  setupDatePicker(selectedDate);
});

prevMonthButton.addEventListener("click", () => {
  currentDate = subMonths(currentDate, 1);
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  setupDatePicker(selectedDate);
});

function setupDates(selectedDate) {
  const firstWeekStart = startOfWeek(startOfMonth(currentDate));
  const lastWeekEnd = endOfWeek(endOfMonth(currentDate));
  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });

  dateGrid.innerHTML = "";

  dates.forEach((date) => {
    const dateElement = document.createElement("button");
    dateElement.classList.add("date");
    dateElement.innerText = date.getDate();
    if (!isSameMonth(date, currentDate)) {
      dateElement.classList.add("date-picker-other-month-date");
    }
    if (isSameDay(date, selectedDate)) {
      dateElement.classList.add("selected");
    }

    dateElement.addEventListener("click", () => {
      setDate(date);
      datePicker.classList.remove("show");
    });

    dateGrid.appendChild(dateElement);
  });
}

setDate(new Date());
