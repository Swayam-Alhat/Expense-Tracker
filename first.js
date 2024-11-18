const itemContainer = document.getElementById("itemContainer");
const totalText = document.getElementById("totalText");
const form = document.getElementById("form");
const expenseInput = document.getElementById("expenseInput");
const amountInput = document.getElementById("amountInput");

// displayTotal function
function displayTotal() {
  totalText.innerText = `Total:$${localStorage.getItem("total")}`;
}

//deleteItem function
function deleteItem(divBox, value, deleteButton, key) {
  deleteButton.addEventListener("click", () => {
    let total = parseFloat(localStorage.getItem("total"));
    total = total - value;
    localStorage.setItem("total", total);
    localStorage.removeItem(key);
    divBox.remove();
    displayTotal();
  });
}

// display function
function display() {
  localStorage.setItem("total", 0);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = parseFloat(localStorage.getItem(key));
    // avoiding the total to print.
    if (key == "total") {
      continue;
    } else {
      let total = parseFloat(localStorage.getItem("total"));
      total = total + value;
      localStorage.setItem("total", total);
      // create the div for each expense.
      let divBox = document.createElement("div");
      divBox.classList.add(
        "w-full",
        "h-auto",
        "px-3",
        "py-2",
        "flex",
        "justify-between",
        "items-center",
        "font-bold",
        "text-[18px]",
        "bg-stone-400",
        "mb-2"
      );
      // create span in which the key will insert..
      let spanText = document.createElement("span");
      spanText.innerText = key;
      // create delete button
      let deleteButton = document.createElement("button");
      deleteButton.classList.add(
        "bg-blue-600",
        "hover:bg-blue-700",
        "py-1",
        "px-2",
        "font-semibold",
        "text-[17.2px]"
      );
      deleteButton.innerText = "delete";
      deleteButton.title = "Remove the Expense";
      // appending the span in divBox.
      divBox.appendChild(spanText);
      // appending the button in divBox.
      divBox.appendChild(deleteButton);
      // adding the divBox in main container.
      itemContainer.appendChild(divBox);
      // calling the delete()
      deleteItem(divBox, value, deleteButton, key);
    }
  }
  displayTotal();
}

// Adding eventlistener to form .ie gets submit..
form.addEventListener("submit", (event) => {
  // prevent the form from reload at start..
  event.preventDefault();
  // accessing the input text and amount
  let expenseInputText =
    expenseInput.value.charAt(0).toUpperCase() +
    expenseInput.value.slice(1).toLowerCase(); // capitalize the first letter of word..
  let amountInputNumber = amountInput.value;
  // making mixedKeyText...
  let mixedKeyText = `${expenseInputText}-$${amountInputNumber}`;
  // storing to local storage..
  localStorage.setItem(mixedKeyText, amountInputNumber);
  // empty the input tags when submitted..
  expenseInput.value = "";
  amountInput.value = "";
  // removing all the item list to reload from local storage.
  itemContainer.innerHTML = "";
  // calling the display()..
  display();
});

// on loading
document.addEventListener("DOMContentLoaded", () => {
  display();
});
