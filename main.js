// Ürünler ve Sepetlerin tanımlanması

const products = [
    { name: "Revolution Reloaded Palette Affection", price: 344.89 },
    { name: "Maybelline New York Lash Sensational Sky High Maskara", price: 479 },
    { name: "Maybelline New York Super Stay Vinyl Ink", price: 719.88 },
    { name: "NYX Professional Makeup Marshmellow Soothing Primer - Makyaj Bazı", price: 799.62 },
];

let cart = [];

// Sepet güncelleme ve yerel depoya kaydetme

const updateCart = () => {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            ${item.name} - ${item.price} TL x ${item.quantity},
            <button onclick="removeFromCart('${item.name}')">Remove</button>,
            <button onclick="increaseQuantity('${item.name}')">+</button>,
            <button onclick="decreaseQuantity('${item.name}')">-</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });
    
    totalPrice.textContent = total;

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Sepete ekleme

const addToCart = (name, price) => {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

// Ürünü sepetten kaldırma

const removeFromCart = (name) => { 
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

// Ürün miktarını arttırma

const increaseQuantity = (name) => { 
    const item = cart.find(item => item.name === name);
    if (item) { 
        item.quantity++;
        updateCart();
    }
}

// Ürün miktarını azaltma

const decreaseQuantity = (name) => {
    const item = cart.find(item => item.name === name);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    } else if (item && item.quantity === 1) { 
        removeFromCart(name);
    }
}

// Sepeti tamamen boşaltma

const clearCart = () => {
    cart = [];
    updateCart();
}

// Sayfa yüklendikten sonra sepeti yerel depolamadan geri yükleme

window.onload = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
};