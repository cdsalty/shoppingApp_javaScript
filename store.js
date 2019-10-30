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

// ADD TO CART BUTTONS
const addToCartButtons = document.querySelectorAll(".shop-item-button");
for (let i = 0; i <= addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener("click", addClickToCart);
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

// Defining addClickToCart
function addClickToCart(event) {
  let button = event.target; // connect to the event.target which is the actually button being clicked
  // work on getting the HTML DATA in order to display when an item is clicked to add to the cart
  // FIRST, We need the parent element of the entire div
  let shopItem = button.parentElement.parentElement; // gives us access to the entire div to access within
  // use shopItem to spefically call on the div classes within -> THE title, price and image
  let title = shopItem.querySelectorAll(".shop-item-title")[0].innerText; // NOT DOCUMENT but * SHOPITEM * !
  let price = shopItem.querySelectorAll(".shop-item-price")[0].innerText;
  // for the image, you need to call the src attribute because an image does not have innerText
  let imageSrc = shopItem.querySelectorAll(".shop-item-image")[0].src;
  console.log(title, price, imageSrc); // YEA
  addItemToCart(title, price, imageSrc); // Next, define addItemToCart
}

function addItemToCart(title, price, imageSrc) {
  // First we need to C R E A T E  a <DIV> we can append to0
  const cartRow = document.createElement("div"); // DIV is CREATED but not called or invoked.

  // To get the propert styling and layout, we need to assign cartRow the class of 'cart-row'
  cartRow.classList.add("cart-row"); // cartRow class = 'cart-row'

  // cartRow.innerText = title; but instead of setting the title HERE, instead we will set to cartRowContents accordingly

  // CART-ITEMS IS WHERE ALL THE 'CART-ROWS' LIVE (all cart-rows are under cart-items)
  const cartItems = document.querySelectorAll(".cart-items")[0];
  // take the cart-items and append the new cartRow

  // To Prevent duplicate items being added to the cart
  let cartItemNames = cartItems.querySelectorAll(".cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert(
        `You already have ${title} in your cart. If you want more than one item, please adjust your quantity in your cart. Thanks.`
      );
      return;
    }
  }

  // Next, we need to do the actually adding of the element and it's stlying
  // take the html directly from store page(everything inside 'cart-row') and use this to generate a cart-row of the items added to the cart
  // lastly go and change src="${imageSrc}" and the other variables passed in.
  let cartRowContents = `
      <div class="cart-item cart-column">
        <img
          class="cart-item-image"
          src="${imageSrc}"
          alt="T-Shirt"
          width="100"
          height="100"
        />

        <h3 class="cart-item-title">${title}</h3>
      </div>

      <span class="cart-price cart-column">${price}</span>

      <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1" />
        <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`;

  cartRow.innerHTML = cartRowContents; // now the cart-row is being rendered correctly (but text will change)
  cartItems.append(cartRow); // WHY CARTROW AND NOT CARTROWCONTENTS?????????????????????
  /* 
  *** In order for the quantity and remove buttons to work/function correctly, we need to directly add
  and event listener on to each new button and quantity box rendered.
  AS SO:              
  */
  cartRow
    .querySelectorAll(".btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .querySelectorAll(".cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
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
  // TO make the total price ONLY have two decimal places. GOOD FACT TO REMEMBER
  // round the number using Math.round(), multiply by 100 and then divide by 100
  total = Math.round(total * 100) / 100;
  console.log(`The newly updated total is now: ${total}`);

  // refered back to the html to determine we need to target the class, "cart-total-price"
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
