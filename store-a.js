/*
Succinct Mode
*/

// Remove Button
const removeCartItemButtons = document.querySelectorAll(".btn-danger");

for (let i = 0; i < removeCartItemButtons.length; i++) {
  let button = removeCartItemButtons[i];
  button.addEventListener("click", function(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updatedCartTotal();
  });
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
