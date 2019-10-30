console.log("SUCCINCT MODE - Straight Forward Code");

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

// Add To Cart Buttons
const addToCartButtons = document.querySelectorAll(".shop-item-button");
for (let i = 0; i <= addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener("click", addClickToCart);
}

// Callback Functions

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

function addClickToCart(event) {
  let button = event.target;
  let shopItems = button.parentElement.parentElement;
  let title = shopItems.querySelectorAll(".shop-item-title")[0].innerText;
  let price = shopItems.querySelectorAll(".shop-item-price")[0].innerText;
  let imageSrc = shopItems.querySelectorAll(".shop-item-image")[0].src;
  console.log(title, price, imageSrc);
  addItemToCart(title, price, imageSrc);
}

function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row"); // for proper styling when added to cart
  const cartItems = document.querySelectorAll(".cart-items")[0];
  // To prevent more than one of the same item added to the cart
  let cartItemNames = cartItems.querySelectorAll(".cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert(
        `You already have ${title} in your cart. If you want more than one item, please adjust your quantity in your cart. Thanks.`
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
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow); // why cartRow and not cartRowContents
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
  total = Math.floor(total * 100) / 100; // rounds total to two decimal places only
  document.querySelectorAll(".cart-total-price")[0].innerText = "$" + total;
}
