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

datePickerButton.addEventListener("click", (e) => {
  datePicker.classList.toggle("show");
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  setupDatePicker(selectedDate);
});

function setDate(date) {
  datePickerButton.innerText = format(date, "MMMM do, uuuu");
  datePickerButton.dataset.selectedDate = getUnixTime(date);
  datePickerHeaderText.innerText = format(date, "MMMM");
}

function setupDatePicker(selectedDate) {
  datePickerHeaderText.innerText = format(selectedDate, "MMMM - uuuu");
  setupMonthButtons(selectedDate);
}

function setupMonthButtons(selectedDate) {
  nextMonthButton.addEventListener(
    "click",
    () => {
      setupDatePicker(addMonths(selectedDate, 1));
    },
    { once: true }
  );

  prevMonthButton.addEventListener(
    "click",
    () => {
      setupDatePicker(subMonths(selectedDate, 1));
    },
    { once: true }
  );
}

setDate(new Date());
