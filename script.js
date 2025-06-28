// E-commerce Website JavaScript

// Sample product data
const products = [
    {
        id: 1,
        name: "Canon Camera EOS 2000, Black 10x zoom",
        description: "Professional DSLR camera with 10x optical zoom, perfect for capturing stunning photos and videos.",
        price: 998.00,
        originalPrice: 1128.00,
        imageUrl: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        category: "electronics",
        rating: 4.5,
        reviewCount: 154,
        inStock: true,
        stockCount: 12
    },
    {
        id: 2,
        name: "Smart Watch Series 7",
        description: "Latest smartwatch with advanced health monitoring, GPS tracking, and seamless connectivity.",
        price: 299.00,
        originalPrice: 399.00,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        category: "electronics",
        rating: 4.3,
        reviewCount: 89,
        inStock: true,
        stockCount: 25
    },
    {
        id: 3,
        name: "GoPro HERO6 4K Action Camera",
        description: "Compact action camera perfect for adventure recording. Features 4K video recording and waterproof design.",
        price: 649.00,
        originalPrice: 799.00,
        imageUrl: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        category: "electronics",
        rating: 4.7,
        reviewCount: 203,
        inStock: true,
        stockCount: 8
    },
    {
        id: 4,
        name: "Premium Wireless Headphones",
        description: "High-quality over-ear headphones with active noise cancellation and premium sound quality.",
        price: 199.00,
        originalPrice: 249.00,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        category: "electronics",
        rating: 4.4,
        reviewCount: 127,
        inStock: true,
        stockCount: 15
    },
    {
        id: 5,
        name: "Gaming Laptop Pro",
        description: "High-performance gaming laptop with latest graphics card and fast processor.",
        price: 1299.00,
        originalPrice: 1499.00,
        imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        category: "electronics",
        rating: 4.6,
        reviewCount: 95,
        inStock: true,
        stockCount: 6
    },
    {
        id: 6,
        name: "Comfortable Accent Chair",
        description: "Modern accent chair with premium upholstery and ergonomic design.",
        price: 299.00,
        originalPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        category: "home",
        rating: 4.2,
        reviewCount: 67,
        inStock: true,
        stockCount: 20
    },
    {
        id: 7,
        name: "Modern Sofa Set",
        description: "Stylish 3-piece sofa set with contemporary design and premium materials.",
        price: 899.00,
        originalPrice: 1099.00,
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        category: "home",
        rating: 4.5,
        reviewCount: 43,
        inStock: true,
        stockCount: 5
    },
    {
        id: 8,
        name: "Kitchen Dinnerware Set",
        description: "Complete 16-piece dinnerware set with elegant design. Dishwasher and microwave safe.",
        price: 129.00,
        originalPrice: 159.00,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        category: "home",
        rating: 4.3,
        reviewCount: 89,
        inStock: true,
        stockCount: 30
    },
    {
        id: 9,
        name: "Men's Cotton T-Shirt Set",
        description: "Pack of 3 premium cotton t-shirts in multiple colors. Comfortable fit and durable construction.",
        price: 39.99,
        originalPrice: 59.99,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        category: "clothing",
        rating: 4.1,
        reviewCount: 156,
        inStock: true,
        stockCount: 50
    },
    {
        id: 10,
        name: "Denim Shorts",
        description: "Classic blue denim shorts for men. Comfortable fit with quality construction.",
        price: 49.99,
        originalPrice: null,
        imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        category: "clothing",
        rating: 4.0,
        reviewCount: 78,
        inStock: true,
        stockCount: 35
    },
    {
        id: 11,
        name: "Leather Travel Bag",
        description: "Premium leather weekend travel bag with spacious interior and durable construction.",
        price: 199.00,
        originalPrice: 249.00,
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        category: "clothing",
        rating: 4.6,
        reviewCount: 92,
        inStock: true,
        stockCount: 18
    },
    {
        id: 12,
        name: "Premium Leather Wallet",
        description: "Handcrafted leather wallet with multiple card slots and cash compartments.",
        price: 79.99,
        originalPrice: 99.99,
        imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        category: "clothing",
        rating: 4.4,
        reviewCount: 134,
        inStock: true,
        stockCount: 40
    }
];

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    loadHomeProducts();
    loadElectronicsProducts();
    loadRecommendedProducts();
    updateCartUI();
    startCountdownTimer();
});

// Load featured products
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featuredProducts = products.slice(0, 5);
    container.innerHTML = featuredProducts.map(product => createCompactProductCard(product)).join('');
}

// Load home products
function loadHomeProducts() {
    const container = document.getElementById('home-products');
    if (!container) return;
    
    const homeProducts = products.filter(p => p.category === 'home').slice(0, 4);
    container.innerHTML = homeProducts.map(product => createFeaturedProductCard(product)).join('');
}

// Load electronics products
function loadElectronicsProducts() {
    const container = document.getElementById('electronics-products');
    if (!container) return;
    
    const electronicsProducts = products.filter(p => p.category === 'electronics').slice(0, 4);
    container.innerHTML = electronicsProducts.map(product => createFeaturedProductCard(product)).join('');
}

// Load recommended products
function loadRecommendedProducts() {
    const container = document.getElementById('recommended-products');
    if (!container) return;
    
    const recommendedProducts = products.slice(8, 13);
    container.innerHTML = recommendedProducts.map(product => createCompactProductCard(product)).join('');
}

// Create compact product card
function createCompactProductCard(product) {
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    return `
        <div class="bg-white rounded-lg shadow product-card cursor-pointer" onclick="goToProduct(${product.id})">
            <div class="p-4">
                <div class="aspect-square relative mb-3">
                    <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-full object-cover rounded-lg">
                    ${discount > 0 ? `<span class="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">-${discount}%</span>` : ''}
                </div>
                <h4 class="font-medium text-sm mb-1 line-clamp-2">${product.name}</h4>
                <div class="flex items-center gap-2">
                    <span class="font-bold text-blue-600">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="text-gray-500 line-through text-sm">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Create featured product card
function createFeaturedProductCard(product) {
    return `
        <div class="cursor-pointer group" onclick="goToProduct(${product.id})">
            <div class="aspect-square relative mb-3">
                <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform">
            </div>
            <h4 class="font-medium mb-1 line-clamp-2">${product.name}</h4>
            <p class="text-blue-600 font-semibold">From USD ${product.price.toFixed(2)}</p>
        </div>
    `;
}

// Navigation functions
function goToProduct(productId) {
    localStorage.setItem('selectedProduct', productId);
    window.location.href = 'product.html';
}

function goToCategory(category) {
    localStorage.setItem('selectedCategory', category);
    window.location.href = 'category.html';
}

function goToCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }
    window.location.href = 'checkout.html';
}

// Cart functionality
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
            product: product
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showToast(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    renderCartItems();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        renderCartItems();
    }
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    renderCartItems();
}

function updateCartUI() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (cartCountElement) {
        if (cartCount > 0) {
            cartCountElement.textContent = cartCount;
            cartCountElement.classList.remove('hidden');
        } else {
            cartCountElement.classList.add('hidden');
        }
    }
    
    if (cartTotalElement) {
        cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
    }
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    const sidebar = document.getElementById('cart-sidebar');
    
    if (modal.classList.contains('show')) {
        sidebar.style.transform = 'translateX(100%)';
        setTimeout(() => {
            modal.classList.remove('show');
            modal.classList.add('hidden');
        }, 300);
    } else {
        modal.classList.remove('hidden');
        modal.classList.add('show');
        setTimeout(() => {
            sidebar.style.transform = 'translateX(0)';
        }, 10);
        renderCartItems();
    }
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.product.imageUrl}" alt="${item.product.name}" class="w-12 h-12 object-cover rounded">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.product.name}</div>
                <div class="cart-item-price">$${item.product.price.toFixed(2)}</div>
            </div>
            <div class="quantity-control">
                <button onclick="updateQuantity(${item.productId}, ${item.quantity - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.productId}, parseInt(this.value))">
                <button onclick="updateQuantity(${item.productId}, ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <button onclick="removeFromCart(${item.productId})" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Search functionality
function searchProducts() {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        localStorage.setItem('searchQuery', query);
        window.location.href = 'category.html';
    }
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

// Newsletter subscription
function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email').value;
    if (email && isValidEmail(email)) {
        showToast('Successfully subscribed to newsletter!', 'success');
        document.getElementById('newsletter-email').value = '';
    } else {
        showToast('Please enter a valid email address', 'error');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toast notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} show`;
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Countdown timer for deals
function startCountdownTimer() {
    // Set a target date (e.g., 5 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            // Timer expired, reset to 5 days
            targetDate.setDate(targetDate.getDate() + 5);
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('cart-modal');
    const cartButton = e.target.closest('[onclick="toggleCart()"]');
    
    if (modal && modal.classList.contains('show') && !cartButton && e.target === modal) {
        toggleCart();
    }
});

// Utility functions
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function calculateDiscount(originalPrice, currentPrice) {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star star-rating"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt star-rating"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star star-rating"></i>';
    }
    
    return stars;
}

// Product filtering and sorting
function filterProducts(products, filters = {}) {
    return products.filter(product => {
        if (filters.category && product.category !== filters.category) return false;
        if (filters.minPrice && product.price < filters.minPrice) return false;
        if (filters.maxPrice && product.price > filters.maxPrice) return false;
        if (filters.inStock && !product.inStock) return false;
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            return product.name.toLowerCase().includes(searchTerm) || 
                   product.description.toLowerCase().includes(searchTerm);
        }
        return true;
    });
}

function sortProducts(products, sortBy = 'featured') {
    const sortedProducts = [...products];
    
    switch (sortBy) {
        case 'price-low':
            return sortedProducts.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sortedProducts.sort((a, b) => b.price - a.price);
        case 'rating':
            return sortedProducts.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sortedProducts.sort((a, b) => b.id - a.id);
        case 'name':
            return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return sortedProducts;
    }
}

// Export functions for use in other pages
window.ecommerce = {
    products,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    updateCartUI,
    toggleCart,
    goToProduct,
    goToCategory,
    goToCheckout,
    searchProducts,
    filterProducts,
    sortProducts,
    showToast,
    formatPrice,
    calculateDiscount,
    getStarRating
};