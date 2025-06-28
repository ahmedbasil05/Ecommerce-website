// Product detail page specific JavaScript

let currentProduct = null;
let selectedImageIndex = 0;
let quantity = 1;

document.addEventListener('DOMContentLoaded', function() {
    initializeProductPage();
    updateCartUI();
});

function initializeProductPage() {
    const productId = localStorage.getItem('selectedProduct');
    
    if (!productId) {
        showProductNotFound();
        return;
    }
    
    loadProduct(parseInt(productId));
}

function loadProduct(productId) {
    currentProduct = window.ecommerce.products.find(p => p.id === productId);
    
    if (!currentProduct) {
        showProductNotFound();
        return;
    }
    
    renderProduct();
    updateBreadcrumb();
}

function renderProduct() {
    // Update product name
    document.getElementById('product-name').textContent = currentProduct.name;
    
    // Update images
    const mainImage = document.getElementById('main-image');
    mainImage.src = currentProduct.imageUrl;
    mainImage.alt = currentProduct.name;
    
    // Create thumbnail images (using same image for demo)
    const thumbnailContainer = document.getElementById('thumbnail-container');
    const images = [currentProduct.imageUrl, currentProduct.imageUrl, currentProduct.imageUrl, currentProduct.imageUrl];
    
    thumbnailContainer.innerHTML = images.map((img, index) => `
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${
            selectedImageIndex === index ? 'border-blue-600' : 'border-transparent'
        }" onclick="selectImage(${index})">
            <img src="${img}" alt="${currentProduct.name} ${index + 1}" class="w-full h-full object-cover">
        </div>
    `).join('');
    
    // Update rating
    const starRating = document.getElementById('star-rating');
    starRating.innerHTML = window.ecommerce.getStarRating(currentProduct.rating);
    
    const ratingText = document.getElementById('rating-text');
    ratingText.textContent = `${currentProduct.rating} (${currentProduct.reviewCount} reviews)`;
    
    // Update stock status
    const stockStatus = document.getElementById('stock-status');
    if (currentProduct.inStock) {
        stockStatus.textContent = 'In Stock';
        stockStatus.className = 'text-sm text-green-600 font-medium';
    } else {
        stockStatus.textContent = 'Out of Stock';
        stockStatus.className = 'text-sm text-red-600 font-medium';
    }
    
    // Update prices
    const currentPrice = document.getElementById('current-price');
    currentPrice.textContent = window.ecommerce.formatPrice(currentProduct.price);
    
    const originalPrice = document.getElementById('original-price');
    const discountBadge = document.getElementById('discount-badge');
    
    if (currentProduct.originalPrice) {
        originalPrice.textContent = window.ecommerce.formatPrice(currentProduct.originalPrice);
        originalPrice.classList.remove('hidden');
        
        const discount = window.ecommerce.calculateDiscount(currentProduct.originalPrice, currentProduct.price);
        if (discount > 0) {
            discountBadge.textContent = `-${discount}% off`;
            discountBadge.classList.remove('hidden');
        }
    } else {
        originalPrice.classList.add('hidden');
        discountBadge.classList.add('hidden');
    }
    
    // Update description
    document.getElementById('product-description').textContent = currentProduct.description;
    
    // Update stock count
    const stockCount = document.getElementById('stock-count');
    stockCount.textContent = `Only ${currentProduct.stockCount} left in stock`;
    
    // Update buttons based on stock
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const buyNowBtn = document.getElementById('buy-now-btn');
    
    if (!currentProduct.inStock) {
        addToCartBtn.disabled = true;
        addToCartBtn.classList.add('opacity-50', 'cursor-not-allowed');
        buyNowBtn.disabled = true;
        buyNowBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        addToCartBtn.disabled = false;
        addToCartBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        buyNowBtn.disabled = false;
        buyNowBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

function updateBreadcrumb() {
    const breadcrumbCategory = document.getElementById('breadcrumb-category');
    const breadcrumbProduct = document.getElementById('breadcrumb-product');
    
    if (breadcrumbCategory) {
        breadcrumbCategory.textContent = currentProduct.category.charAt(0).toUpperCase() + currentProduct.category.slice(1);
        breadcrumbCategory.href = `category.html?cat=${currentProduct.category}`;
    }
    
    if (breadcrumbProduct) {
        breadcrumbProduct.textContent = currentProduct.name;
    }
}

function selectImage(index) {
    selectedImageIndex = index;
    const mainImage = document.getElementById('main-image');
    const images = [currentProduct.imageUrl, currentProduct.imageUrl, currentProduct.imageUrl, currentProduct.imageUrl];
    
    mainImage.src = images[index];
    
    // Update thumbnail borders
    const thumbnails = document.querySelectorAll('#thumbnail-container > div');
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.remove('border-transparent');
            thumb.classList.add('border-blue-600');
        } else {
            thumb.classList.remove('border-blue-600');
            thumb.classList.add('border-transparent');
        }
    });
}

function increaseQuantity() {
    if (quantity < currentProduct.stockCount) {
        quantity++;
        document.getElementById('quantity-input').value = quantity;
    }
}

function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
        document.getElementById('quantity-input').value = quantity;
    }
}

// Update quantity when input changes
document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity-input');
    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            const newQuantity = parseInt(this.value);
            if (newQuantity >= 1 && newQuantity <= currentProduct.stockCount) {
                quantity = newQuantity;
            } else {
                this.value = quantity;
            }
        });
    }
});

function addToCartFromProduct() {
    if (!currentProduct || !currentProduct.inStock) {
        window.ecommerce.showToast('Product is out of stock', 'error');
        return;
    }
    
    window.ecommerce.addToCart(currentProduct.id, quantity);
}

function buyNow() {
    if (!currentProduct || !currentProduct.inStock) {
        window.ecommerce.showToast('Product is out of stock', 'error');
        return;
    }
    
    // Add to cart first
    window.ecommerce.addToCart(currentProduct.id, quantity);
    
    // Then navigate to checkout
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 500);
}

function showProductNotFound() {
    document.getElementById('product-container').classList.add('hidden');
    document.getElementById('product-not-found').classList.remove('hidden');
}

function searchProducts() {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        localStorage.setItem('searchQuery', query);
        window.location.href = 'category.html';
    }
}

// Toggle cart functionality (reuse from main script)
function toggleCart() {
    return window.ecommerce.toggleCart();
}

function goToCheckout() {
    return window.ecommerce.goToCheckout();
}

// Allow Enter key to trigger search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
});