// script.js - Lógica principal del simulador de Tienda Online

// Variables globales
let products = []; // Array dinámico de productos cargados desde API
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Carrito persistente con localStorage

// Elementos del DOM
const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const cartBody = document.querySelector('#cartTable tbody');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
const checkoutForm = document.getElementById('checkoutForm');

// Función asíncrona para cargar productos desde API remota (MockAPI)
async function loadProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Error al cargar productos');
    }
    products = await response.json();
    renderProducts(products);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudieron cargar los productos. Intenta refrescar la página.'
    });
  }
}

// Función para renderizar productos en el HTML (parametrizada por lista de productos)
function renderProducts(productList) {
  productsContainer.innerHTML = '';
  productList.forEach(product => {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6 mb-4';
    col.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text text-success fw-bold">$${product.price.toFixed(2)}</p>
          <p class="card-text text-muted small">${product.description.substring(0, 100)}...</p>
          <button class="btn btn-primary mt-auto add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(col);
  });
}

// Función para agregar/modificar item en carrito (parametrizada por ID y cantidad opcional)
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  updateCart();
  saveCart();
  Swal.fire({
    icon: 'success',
    title: 'Agregado',
    text: `${product.title} se añadió al carrito.`,
    timer: 1500,
    showConfirmButton: false
  });
}

// Función para actualizar la vista del carrito
function updateCart() {
  cartBody.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.title}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input type="number" class="form-control qty-input" data-id="${item.id}" value="${item.quantity}" min="1">
      </td>
      <td>$${subtotal.toFixed(2)}</td>
      <td>
        <button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">X</button>
      </td>
    `;
    cartBody.appendChild(row);
  });

  cartTotalEl.textContent = total.toFixed(2);
  checkoutBtn.disabled = cart.length === 0;
}

// Función para guardar carrito en localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para eliminar item del carrito (parametrizada por ID)
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
  saveCart();
}

// Función para vaciar carrito completo
function clearCart() {
  Swal.fire({
    title: '¿Vaciar carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  }).then(result => {
    if (result.isConfirmed) {
      cart = [];
      updateCart();
      saveCart();
      Swal.fire('Carrito vaciado', '', 'success');
    }
  });
}

// Función para manejar el checkout (simulación)
function handleCheckout(e) {
  e.preventDefault();
  const total = cartTotalEl.textContent;
  Swal.fire({
    icon: 'success',
    title: '¡Compra simulada exitosa!',
    text: `Total pagado: $${total}. Gracias por tu compra.`,
    timer: 3000,
    showConfirmButton: false
  });
  cart = [];
  updateCart();
  saveCart();
  checkoutModal.hide();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  updateCart();
});

productsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('add-to-cart')) {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
  }
});

cartBody.addEventListener('click', e => {
  if (e.target.classList.contains('remove-item')) {
    const productId = parseInt(e.target.dataset.id);
    removeFromCart(productId);
  }
});

cartBody.addEventListener('input', e => {
  if (e.target.classList.contains('qty-input')) {
    const productId = parseInt(e.target.dataset.id);
    const newQty = parseInt(e.target.value);
    if (newQty < 1) {
      e.target.value = 1;
      return;
    }
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.quantity = newQty;
      updateCart();
      saveCart();
    }
  }
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(p => 
    p.title.toLowerCase().includes(query) || 
    p.description.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

clearCartBtn.addEventListener('click', clearCart);

checkoutBtn.addEventListener('click', () => {
  if (cart.length > 0) {
    checkoutModal.show();
  }
});

checkoutForm.addEventListener('submit', handleCheckout);