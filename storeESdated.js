console.log("SUCCINCT MODE - Straight Forward Code:ES6 Syntax");
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // REMOVE BUTTON
  const removeCartItemButtons = document.querySelectorAll(".btn-danger");
  removeCartItemButtons.forEach(button => {
    button.addEventListener("click", removeCartItem);
  });
}

// QUANTITY-INPUT-BOX
const quantityInputs = document.querySelectorAll(".cart-quantity-input");
quantityInputs.forEach(input => {
  input.addEventListener("change", quantityChanged);
});

// ADD TO CART BUTTON(S)
const addToCartButtons = document.querySelectorAll(".shop-item-button");
addToCartButtons.forEach(button => {
  button.addEventListener("click", addToCartClicked);
});

document
  .querySelector(".btn-purchase")
  .addEventListener("click", purchaseClicked);

// Callback Functions

function purchaseClicked() {
  alert(
    "Thank you for your purchase. Your business is appreciated and we hope to see you again soon!"
  );
  // Changed from [0] to querySelector
  // let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItems = document.querySelector(".cart-items");
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.querySelector(".shop-item-title").innerText;
  let price = shopItem.querySelector(".shop-item-price").innerText;
  let imageSrc = shopItem.querySelector(".shop-item-image").src;
  //   console.log(title, price, imageSrc);
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row"); // for proper styling when added to cart
  let cartItems = document.querySelectorAll(".cart-items")[0];
  // To prevent more than one of the same item added to the cart
  let cartItemNames = cartItems.querySelectorAll(".cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert(
        `You already have ${title} in your cart. If you want more than one item, please adjust the 
        quantity in your shopping-cart below. Thanks.`
      );
      return;
    }
  }

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
  cartRow.innerHTML = cartRowContents; // not assigning cartRow; assigning the cartRow's 'innerHTML'
  cartItems.append(cartRow);
  // add on eventListeners
  cartRow
    .querySelectorAll(".btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .querySelectorAll(".cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

// Update Total Cost
function updateCartTotal() {
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
  total = Math.floor(total * 100) / 100; // rounds total to two decimal places only
  document.querySelectorAll(".cart-total-price")[0].innerText = "$" + total;
}
