import { format } from "date-fns";

const datePickerButton = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");

datePickerButton.addEventListener("click", (e) => {
  datePicker.classList.toggle("show");
});

function setDate(date) {
  datePickerButton.innerText = format(date, "MMMM do, uuuu");
}

setDate(new Date());
