// Checkout page specific JavaScript

let cartItems = [];
let subtotal = 0;
let tax = 0;
let total = 0;

document.addEventListener('DOMContentLoaded', function() {
    initializeCheckoutPage();
    updateCartUI();
});

function initializeCheckoutPage() {
    loadCartData();
    
    if (cartItems.length === 0) {
        showEmptyCartState();
    } else {
        showCheckoutContent();
        renderOrderSummary();
        calculateTotals();
    }
    
    setupFormValidation();
}

function loadCartData() {
    cartItems = window.ecommerce.cart || [];
}

function showEmptyCartState() {
    document.getElementById('empty-cart-state').classList.remove('hidden');
    document.getElementById('checkout-content').classList.add('hidden');
}

function showCheckoutContent() {
    document.getElementById('empty-cart-state').classList.add('hidden');
    document.getElementById('checkout-content').classList.remove('hidden');
}

function renderOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    
    orderItemsContainer.innerHTML = cartItems.map(item => `
        <div class="flex items-center gap-3">
            <img src="${item.product.imageUrl}" alt="${item.product.name}" class="w-12 h-12 object-cover rounded">
            <div class="flex-1">
                <h4 class="font-medium text-sm">${item.product.name}</h4>
                <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
            </div>
            <span class="font-medium">${window.ecommerce.formatPrice(item.product.price * item.quantity)}</span>
        </div>
    `).join('');
}

function calculateTotals() {
    subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    tax = subtotal * 0.08; // 8% tax
    total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = window.ecommerce.formatPrice(subtotal);
    document.getElementById('tax').textContent = window.ecommerce.formatPrice(tax);
    document.getElementById('total').textContent = window.ecommerce.formatPrice(total);
}

function setupFormValidation() {
    const form = document.getElementById('checkout-form');
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // Format card number input
    const cardNumberInput = document.getElementById('card-number');
    cardNumberInput.addEventListener('input', formatCardNumber);
    
    // Format expiry date input
    const expiryInput = document.getElementById('expiry-date');
    expiryInput.addEventListener('input', formatExpiryDate);
    
    // Format CVV input
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', formatCVV);
}

function validateField(event) {
    const field = event.target;
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    
    clearFieldError(field);
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (!fieldValue) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required`;
    } else {
        // Specific field validations
        switch (fieldName) {
            case 'email':
                if (!isValidEmail(fieldValue)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'cardNumber':
                if (fieldValue.replace(/\s/g, '').length < 16) {
                    isValid = false;
                    errorMessage = 'Card number must be at least 16 digits';
                }
                break;
            case 'expiryDate':
                if (!/^\d{2}\/\d{2}$/.test(fieldValue)) {
                    isValid = false;
                    errorMessage = 'Expiry date must be in MM/YY format';
                }
                break;
            case 'cvv':
                if (fieldValue.length < 3) {
                    isValid = false;
                    errorMessage = 'CVV must be at least 3 digits';
                }
                break;
            case 'zipCode':
                if (fieldValue.length < 5) {
                    isValid = false;
                    errorMessage = 'ZIP code must be at least 5 characters';
                }
                break;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearFieldError(field) {
    if (typeof field === 'object') {
        field.classList.remove('border-red-500');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

function showFieldError(field, message) {
    field.classList.add('border-red-500');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error text-red-500 text-sm mt-1';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function getFieldLabel(fieldName) {
    const labels = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        address: 'Address',
        city: 'City',
        zipCode: 'ZIP Code',
        cardNumber: 'Card Number',
        expiryDate: 'Expiry Date',
        cvv: 'CVV'
    };
    return labels[fieldName] || fieldName;
}

function formatCardNumber(event) {
    let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    
    if (formattedValue.length > 19) {
        formattedValue = formattedValue.substr(0, 19);
    }
    
    event.target.value = formattedValue;
}

function formatExpiryDate(event) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    event.target.value = value;
}

function formatCVV(event) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length > 4) {
        value = value.substring(0, 4);
    }
    
    event.target.value = value;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitOrder(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const orderData = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        orderData[key] = value.trim();
    }
    
    // Validate all fields
    let isFormValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        window.ecommerce.showToast('Please correct the errors in the form', 'error');
        return;
    }
    
    if (cartItems.length === 0) {
        window.ecommerce.showToast('Your cart is empty', 'error');
        return;
    }
    
    // Show loading state
    showOrderProcessing();
    
    // Simulate order processing
    setTimeout(() => {
        processOrder(orderData);
    }, 2000);
}

function showOrderProcessing() {
    const button = document.getElementById('place-order-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    
    button.disabled = true;
    button.classList.add('opacity-75');
    btnText.textContent = 'Processing...';
    btnSpinner.classList.remove('hidden');
}

function hideOrderProcessing() {
    const button = document.getElementById('place-order-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    
    button.disabled = false;
    button.classList.remove('opacity-75');
    btnText.textContent = 'Place Order';
    btnSpinner.classList.add('hidden');
}

function processOrder(orderData) {
    try {
        // Create order object
        const order = {
            id: Date.now(),
            ...orderData,
            items: cartItems,
            subtotal: subtotal,
            tax: tax,
            total: total,
            status: 'confirmed',
            orderDate: new Date().toISOString()
        };
        
        // Save order to localStorage (in a real app, this would be sent to server)
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart
        window.ecommerce.clearCart();
        
        // Show success message
        window.ecommerce.showToast('Order placed successfully! Thank you for your purchase.', 'success');
        
        // Redirect to success page or home
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    } catch (error) {
        console.error('Order processing error:', error);
        window.ecommerce.showToast('There was an error processing your order. Please try again.', 'error');
        hideOrderProcessing();
    }
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