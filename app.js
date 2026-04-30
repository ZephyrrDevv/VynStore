const SearchItems = document.getElementById("search");
const cartBtn = document.getElementById("cartBtn");
const totalCart = document.querySelectorAll(".totalCart");
const navBtns = document.querySelectorAll("nav button");
const nav = document.querySelector("nav");
const productGrid = document.querySelector(".product_grid");
const totalProductInStore = document.getElementById("totalProduct");
const featureProduct = document.getElementById("featureProduct");
const cardsContainer = document.querySelector(".cards_container");
const cartGrid = document.querySelector(".cart_grid");
const cartSkeleton = document.querySelector(".cartSkeleton");
const promoCode = document.getElementById("promoCode");
const promoCodeBtn = document.getElementById("promoCodeBtn");
const totalBuy = document.getElementById("totalBuy");
const subtotal = document.getElementById("subtotal");
const totalPrice = document.getElementById("totalPrice");
const paymentBtn = document.getElementById("paymentBtn");
const paymentTransaction = document.getElementById("paymentTrans");
const overlay = document.getElementById("overlay");
const hamburger = document.getElementById("hamburger");
const homeBtn = document.getElementById("homeBtn");
const cartNavBtn = document.getElementById("cartNavBtn");

hamburger.addEventListener("click", function () {
  nav.classList.toggle("show");
  document.querySelector(".search").classList.toggle("show");
});

homeBtn.onclick = () => {
  cartGrid.style.display = "none";
  productGrid.style.display = "flex";
};

cartNavBtn.onclick = () => {
  cartGrid.style.display = "flex";
  productGrid.style.display = "none";
};

let productArray = [
  {
    id: 1,
    image: "./images/headphone.jpg",
    name: "Pro Headphones X",
    category: "Audio",
    price: 49.99,
    oldPrice: 69.99,
    tag: "NEW",
    rating: "★★★★★",
    reviews: "128 reviews",
  },

  {
    id: 2,
    image: "./images/smartwatch.jpg",
    name: "Smart Watch Pro",
    category: "Wearables",
    price: 129.99,
    tag: "HOT",
    rating: "★★★★☆",
    reviews: "84 reviews",
  },

  {
    id: 3,
    image: "./images/phoneback.jpg",
    name: "MagSafe Case",
    category: "Mobile",
    price: 19.99,
    oldPrice: 29.99,
    tag: "SALE",
    rating: "★★★★☆",
    reviews: "210 reviews",
  },

  {
    id: 4,
    image: "./images/laptopstanding.jpg",
    name: "Laptop Stand Pro",
    category: "Computing",
    price: 34.99,
    rating: "★★★★★",
    reviews: "56 reviews",
  },

  {
    id: 5,
    image: "./images/mouse.jpg",
    name: "Silent Mouse XI",
    category: "Accessories",
    price: 24.99,
    tag: "NEW",
    rating: "★★★★☆",
    reviews: "93 reviews",
  },

  {
    id: 6,
    image: "./images/Keyboard.jpg",
    name: "Mech Keyboard TKL",
    category: "Computing",
    price: 89.99,
    oldPrice: 109.99,
    tag: "HOT",
    rating: "★★★★★",
    reviews: "177 reviews",
  },
];

function renderProducts(products) {
  cardsContainer.innerHTML = "";
  cardsContainer.innerHTML = products
    .map((product) => {
      return `
    <div class="card">
            <div class="card_image">
              ${product.tag ? `<span class="tag">${product.tag}</span>` : ""}
              <img src="${product.image}" alt="${product.name}" />
            </div>

            <div class="card_body">
              <h4 class="card_cat">${product.category}</h4>
              <p class="card_name">${product.name}</p>
              <p class="card_stars">${product.rating}
                <span class="card_reviews">${product.reviews}</span>
              </p>
            </div>

            <div class="card_footer">
              <div class="price">
                <span class="current_price">$${product.price}</span>
               ${product.oldPrice ? `<span class="old_price">$${product.oldPrice}</span>` : ""}
              </div>
              <button class="add_btn" data-id="${product.id}">+</button>
            </div>
          </div>
    `;
    })
    .join("");
}

renderProducts(productArray);

let cart = [];

cardsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("add_btn")) {
    const id = Number(e.target.dataset.id);
    const product = productArray.find((item) => item.id === id);
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    renderCart();
  }
});

function renderCart() {
  cartSkeleton.innerHTML = "";
  cartSkeleton.innerHTML = cart
    .map((item) => {
      return `
    <div class="cart_card">
            <div class="product">
              <div class="img_h">
                <div class="img">
                  <img
                    src="${item.image}"
                    alt="${item.name}"
                  />
                </div>

                <div class="h">
                  <h4>${item.name}</h4>
                  <p>$${item.price}</p>
                </div>
              </div>
            </div>

            <div class="cartbtn">
              <div class="btns">
                <button class="decrease_btn" data-id="${item.id}">-</button>
                <p class="totalAdd">${item.quantity}</p>
                <button class="increase_btn" data-id="${item.id}">+</button>
              </div>
              <button class="remove_btn" data-id="${item.id}">✕ remove</button>
            </div>
          </div>
    `;
    })
    .join("");
  updateTotal();
  updateCartBadge();
}

cartSkeleton.addEventListener("click", function (e) {
  if (e.target.classList.contains("increase_btn")) {
    const id = Number(e.target.dataset.id);
    const existingProduct = cart.find((item) => item.id === id);
    if (existingProduct) {
      existingProduct.quantity++;
      renderCart();
    }
  }
});

cartSkeleton.addEventListener("click", function (e) {
  if (e.target.classList.contains("decrease_btn")) {
    const id = Number(e.target.dataset.id);
    const removingProduct = cart.find((item) => item.id === id);
    if (removingProduct) {
      removingProduct.quantity--;

      if (removingProduct.quantity === 0) {
        cart = cart.filter((item) => item.id !== id);
      }
      renderCart();
    }
  }
});

cartSkeleton.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove_btn")) {
    const id = Number(e.target.dataset.id);
    cart = cart.filter((item) => item.id !== id);
    renderCart();
  }
});

function updateTotal() {
  let sum = 0;
  cart.forEach((item) => {
    sum += item.price * item.quantity;
  });
  totalPrice.textContent = "$" + sum.toFixed(2);
  subtotal.textContent = "$" + sum.toFixed(2);

  let totalItems = 0;
  cart.forEach((item) => {
    totalItems += item.quantity;
  });
  totalBuy.textContent = `(${totalItems} items)`;
}

function updateCartBadge() {
  let sum = 0;
  cart.forEach((item) => {
    sum += item.quantity;
  });
  for (let i = 0; i < totalCart.length; i++) {
    totalCart[i].textContent = sum;
  }

  const bottomBadge = document.querySelector(".bottom_badge");
  if (sum > 0) {
    bottomBadge.style.display = "flex";
    bottomBadge.textContent = sum;
  } else {
    bottomBadge.style.display = "none";
  }

  const cardCart = document.querySelector(".cardCart");
  if (sum > 0) {
    cardCart.style.display = "flex";
    cardCart.textContent = sum;
  } else {
    cardCart.style.display = "none";
  }
}

navBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const category = this.textContent;
    const filtered = productArray.filter(
      (product) => product.category === category,
    );
    navBtns.forEach((b) => b.parentElement.classList.remove("active"));
    this.parentElement.classList.add("active");

    if (category === "All") {
      renderProducts(productArray);
    } else {
      renderProducts(filtered);
    }
  });
});

SearchItems.addEventListener("input", function () {
  const search = SearchItems.value;
  const filtered = productArray.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );
  renderProducts(filtered);
});

paymentBtn.onclick = () => {
  if (cart.length === 0) return;
  paymentTransaction.style.display = "flex";
  overlay.style.display = "block";
  cart = [];
  renderCart();
  updateTotal();
};

overlay.onclick = () => {
  paymentTransaction.style.display = "none";
  overlay.style.display = "none";
};
