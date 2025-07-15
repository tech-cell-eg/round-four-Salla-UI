function initDetails(){
    function displayData(productData){
        // console.log(productData);
        
    let DataProduct = ``;
     DataProduct +=`
                    <div class="col-md-1" id="imagesCol"></div>
                    <div class="col-md-5 main-image">
                    <img src="${productData.thumbnail}" alt="" class="w-100">
                    </div>
                    <div class="col-md-6">
                     <h2>${productData.title}</h2>
                    <div class="details-icons pt-2 pb-2">
                        <span class="ms-2"><i class="fa-regular fa-square-check ps-1 pro-num"></i> المتبقى <span class="pro-num"> ${productData.stock} </span>وحده</span>
                        <span><i class="fa-solid fa-fire-flame-curved fire-color ps-1"></i> تم شراءة <span class="pro-num">250</span> مره</span>
                    </div>
                    <div class="details-inf pt-2 pb-3 dark-color">
                        <span>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star ms-2"></i>
                            (${productData.reviews.length})
                            تقييمات
                        </span>
                        <span class="ps-4 pe-5"><i class="fa-regular fa-heart ps-2"></i>أضف للمفضله</span>
                        <span><i class="fa-solid fa-share-nodes ps-2"></i>مشاركه المنتج</span>
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
                    <span class="ms-3">  حدد الكمية</span>
                    <div class="details-count">
                    <span><i class="fa-solid fa-plus"></i></span>
                    <span class="count-num">1</span>
                    <span><i class="fa-solid fa-minus"></i></span>
                  </div>
              </div>
                  <div class="detailes-price">
                  <h4>${productData.price} ر.س</h4>
                  </div> 
                  </div>
                  <div class="details-buttons mt-4">
                        <button class="btn">
                        <i class="fa-solid fa-cart-shopping"></i>
                        الشراء السريع
                    </button>
                   <button class="btn btn-2">
                    <i class="fa-solid fa-cart-shopping"></i>
                    أضف للسلة
                   </button>
                    </div>
                   </div>
                   `
    // document.getElementById("product-details").innerHTML = DataProduct;
    console.log(document.getElementById("product-details"));
    


    //! ======================== Data Column ============================
    let dataColumn = ``;
      for(var i=0; i< productData.images.length; i++){
        dataColumn +=`
                        <div class="product-details-images">
                            <img src="${productData.images[i]}" alt="" class="w-100 mb-1">
                        </div>
        `;
    }
    document.getElementById('imagesCol').innerHTML = dataColumn;
    
}
async function getapi() {
    const api = await fetch(`https://dummyjson.com/products/6`);   
    let response = await api.json();
    let data = response;
    console.log(data);
    displayData(data);
}


getapi()




fetch('p-details.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('nada-section').innerHTML = html;
    });

}

function renderDetails(){
    fetch("../productDetails/ProductDetails.html")
    .then((response) => response.text())
    .then((html) => {
        root.innerHTML = html;

        const script = document.createElement("script");
        script.src = "../productDetails/ProductDetails.js";
        script.onload = () => {
            initDetails();
        };
        document.body.appendChild(script);
    });
}