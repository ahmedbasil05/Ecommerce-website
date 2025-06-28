// Category page specific JavaScript

let filteredProducts = [];
let currentCategory = null;
let currentFilters = {};
let currentSort = 'featured';

document.addEventListener('DOMContentLoaded', function() {
    initializeCategoryPage();
    updateCartUI();
});

function initializeCategoryPage() {
    // Get category from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('cat');
    const searchQuery = localStorage.getItem('searchQuery');
    
    if (categoryParam) {
        currentCategory = categoryParam;
        localStorage.removeItem('selectedCategory');
    } else {
        currentCategory = localStorage.getItem('selectedCategory');
    }
    
    if (searchQuery) {
        currentFilters.search = searchQuery;
        localStorage.removeItem('searchQuery');
        document.getElementById('search-input').value = searchQuery;
    }
    
    // Set initial filters based on category
    if (currentCategory && currentCategory !== 'all') {
        currentFilters.category = currentCategory;
        // Check the appropriate category checkbox
        const categoryCheckbox = document.querySelector(`input[value="${currentCategory}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
        }
    }
    
    updateBreadcrumb();
    loadProducts();
}

function updateBreadcrumb() {
    const breadcrumbCategory = document.getElementById('breadcrumb-category');
    const categoryName = document.getElementById('category-name');
    
    let displayName = 'All Categories';
    if (currentCategory && currentCategory !== 'all') {
        displayName = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    }
    
    if (breadcrumbCategory) breadcrumbCategory.textContent = displayName;
    if (categoryName) categoryName.textContent = displayName;
}

function loadProducts() {
    showLoading();
    
    // Simulate loading delay
    setTimeout(() => {
        // Start with all products
        let productsToShow = [...window.ecommerce.products];
        
        // Apply filters
        productsToShow = window.ecommerce.filterProducts(productsToShow, currentFilters);
        
        // Apply sorting
        productsToShow = window.ecommerce.sortProducts(productsToShow, currentSort);
        
        filteredProducts = productsToShow;
        renderProducts();
        hideLoading();
    }, 500);
}

function renderProducts() {
    const container = document.getElementById('products-container');
    const productCount = document.getElementById('product-count');
    const emptyState = document.getElementById('empty-state');
    
    if (productCount) {
        productCount.textContent = filteredProducts.length;
    }
    
    if (filteredProducts.length === 0) {
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }
    
    container.classList.remove('hidden');
    emptyState.classList.add('hidden');
    
    container.innerHTML = filteredProducts.map(product => createProductListItem(product)).join('');
}

function createProductListItem(product) {
    const discount = window.ecommerce.calculateDiscount(product.originalPrice, product.price);
    const stars = window.ecommerce.getStarRating(product.rating);
    
    return `
        <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div class="cursor-pointer" onclick="window.ecommerce.goToProduct(${product.id})">
                <img src="${product.imageUrl}" alt="${product.name}" class="w-24 h-24 object-cover rounded-lg">
            </div>
            <div class="flex-1">
                <div class="cursor-pointer" onclick="window.ecommerce.goToProduct(${product.id})">
                    <h3 class="font-semibold text-lg hover:text-blue-600">${product.name}</h3>
                </div>
                <div class="flex items-center gap-2 mt-1">
                    <span class="text-2xl font-bold text-blue-600">${window.ecommerce.formatPrice(product.price)}</span>
                    ${product.originalPrice ? `<span class="text-gray-500 line-through">${window.ecommerce.formatPrice(product.originalPrice)}</span>` : ''}
                    ${discount > 0 ? `<span class="bg-orange-500 text-white text-xs px-2 py-1 rounded">-${discount}%</span>` : ''}
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <div class="flex items-center">
                        ${stars}
                        <span class="ml-1 text-sm text-gray-600">${product.rating}</span>
                    </div>
                    <span class="text-sm text-gray-600">${product.reviewCount} orders</span>
                    ${product.inStock ? '<span class="text-sm text-green-600 font-medium">Free Shipping</span>' : '<span class="text-sm text-red-600 font-medium">Out of Stock</span>'}
                </div>
                <p class="text-sm text-gray-600 mt-2 line-clamp-2">${product.description}</p>
            </div>
            <div class="flex flex-col gap-2">
                <button 
                    onclick="window.ecommerce.addToCart(${product.id})"
                    class="w-32 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                    ${!product.inStock ? 'disabled' : ''}
                >
                    <i class="fas fa-shopping-cart mr-2"></i>
                    Add to Cart
                </button>
                <button 
                    onclick="window.ecommerce.goToProduct(${product.id})"
                    class="w-32 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50"
                >
                    View Details
                </button>
            </div>
        </div>
    `;
}

function applyFilters() {
    // Reset filters
    currentFilters = {};
    
    // Category filters
    const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][value]');
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    if (selectedCategories.length > 0) {
        currentFilters.categories = selectedCategories;
    }
    
    // Price range filters
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;
    
    if (minPrice) {
        currentFilters.minPrice = parseFloat(minPrice);
    }
    
    if (maxPrice) {
        currentFilters.maxPrice = parseFloat(maxPrice);
    }
    
    // Search filter
    const searchInput = document.getElementById('search-input');
    if (searchInput && searchInput.value.trim()) {
        currentFilters.search = searchInput.value.trim();
    }
    
    // Apply category filter if we have a specific category
    if (currentCategory && currentCategory !== 'all') {
        currentFilters.category = currentCategory;
    }
    
    loadProducts();
}

function applySorting() {
    const sortSelect = document.getElementById('sort-select');
    currentSort = sortSelect.value;
    
    // Re-sort and render without reloading
    filteredProducts = window.ecommerce.sortProducts(filteredProducts, currentSort);
    renderProducts();
}

function searchProducts() {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        currentFilters.search = query;
        loadProducts();
    } else {
        delete currentFilters.search;
        loadProducts();
    }
}

function showLoading() {
    const loadingState = document.getElementById('loading-state');
    const productsContainer = document.getElementById('products-container');
    const emptyState = document.getElementById('empty-state');
    
    loadingState.classList.remove('hidden');
    productsContainer.classList.add('hidden');
    emptyState.classList.add('hidden');
}

function hideLoading() {
    const loadingState = document.getElementById('loading-state');
    loadingState.classList.add('hidden');
}

// Enhanced filtering for multiple categories
function filterProductsByCategories(products, categories) {
    if (!categories || categories.length === 0) return products;
    
    return products.filter(product => categories.includes(product.category));
}

// Override the filter function to handle multiple categories
window.ecommerce.filterProducts = function(products, filters = {}) {
    return products.filter(product => {
        // Category filter (can be single category or multiple categories)
        if (filters.category && product.category !== filters.category) return false;
        if (filters.categories && !filters.categories.includes(product.category)) return false;
        
        // Price filters
        if (filters.minPrice && product.price < filters.minPrice) return false;
        if (filters.maxPrice && product.price > filters.maxPrice) return false;
        
        // Stock filter
        if (filters.inStock && !product.inStock) return false;
        
        // Search filter
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            return product.name.toLowerCase().includes(searchTerm) || 
                   product.description.toLowerCase().includes(searchTerm);
        }
        
        return true;
    });
};

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

// Toggle cart functionality (reuse from main script)
function toggleCart() {
    return window.ecommerce.toggleCart();
}

function goToCheckout() {
    return window.ecommerce.goToCheckout();
}