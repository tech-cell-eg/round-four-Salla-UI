let reviews = []; 
fetch('https://dummyjson.com/products/1')
  .then(res => res.json())
  .then(product => {
    for (let i = 0; i < product.reviews.length; i++) {
      let item = product.reviews[i];

      reviews.push({
        name: item.reviewerName,             
        date: '12/10/2025', 
        comment: item.comment,              
        rate: item.rating,                    
        image:'https://img.freepik.com/premium-vector/user-icon-icon_1076610-59410.jpg '                           
      });
    }

    console.log(reviews); 
    show_reviews();       
  });


 let end = 5;

function show_reviews() {
  let reviews_num = reviews.slice(0, end); 
  let list = ``;

  for (let i = 0; i < reviews_num.length; i++) {
    list += `
      <div class="review-box d-flex mb-4 border-bottom pb-3">
        <img src="${reviews_num[i].image}" class="profile-img me-3 rounded-circle" alt="image">
        <div>
          <h6 class="mb-1">${reviews_num[i].name}</h6>
 <div class="rating-stars text-warning mb-2">
  ${(() => {
    let stars = '';
    for (let s = 1; s <= 5; s++) {
      stars += `<span class="star ${s <= (reviews_num[i].rate || 0) ? 'active' : ''}" data-value="${s}">&#9733;</span>`;
    }
    return stars;
  })()}
</div>

          <div class="float-end text-muted date ">${reviews_num[i].date}</div>
          <p class="mt-2 mb-0">${reviews_num[i].comment}</p>
        </div>
      </div>
    `;
  }

  document.querySelector('.reviews').innerHTML = list;
  document.querySelector(".side").innerHTML=`    <div class="card text-center p-4">
          <h5 class="mb-3 rate ">0 من 5</h5>
          <div class="rating-stars mb-2 fs-4 text-warning">
           <div class="stars" id="star-container">
    <span class="star" data-value="5">&#9733;</span>
    <span class="star" data-value="4">&#9733;</span>
    <span class="star" data-value="3">&#9733;</span>
    <span class="star" data-value="2">&#9733;</span>
    <span class="star" data-value="1">&#9733;</span>
  </div>

          </div>
          <div class="text-muted mb-3">${reviews.length} تقييم من العملاء</div>
          <hr>
          <h6 class="mb-3">أضف تقييمك</h6>
          <textarea class="form-control mb-3" placeholder="اكتب تقييمك هنا..." rows="3"></textarea>
          <button class="add btn btn-success w-100">نشر التعليقات</button>
        </div>`

        document.querySelector(".add").addEventListener('click', added);

        rating();
}

show_reviews();


document.querySelector(".more").addEventListener('click', function
     () {
  if (end < reviews.length) {
    end += 5;
    show_reviews();
  } else {
    document.querySelector(".reviews").innerHTML += `<p class="text-danger text-center">no more reviews</p>`;
   document.querySelector(".more").setAttribute('disabled', true);

  }
});

document.querySelector(".add").addEventListener('click', added );



 document.addEventListener("DOMContentLoaded", rating);
function rating() {
  const stars = document.querySelectorAll("#star-container .star");

  stars.forEach(star => {
    star.addEventListener("click", () => {
      const value = parseInt(star.getAttribute("data-value"));
      selectedRating = value;
      stars.forEach(s => s.classList.remove("active"));
      stars.forEach(s => {
        if (parseInt(s.getAttribute("data-value")) <= value) {
          s.classList.add("active");
        }
      });
document.querySelector(".rate").innerHTML=`${selectedRating} من 5`
      console.log("التقييم المختار:", selectedRating); 
    });
  });}

function  added(){
let today = new Date();
let day = String(today.getDate()).padStart(2, '0');
let month = String(today.getMonth() + 1).padStart(2, '0'); 
let year = today.getFullYear();

let formattedDate = `${day}/${month}/${year}`;

    let new_review={
   name: " user",
      date: formattedDate,
      comment: document.querySelector('textarea').value,
     rate:selectedRating,
      image: "https://img.freepik.com/premium-vector/user-icon-icon_1076610-59410.jpg"
    };
    
reviews.unshift(new_review);
   document.querySelector('textarea').value=" ";
   console.log(reviews);
show_reviews();


}