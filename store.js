// console.log("sanity-check");

/* 

        *** 
        Refer to store-a.js for succient code without explanations. My purpose 
        for doing this is to practice the Freyman technique by teaching it and teaching it better and better
        ***

*/

// BUTTONS/INPUTS: REMOVE, QUANTITY INPUT BOX,

// Remove Button
const removeCartItemButtons = document.querySelectorAll(".btn-danger");
// console.log(removeCartItemButtons);
for (let i = 0; i < removeCartItemButtons.length; i++) {
  // create variable to represent each element in the loop
  let button = removeCartItemButtons[i];
  button.addEventListener("click", removeCartItem);
  // console.log("button clicked");  verifying each button clicked);
}

// QUANTITY INPUT BOX
const quantityInputs = document.querySelectorAll(".cart-quantity-input");

for (let i = 0; i < quantityInputs.length; i++) {
  // create a variable to be used to iterate through
  let input = quantityInputs[i];
  // create an event listener to listen for a 'CHANGE'
  input.addEventListener("change", quantityChanged);
  // now go and define what actions will take place when quantityChanged is called
}

// 3rd Step Taken: Cleaning up the code by creating a removeCartItem Function
// replaced the original code on the event listner into this function.
function removeCartItem(event) {
  // make the remove button actually remove the cart item from the cart
  let buttonClicked = event.target; // all event listeners carry the event object (the button will be the event)
  // remove the row when the button is clicked.
  buttonClicked.parentElement.parentElement.remove(); // removing the row by reaching the parent's parents
  updatedCartTotal();
}

// Define quantityChanged function called from Quantity Box
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatedCartTotal();
}

// Update Total Cost
function updatedCartTotal() {
  // go through each row in the cart, select the first element in the array of elements
  let cartItemContainer = document.getElementsByClassName("cart-items")[0]; // each row is inside the cart-item class
  let cartRows = cartItemContainer.getElementsByClassName("cart-row"); // get the elements that have a class name of of cart-row
  // define cartRow and initialze the starting value
  let total = 0;
  // loop over the cart rows
  for (let i = 0; i < cartRows.length; i++) {
    // assign varaible to the cartRow iteration
    let cartRow = cartRows[i];
    // will need to get cart price that has a class of 'cart-price' and the first one listed
    // or the way I thought of it was...
    // on each cartRow get the class of cart-price and access the first element; priceElement = the $9.99 input in html
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    // get quanity by assigning variable to cart-quanity-level class
    let quanityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    /* 
    Next Step: Retreive the number entered and update the value
    To retrieve the number being entered such as 9.99 from the HTML doc: 
      - assign a variable to the price elemnent in the HTML     ** 'price' **
      - remove '$' from '$9.99'       ** by using the replace() method **
      - change the innerText of 9.99 from a string to a number ** parseFloat()  **
      - limit the decimal positions to two.
          - Now, set the 'Total' price to to update
            - get the cart-total-price element's value 
            - update the cart value with the $ 

    */
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quanity = quanityElement.value;
    // total = total + (price  *  quanity)
    total = total + price * quanity; // will take place each time through the loop.
    //  ** must initalize total and set starting value to 0 ** I OVERLOOKED THIS ! ! ! ! !
    console.log(
      `Just removed ${total + price * quanity} from the shopping cart.`
    );
  }
  // refered back to the html to determine we need to target the class, "cart-total-price"
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
