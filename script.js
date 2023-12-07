import { format, fromUnixTime, getUnixTime } from "date-fns";

const datePickerButton = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");
const datePickerHeaderText = document.querySelector(".current-month");

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

setDate(new Date());

function setupDatePicker(date) {
  datePickerHeaderText.innerText = format(date, "MMMM - uuuu");
}
