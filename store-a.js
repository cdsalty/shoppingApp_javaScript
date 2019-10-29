/*
Succinct Mode
*/

// Remove Button
const removeCartItemButtons = document.querySelectorAll(".btn-danger");

for (let i = 0; i < removeCartItemButtons.length; i++) {
  let button = removeCartItemButtons[i];
  button.addEventListener("click", removeCartItem);
  /* {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updatedCartTotal();
  });*/
}

// Quantity Input Box
const quantityInputs = document.querySelectorAll(".cart-quantity-input");

for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

// Supporting Code / Callback Functions

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updatedCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatedCartTotal();
}

// Update Total Cost

function updatedCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quanityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quanity = quanityElement.value;
    total = total + price * quanity;
  }
  document.querySelectorAll(".cart-total-price")[0].innerText = "$" + total;
}
