document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const productsList = document.getElementById("products-list");
  const priceSlider = document.getElementById("price-slider");
  const maxPriceDisplay = document.getElementById("max-price");
  const applyFiltersBtn = document.getElementById("apply-filters");
  const resetFiltersBtn = document.getElementById("reset-filters");
  const sortSelect = document.getElementById("sort");
  const loadMoreBtn = document.getElementById("load-more");
  const categoriesContainer = document.getElementById("categories-container");
  const brandsContainer = document.getElementById("brands-container");
  const gridViewBtn = document.getElementById("grid-view");
  const listViewBtn = document.getElementById("list-view");

  // Global variables
  let allProducts = [];
  let displayedProducts = 0;
  const productsPerLoad = 5;
  let currentFilters = {
    categories: [],
    price: 2000,
    rating: 0,
    brands: [],
    discount: false,
  };

  // Initialize the page
  async function init() {
    await fetchProducts();
    setupEventListeners();
    resetFilters(); // Start with all filters reset
  }

  // Fetch products from DummyJSON API
  async function fetchProducts() {
    try {
      // Show loading state
      productsList.innerHTML = `
        <div class="no-products-found">
          <i class="fas fa-spinner fa-spin"></i>
          <p>جاري تحميل المنتجات...</p>
        </div>
      `;

      // Fetch products from DummyJSON
      const response = await fetch("https://dummyjson.com/products?limit=15");
      const data = await response.json();
      allProducts = data.products;

      // Process products data
      processProductsData();

      // Extract and render filter options
      extractAndRenderFilterOptions();
    } catch (error) {
      console.error("Error fetching products:", error);
      productsList.innerHTML = `
        <div class="no-products-found">
          <i class="fas fa-exclamation-triangle"></i>
          <p>حدث خطأ أثناء تحميل المنتجات</p>
          <p>يرجى المحاولة مرة أخرى</p>
        </div>
      `;
    }
  }

  // Process products data for our needs
  function processProductsData() {
    allProducts = allProducts.map((product) => {
      // Convert price to SAR (just for demo)
      const priceSAR = Math.floor(product.price * 3.75);
      const discountPercentage =
        product.discountPercentage || Math.floor(Math.random() * 50) + 5; // 5-55%
      const oldPrice =
        discountPercentage > 0
          ? Math.floor(priceSAR / (1 - discountPercentage / 100))
          : null;

      return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: priceSAR,
        oldPrice: oldPrice,
        discountPercentage: discountPercentage,
        rating: product.rating,
        brand: product.brand,
        category: product.category,
        thumbnail: product.thumbnail,
        images: product.images,
        inStock: Math.random() > 0.2, // 80% chance in stock
        isNew: Math.random() > 0.7, // 30% chance is new
      };
    });
  }

  // Extract categories and brands from products and render filter options
  function extractAndRenderFilterOptions() {
    // Extract unique categories
    const categories = [
      ...new Set(allProducts.map((product) => product.category)),
    ];

    // Extract unique brands
    const brands = [
      ...new Set(
        allProducts.map((product) => product.brand).filter((brand) => brand)
      ),
    ];

    // Render categories
    categoriesContainer.innerHTML = categories
      .map(
        (category) => `
                <div class="filter-option">
                    <input type="checkbox" id="cat-${category.replace(
                      /\s+/g,
                      "-"
                    )}">
                    <label for="cat-${category.replace(
                      /\s+/g,
                      "-"
                    )}">${category}</label>
                </div>
            `
      )
      .join("");

    // Render brands
    brandsContainer.innerHTML = brands
      .map(
        (brand) => `
                <div class="filter-option">
                    <input type="checkbox" id="brand-${brand.replace(
                      /\s+/g,
                      "-"
                    )}">
                    <label for="brand-${brand.replace(
                      /\s+/g,
                      "-"
                    )}">${brand}</label>
                </div>
            `
      )
      .join("");
  }

  // Set up event listeners
  function setupEventListeners() {
    // Price slider
    priceSlider.addEventListener("input", function () {
      maxPriceDisplay.textContent = this.value;
      currentFilters.price = parseInt(this.value);
    });

    // Apply filters button
    applyFiltersBtn.addEventListener("click", applyFilters);

    // Reset filters button
    resetFiltersBtn.addEventListener("click", resetFilters);

    // Sort select
    sortSelect.addEventListener("change", function () {
      applyFilters();
    });

    // Rating checkboxes
    document
      .querySelectorAll('.rating-options input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
          // Uncheck other rating options when one is selected
          if (this.checked) {
            document
              .querySelectorAll('.rating-options input[type="checkbox"]')
              .forEach((cb) => {
                if (cb !== this) cb.checked = false;
              });
          }
          applyFilters();
        });
      });

    // Discount checkbox
    document.getElementById("discount").addEventListener("change", function () {
      currentFilters.discount = this.checked;
      applyFilters();
    });

    // Load more button
    loadMoreBtn.addEventListener("click", loadMoreProducts);

    // View options
    gridViewBtn.addEventListener("click", function () {
      productsList.classList.remove("list-view");
      productsList.classList.add("grid-view");
      gridViewBtn.classList.add("active");
      listViewBtn.classList.remove("active");
    });

    listViewBtn.addEventListener("click", function () {
      productsList.classList.remove("grid-view");
      productsList.classList.add("list-view");
      listViewBtn.classList.add("active");
      gridViewBtn.classList.remove("active");
    });

    // Handle product details button clicks
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("product-details")) {
        const productId = e.target.getAttribute("data-id");
        // window.location.href = `product-details.html?id=${productId}`;
        renderDetails(productId);
      }
    });
  }

  // Apply filters to products
  function applyFilters() {
    // Get selected categories
    currentFilters.categories = [];
    document
      .querySelectorAll('#categories-container input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        currentFilters.categories.push(
          checkbox.id.replace("cat-", "").replace(/-/g, " ")
        );
      });

    // Get selected brands
    currentFilters.brands = [];
    document
      .querySelectorAll('#brands-container input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        currentFilters.brands.push(
          checkbox.id.replace("brand-", "").replace(/-/g, " ")
        );
      });

    // Get selected rating
    currentFilters.rating = 0;
    if (document.getElementById("rating-5").checked) currentFilters.rating = 5;
    else if (document.getElementById("rating-4").checked)
      currentFilters.rating = 4;
    else if (document.getElementById("rating-3").checked)
      currentFilters.rating = 3;

    // Filter products
    let filteredProducts = allProducts.filter((product) => {
      // Category filter
      const categoryMatch =
        currentFilters.categories.length === 0 ||
        currentFilters.categories.includes(product.category);

      // Price filter
      const priceMatch = product.price <= currentFilters.price;

      // Rating filter
      const ratingMatch =
        currentFilters.rating === 0 || product.rating >= currentFilters.rating;

      // Brand filter
      const brandMatch =
        currentFilters.brands.length === 0 ||
        (product.brand && currentFilters.brands.includes(product.brand));

      // Discount filter
      const discountMatch =
        !currentFilters.discount || product.discountPercentage > 0;

      return (
        categoryMatch &&
        priceMatch &&
        ratingMatch &&
        brandMatch &&
        discountMatch
      );
    });

    // Sort products
    const sortValue = sortSelect.value;
    switch (sortValue) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        filteredProducts.sort(
          (a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0)
        );
        break;
      default:
        // Default sorting (original order)
        filteredProducts.sort((a, b) => a.id - b.id);
    }

    // Reset displayed products counter
    displayedProducts = 0;

    // Display filtered and sorted products
    displayProducts(filteredProducts);
  }

  // Display products in the list
  function displayProducts(productsToDisplay) {
    // Clear existing products
    productsList.innerHTML = "";

    if (productsToDisplay.length === 0) {
      productsList.innerHTML = `
        <div class="no-products-found">
          <i class="fas fa-shopping-cart"></i>
          <p>لا توجد منتجات حتى الآن</p>
          <p>بحثك لم يطابق أي منتجات</p>
          <button id="reset-filters-btn" class="btn">إعادة تعيين الفلاتر</button>
        </div>
      `;

      // Add event listener to the reset button
      document
        .getElementById("reset-filters-btn")
        .addEventListener("click", resetFilters);

      loadMoreBtn.style.display = "none";
      return;
    }

    // Show only the first batch of products
    const productsToShow = productsToDisplay.slice(0, productsPerLoad);
    displayedProducts = productsToShow.length;

    // Render products
    productsToShow.forEach((product) => {
      renderProduct(product);
    });

    // Show/hide load more button
    loadMoreBtn.style.display =
      displayedProducts < productsToDisplay.length ? "block" : "none";
  }

  // Load more products
  function loadMoreProducts() {
    // Get all products that match current filters
    let filteredProducts = allProducts.filter((product) => {
      // Category filter
      const categoryMatch =
        currentFilters.categories.length === 0 ||
        currentFilters.categories.includes(product.category);

      // Price filter
      const priceMatch = product.price <= currentFilters.price;

      // Rating filter
      const ratingMatch =
        currentFilters.rating === 0 || product.rating >= currentFilters.rating;

      // Brand filter
      const brandMatch =
        currentFilters.brands.length === 0 ||
        (product.brand && currentFilters.brands.includes(product.brand));

      // Discount filter
      const discountMatch =
        !currentFilters.discount || product.discountPercentage > 0;

      return (
        categoryMatch &&
        priceMatch &&
        ratingMatch &&
        brandMatch &&
        discountMatch
      );
    });

    // Sort products (using current sort)
    const sortValue = sortSelect.value;
    switch (sortValue) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        filteredProducts.sort(
          (a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0)
        );
        break;
      default:
        // Default sorting (original order)
        filteredProducts.sort((a, b) => a.id - b.id);
    }

    // Get next batch of products
    const nextProducts = filteredProducts.slice(
      displayedProducts,
      displayedProducts + productsPerLoad
    );

    // Render next products
    nextProducts.forEach((product) => {
      renderProduct(product);
    });

    // Update displayed products counter
    displayedProducts += nextProducts.length;

    // Hide load more button if all products are displayed
    if (displayedProducts >= filteredProducts.length) {
      loadMoreBtn.style.display = "none";
    }
  }

  // Reset all filters
  function resetFilters() {
    // Reset all checkboxes to unchecked state
    document
      .querySelectorAll('.filter-sidebar input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.checked = false;
      });

    // Reset price slider to max value
    priceSlider.value = 2000;
    maxPriceDisplay.textContent = "2000";
    currentFilters.price = 2000;

    // Reset rating filter (uncheck all)
    document.getElementById("rating-5").checked = false;
    document.getElementById("rating-4").checked = false;
    document.getElementById("rating-3").checked = false;
    currentFilters.rating = 0;

    // Reset other filters
    currentFilters.categories = [];
    currentFilters.brands = [];
    currentFilters.discount = false;

    // Reset sort select
    sortSelect.value = "default";

    // Show all products (since no filters are selected)
    displayedProducts = 0;
    displayProducts(allProducts);
  }

  // Render a single product
  function renderProduct(product) {
    const productElement = document.createElement("div");
    productElement.className = "product-item";

    // Create old price if exists
    let oldPriceHtml = "";
    if (product.oldPrice) {
      oldPriceHtml = `<span class="product-old-price">${product.oldPrice} ر.س</span>`;
    }

    // Create discount badge if exists
    let discountBadge = "";
    if (product.discountPercentage > 0) {
      discountBadge = `<span class="discount-badge">-${Math.round(
        product.discountPercentage
      )}%</span>`;
    }

    productElement.innerHTML = `
        <div class="product-image">
            <img src="${product.thumbnail}" alt="${product.title}">
            ${discountBadge}
        </div>
        <div class="product-info">
            <div class="product-text-content">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-brand">${
                  product.brand || "علامة تجارية غير معروفة"
                }</p>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <div class="product-price">
                        ${oldPriceHtml}
                        <span>${product.price} ر.س</span>
                    </div>
                </div>
            </div>
            <div class="product-actions">
                <button class="product-details" data-id="${
                  product.id
                }">تفاصيل المنتج</button>
                <button class="wishlist-btn"><i class="far fa-heart"></i></button>
            </div>
        </div>
    `;

    productsList.appendChild(productElement);
  }

  // Initialize the page
  init();
});
