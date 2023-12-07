import {
  addMonths,
  format,
  fromUnixTime,
  getUnixTime,
  subMonths,
} from "date-fns";

const datePickerButton = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");
const datePickerHeaderText = document.querySelector(".current-month");

const prevMonthButton = document.querySelector(".prev-month-button");
const nextMonthButton = document.querySelector(".next-month-button");
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

function setupDatePicker() {
  datePickerHeaderText.innerText = format(currentDate, "MMMM - uuuu");
}

nextMonthButton.addEventListener("click", () => {
  currentDate = addMonths(currentDate, 1);
  setupDatePicker();
});

prevMonthButton.addEventListener("click", () => {
  currentDate = subMonths(currentDate, 1);
  setupDatePicker();
});

setDate(new Date());
