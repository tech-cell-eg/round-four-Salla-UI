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
            
            
            const productPrice = 44.00;
            
         
            let currentQuantity = 1;
            
           
            function initCart() {
                updateTotals();
            }
            
          
            function updateTotals() {
                const subtotal = productPrice * currentQuantity;
                const total = subtotal;
                
                subtotalElement.textContent = subtotal.toFixed(2) + ' رس';
                totalElement.textContent = total.toFixed(2) + ' رس';
            }
            
        
            plusBtn.addEventListener('click', function() {
                currentQuantity++;
                quantityInput.value = currentQuantity;
                updateTotals();
            });
            
           
            minusBtn.addEventListener('click', function() {
                if (currentQuantity > 1) {
                    currentQuantity--;
                    quantityInput.value = currentQuantity;
                    updateTotals();
                }
            });
            
         
            quantityInput.addEventListener('change', function() {
                const newQuantity = parseInt(this.value);
                if (newQuantity >= 1) {
                    currentQuantity = newQuantity;
                    updateTotals();
                } else {
                    this.value = currentQuantity;
                }
            });
             
            removeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                currentQuantity = 0;
                quantityInput.value = 0;
                cartContainer.innerHTML = '<p class="text-center py-4">سلة التسوق فارغة</p>';
                subtotalElement.textContent = '0.00 رس';
                totalElement.textContent = '0.00 رس';
                checkoutBtn.disabled = true;
            });
            
       
            couponBtn.addEventListener('click', function() {
                const couponCode = couponInput.value.trim();
                if (couponCode) {
                    alert('تم تطبيق كود الخصم بنجاح');
                    // Here you would typically apply discount logic
                } else {
                    alert('الرجاء إدخال كود الخصم');
                }
            });
            
            // Handle checkout
            checkoutBtn.addEventListener('click', function() {
                if (currentQuantity > 0) {
                    alert('تم تأكيد الطلب بنجاح! شكراً لشرائك.');
                    // Reset cart
                    currentQuantity = 1;
                    quantityInput.value = 1;
                    updateTotals();
                } else {
                    alert('سلة التسوق فارغة');
                }
            });
            
            // Initialize the cart
            initCart();
        
   
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
       