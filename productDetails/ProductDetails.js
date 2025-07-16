function initDetails(id){
// const searchParams = location.search; 
// const params = new URLSearchParams(searchParams);
// const id = params.get("productId");
async function getapi() {
    const api = await fetch(`https://dummyjson.com/products/7`);   
    let response = await api.json();
    let data = response;
    console.log(data);
    displayData(data);
}


getapi()


    function displayData(productData){
    let DataProduct = ``;
     DataProduct +=`
                    <div class="col-md-1" id="imagesCol"></div>
                    <div class="col-md-5 main-image">
                    <img src="${productData.thumbnail}" alt="" class="w-100" id="globalImage">
                    </div>
                    <div class="col-md-6">
                     <h2>${productData.title}</h2>
                    <div class="details-icons pt-2 pb-2">
                        <span class="ms-2"><i class="fa-regular fa-square-check ps-1 pro-num"></i> المتبقى <span class="pro-num"> ${productData.stock} </span>وحده</span>
                        <span><i class="fa-solid fa-fire-flame-curved fire-color ps-1"></i> تم شراءة <span class="pro-num">250</span> مره</span>
                    </div>
                    <div class="details-inf pt-2 pb-3 dark-color">
                        <span>
                            <i class="fa-regular fa-star"><span class="fill"></span></i>
                            <i class="fa-regular fa-star"><span class="fill"></span></i>
                            <i class="fa-regular fa-star"><span class="fill"></span></i>
                            <i class="fa-regular fa-star"><span class="fill"></span></i>
                            <i class="fa-regular fa-star ms-2"><span class="fill"></span></i>
                            (${productData.reviews.length})
                            تقييمات
                        </span>
                        <span class="ps-md-4 pe-md-5 fav"><i class="fa-regular fa-heart ps-2"></i>أضف للمفضله</span>
                        <span class="share-pro"><i class="fa-solid fa-share-nodes ps-2"></i>مشاركه المنتج</span>
                    </div>
                    <p class="dark-color">${productData.description}</p>
                    <span class="pro-num">عرض المزيد</span>
                    <div class="product-inf mt-4">
                    <span><i class="fa-solid fa-pen-to-square"></i>  تخصيص المنتج</span>
                    <div class="icon-plus">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                   </div>
                    <div class="product-inf">
                    <span><i class="fa-solid fa-store"></i>  التوفر فى المعارض</span>
                    <div class="icon-plus">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                   </div>
                    <div class="product-inf">
                    <span><i class="fa-solid fa-cart-flatbed-suitcase"></i> وزن المنتج</span>
                    <div class="icon-weight">
                        <span>${productData.weight} أوقية</span>
                    </div>
                   </div>
                    <div class="product-inf">
                    <span><i class="fa-brands fa-galactic-republic"></i> تخصيص المنتج</span>
                    <div class="icon-plus">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                   </div>
                      <div class="product-inf">
                   <div class="right-part">
                     <span><i class="fa-solid fa-gift"></i> أهدى من تحب</span>
                     <p>يمكن الان ارسال الهدايا لمن تحب عن طريق منصتنا وفي الوقت الذي تحبه !</p>
                   </div>
                    <div class="icon-txt">
                        <span>أرسل كهدية </span>
                    </div>
                   </div>
                    <div class="product-inf">
                   <div class="right-part">
                     <span>احصل عليه الان قبل الجميع</span>
                     <p>يمكن الان ارسال الهدايا لمن تحب عن طريق منصتنا وفي الوقت الذي تحبه !</p>
                   </div>
                    <div class="icon-txt">
                        <span>اطلبه الان </span>
                    </div>
                   </div>
                   <div class="total-details mt-4">
                    <div class="count-inf">
                    <span class="ms-3 text-count">  حدد الكمية</span>
                    <div class="details-count">
                    <span class="p-0"><i class="fa-solid fa-plus" onclick="countIncrease()"></i></span>
                    <span class="count-num">1</span>
                    <span class="p-0"><i class="fa-solid fa-minus" onclick="countMinus()"></i></span>
                  </div>
                  </div>
                  <div class="detailes-price">
                  <h4>${productData.price} ر.س</h4>
                  </div> 
                  </div>
                  <div class="details-buttons mt-4">
                        <button class="btn" onclick="openCart()">
                        <i class="fa-solid fa-cart-shopping"></i>
                        الشراء السريع
                    </button>
                   <button class="btn btn-2" onclick="addMyFav(${productData.id},'${productData.title}','${productData.category}',${productData.price},'${productData.thumbnail}')">
                    <i class="fa-solid fa-cart-shopping"></i>
                    أضف للسلة
                   </button>
                    </div>
                   </div>
                   `
    document.getElementById("product-details").innerHTML = DataProduct;
    
//! ========================> Render Stars ============================>

function renderPreciseStars(rating) {
  const stars = document.querySelectorAll('.details-inf .fa-star .fill');
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;

  stars.forEach((fillSpan, index) => {
    if (index < fullStars) {
      fillSpan.style.width = "100%";
    } else if (index === fullStars && decimal > 0) {
      fillSpan.style.width = `${decimal * 100}%`;
    } else {
      fillSpan.style.width = "0%";
    }
  });
}


    renderPreciseStars(productData.rating);

//! ========================> Data Column ============================>
    let dataColumn = ``;
      for(var i=0; i< productData.images.length; i++){
        dataColumn +=`
                        <div class="product-details-images">
                            <img src="${productData.images[i]}" alt="" class="w-100 mb-1 thumb">
                        </div>
        `;
    }
    document.getElementById('imagesCol').innerHTML = dataColumn;

//! ========================> Display Image  ============================>

    const mainImg = document.getElementById("globalImage");
    const thumbs  = document.querySelectorAll("#imagesCol .thumb");

  thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {
    mainImg.src = thumb.src;                 
    thumbs.forEach(t => t.classList.remove("active-thumb"));
    thumb.classList.add("active-thumb");   
  });
});
    
}

//! ========================> Count Plus  ============================>
   window.countIncrease = () =>{
   const counterNow = document.querySelector('.count-num'); 
   const currntNum = Number(counterNow.textContent);
   counterNow.textContent = currntNum + 1;
    }

//! ========================> Count Minus  ============================>

   window.countMinus = () =>{
   const counterNow = document.querySelector('.count-num'); 
   const currntNum = Number(counterNow.textContent);
   if(currntNum > 0){
    counterNow.textContent = currntNum - 1;
   }
   else{
    counterNow.textContent = 0;
   }
    }


//! ========================> Add To Cart  ============================>

window.addMyFav = (id, title, category, price, src_img) => {
    let favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts")) || [];

    const exists = favoriteProducts.find((movie) => movie.id && movie.id === id);
    if (!exists) {
        favoriteProducts.push({ id, title, category, price, src_img });
        console.log(favoriteProducts);
        localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
    }

};    

//! ========================> Open Cart  ============================>

window.openCart = () => {
    renderCart()
};

//?------------------------------------------------------------------


fetch("../productDetails/p-details.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("nada-section").innerHTML = html;
    const myScript = document.createElement("script");
    myScript.src = "productDetails/p-details.js";
    document.body.appendChild(myScript);
  });



}

function renderDetails(proId){
    fetch("../productDetails/ProductDetails.html")
    .then((response) => response.text())
    .then((html) => {
        root.innerHTML = html;

        const script = document.createElement("script");
        script.src = "../productDetails/ProductDetails.js";
        script.onload = () => {
            initDetails(proId);
        };
        document.body.appendChild(script);
    });
}