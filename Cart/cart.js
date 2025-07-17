function initCart() {
  const cartContainer = document.getElementById('cart-items-container');
  const quantityInput = document.getElementById('quantity-input');
  const minusBtn = document.getElementById('quantity-minus');
  const plusBtn = document.getElementById('quantity-plus');
  const removeBtn = document.getElementById('remove-item');
  const subtotalElement = document.getElementById('subtotal-price');
  const totalElement = document.getElementById('total-price');
  const couponInput = document.getElementById('coupon-input');
  const couponBtn = document.getElementById('apply-coupon');
  const checkoutBtn = document.getElementById('checkout-btn');
  const itemPriceElement = document.getElementById('item-price');
  const sum=document.getElementById("numOfItem");
 
  let products = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
  
  let currentProductIndex = 0;  
  let currentQuantity = products.length > 0 ? products[0].quantity : 1;
  let productPrice = products.length > 0 ? products[0].price : 0;
const sampleProducts = [
  {
    name: "ساعة أبل الذكية",
    price: 199.99,
    quantity: 1,
    image: "https://example.com/apple-watch.jpg",
    description: "ساعة ذكية من أبل مع شاشة ريتينا دائمية"
  },
  {
    name: "سماعات سوني اللاسلكية",
    price: 149.99,
    quantity: 2,
    image: "https://example.com/sony-headphones.jpg",
    description: "سماعات لاسلكية مع إلغاء الضوضاء"
  }
];

// Add to localStorage
localStorage.setItem("favoriteProducts", JSON.stringify(sampleProducts));
 
  function displayCartItems() {
    if (products.length === 0) {
      cartContainer.innerHTML = '<p class="text-center py-4">سلة التسوق فارغة</p>';
      subtotalElement.textContent = '0.00 رس';
      totalElement.textContent = '0.00 رس';
      checkoutBtn.disabled = true;
      return;
    }

    cartContainer.innerHTML = '';
    let totalPrice = 0;

    products.forEach((product, index) => {
      const itemTotal = product.price * product.quantity;
      totalPrice += itemTotal;
 

      const itemHTML = `
        <div class="cart-item border p-3 mb-3 rounded shadow-sm" data-index="${index}">
          <div class="d-flex align-items-center gap-3">
            <img src="${product.image}" alt="${product.name}" width="80" />
            <div class="flex-grow-1">
              <h5 class="mb-1">${product.name}</h5>
              <p class="text-muted mb-1">السعر: ${product.price.toFixed(2)} رس</p>
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-outline-danger btn-sm quantity-minus">-</button>
                <input class="form-control form-control-sm text-center quantity-input" 
                       type="number" value="${product.quantity}" min="1" style="width: 60px;" />
                <button class="btn btn-outline-success btn-sm quantity-plus">+</button>
                <button class="btn   btn-sm ms-auto remove-item"> <i class="fa-solid fa-xmark text-danger"></i></button
                <button class="btn btn-outline-secondary ms-auto px-5 btn-sm ms-auto remove-item"><div class="me-auto px-5"></div></button>
              </div>
              <p class="mt-2">المجموع: ${itemTotal.toFixed(2)} رس</p>
            </div>
          </div>
        </div>
      `;
      cartContainer.innerHTML += itemHTML;
    });

    subtotalElement.textContent = totalPrice.toFixed(2) + " رس";
    totalElement.textContent = totalPrice.toFixed(2) + " رس";
    sum.innerHTML=totalPrice.toFixed(2) + " رس";
    checkoutBtn.disabled = false;
    quantityInput.value = currentQuantity;
  }

  // Update quantity in products array
  function updateQuantity(index, newQuantity) {
    if (index >= 0 && index < products.length) {
      products[index].quantity = newQuantity;
      localStorage.setItem("favoriteProducts", JSON.stringify(products));
      currentQuantity = newQuantity;
      displayCartItems();
    }
  }

  // Initialize with first product if exists
  if (products.length > 0) {
    currentQuantity = products[0].quantity;
    productPrice = products[0].price;
    quantityInput.value = currentQuantity;
  }

  // Event delegation for dynamic buttons
  cartContainer.addEventListener('click', function(e) {
    const itemElement = e.target.closest('.cart-item');
    if (!itemElement) return;
    
    const index = parseInt(itemElement.dataset.index);
    currentProductIndex = index;
    const product = products[index];
    
    if (e.target.classList.contains('quantity-plus')) {
      updateQuantity(index, product.quantity + 1);
    } else if (e.target.classList.contains('quantity-minus') && product.quantity > 1) {
      updateQuantity(index, product.quantity - 1);
    } else if (e.target.classList.contains('remove-item')) {
      products.splice(index, 1);
      localStorage.setItem("favoriteProducts", JSON.stringify(products));
      if (products.length === 0) {
        currentQuantity = 1;
        quantityInput.value = currentQuantity;
      }
      displayCartItems();
    }
  });

  // Input field changes
  cartContainer.addEventListener('change', function(e) {
    if (e.target.classList.contains('quantity-input')) {
      const itemElement = e.target.closest('.cart-item');
      const index = parseInt(itemElement.dataset.index);
      const newQuantity = parseInt(e.target.value);
      
      if (newQuantity >= 1) {
        updateQuantity(index, newQuantity);
      } else {
        e.target.value = products[index].quantity;
      }
    }
  });

  // Original buttons functionality (fallback)
  plusBtn.addEventListener('click', function() {
    if (products.length > 0) {
      updateQuantity(currentProductIndex, products[currentProductIndex].quantity + 1);
    }
  });

  minusBtn.addEventListener('click', function() {
    if (products.length > 0 && products[currentProductIndex].quantity > 1) {
      updateQuantity(currentProductIndex, products[currentProductIndex].quantity - 1);
    }
  });

  quantityInput.addEventListener('change', function() {
    const newQuantity = parseInt(this.value);
    if (products.length > 0 && newQuantity >= 1) {
      updateQuantity(currentProductIndex, newQuantity);
    } else {
      this.value = currentQuantity;
    }
  });

  removeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (products.length > 0) {
      products.splice(currentProductIndex, 1);
      localStorage.setItem("favoriteProducts", JSON.stringify(products));
      displayCartItems();
    }
  });

  couponBtn.addEventListener('click', function() {
    const couponCode = couponInput.value.trim();
    if (couponCode) {
      alert('تم تطبيق كود الخصم بنجاح');
    } else {
      alert('الرجاء إدخال كود الخصم');
    }
  });

  checkoutBtn.addEventListener('click', function() {
    if (products.length > 0) {
      alert('تم تأكيد الطلب بنجاح! شكراً لشرائك.');
      products = [];
      localStorage.setItem("favoriteProducts", JSON.stringify(products));
      currentQuantity = 1;
      quantityInput.value = 1;
      displayCartItems();
    } else {
      alert('سلة التسوق فارغة');
    }
  });

  // Initial display
  displayCartItems();
  initCart()
}
function renderCart() {
  fetch("./Cart/cart.html")
    .then((response) => response.text())
    .then((html) => {
      root.innerHTML = html;

      const script = document.createElement("script");
      script.src = "./Cart/cart.js";
      script.onload = () => {
        initCart();
      };
      document.body.appendChild(script);
    });
}

 