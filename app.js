const products = [
  { id: 1, name: "Смартфон", price: 20000, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80" },
  { id: 2, name: "Ноутбук", price: 40000, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80" },
  { id: 3, name: "Навушники", price: 2000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" },
  { id: 4, name: "Смарт-годинник", price: 5000, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80" }
];
let cart = [];
const container = document.getElementById('products-container');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalEl = document.getElementById('cart-total');
function renderProducts(items) {
  container.innerHTML = '';
  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div>
        <img src="${product.img}" alt="${product.name}">
        <h3 class="product-title">${product.name}</h3>
      </div>
      <div>
        <p class="product-price">${product.price.toLocaleString()} грн</p>
        <button onclick="addToCart(${product.id})">Купити</button>
      </div>
    `;
    container.appendChild(card);
  });
}
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCart();
}
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}
function updateCart() {
  cartCountEl.textContent = cart.length;
  cartItemsContainer.innerHTML = '';
  let total = 0;
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Кошик порожній</p>';
  } else {
    cart.forEach((item, index) => {
      total += item.price;
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <span>${item.name} - ${item.price} грн</span>
        <button class="remove-btn" onclick="removeFromCart(${index})">Видалити</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  }
  cartTotalEl.textContent = total.toLocaleString();
}
document.getElementById('cart-btn').onclick = () => cartModal.style.display = 'flex';
document.getElementById('close-cart').onclick = () => cartModal.style.display = 'none';
document.getElementById('search-input').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});
renderProducts(products);