// console.log("sanity-check");

/* 

        *** 
        Refer to store-a.js for succient code without explanations. My purpose 
        for doing this is to practice the Freyman technique by teaching it and teaching it better and better
        ***

*/

// Remove Button
const removeCartItemButtons = document.querySelectorAll(".btn-danger");
// console.log(removeCartItemButtons);
for (let i = 0; i < removeCartItemButtons.length; i++) {
  // create variable to represent each element in the loop
  let button = removeCartItemButtons[i];
  button.addEventListener("click", function(event) {
    // console.log("button clicked");  verifying each button clicked
    // make the remove button actually remove the cart item from the cart
    let buttonClicked = event.target; // all event listeners carry the event object (the button will be the event)
    // remove the row when the button is clicked.
    buttonClicked.parentElement.parentElement.remove(); // removing the row by reaching the parent's parents
    updatedCartTotal();
  });
}

// Update Total Cost
function updatedCartTotal() {
  // go through each row in the cart, select the first element in the array of elements
  let cartItemContainer = document.getElementsByClassName("cart-items")[0]; // each row is inside the cart-item class
  let cartRows = cartItemContainer.getElementsByClassName("cart-row"); // get the elements that have a class name of of cart-row
  // loop over the cart rows
  for (let i = 0; i < cartRows.length; i++) {
    // assign varaible to the cartRow iteration
    let cartRow = cartRows[i];
    // will need to get cart price that has a class of 'cart-price' and the first one listed
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    // get quanity by assigning variable to cart-quanity-level class
    let quanityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    console.log(priceElement, quanityElement);
  }
}
