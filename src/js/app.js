// CommerceFlow Main Application entry and UI Binding
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Global UI Event Bindings
  initGlobalUi();
  
  // Register state change listeners
  window.addEventListener('cf-cart-updated', updateNavbarBadges);
  window.addEventListener('cf-wishlist-updated', updateNavbarBadges);
  window.addEventListener('cf-auth-updated', updateAuthNavbar);

  // Initial Sync
  updateNavbarBadges();
  updateAuthNavbar();
});

// Setup common header/footer dynamics
function initGlobalUi() {
  // Bind quick add/wishlist actions from delegation
  document.body.addEventListener('click', (e) => {
    // Quick Add to Cart button click
    const addCartBtn = e.target.closest('.js-add-to-cart');
    if (addCartBtn) {
      e.preventDefault();
      const id = addCartBtn.dataset.id;
      if (id) {
        window.CartManager.addItem(parseInt(id), 1);
      }
    }

    // Toggle Wishlist button click
    const wishlistBtn = e.target.closest('.js-toggle-wishlist');
    if (wishlistBtn) {
      e.preventDefault();
      const id = wishlistBtn.dataset.id;
      if (id) {
        const added = window.WishlistManager.toggleItem(parseInt(id));
        if (added) {
          wishlistBtn.classList.add('active');
          wishlistBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
        } else {
          wishlistBtn.classList.remove('active');
          wishlistBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }
      }
    }
  });

  // Wire search input forms
  const searchForms = document.querySelectorAll('.js-search-form');
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.js-search-input');
      const query = input ? input.value.trim() : "";
      if (query !== "") {
        window.location.href = `catalog.html?search=${encodeURIComponent(query)}`;
      }
    });
  });
}

// Update Cart and Wishlist badge pill numbers
function updateNavbarBadges() {
  const cartBadge = document.querySelector('.js-cart-count');
  const wishlistBadge = document.querySelector('.js-wishlist-count');

  if (cartBadge) {
    const count = window.CartManager.getCartCount();
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? 'flex' : 'none';
  }

  if (wishlistBadge) {
    const count = window.WishlistManager.getWishlistCount();
    wishlistBadge.textContent = count;
    wishlistBadge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// Sync active session visual updates in Navbar header
function updateAuthNavbar() {
  const authContainer = document.querySelector('.js-auth-nav-container');
  if (!authContainer) return;

  const user = window.AuthManager.getCurrentUser();

  if (user) {
    // Logged in: show profile dropdown
    authContainer.innerHTML = `
      <div class="dropdown user-nav-dropdown">
        <div class="user-profile-badge dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" alt="Avatar">
          <span class="d-none d-md-inline">${user.name.split(' ')[0]}</span>
        </div>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
          <li><h6 class="dropdown-header">Hello, ${user.name}</h6></li>
          <li><a class="dropdown-item" href="dashboard.html"><i class="fa-solid fa-gauge me-2 text-muted"></i> Dashboard</a></li>
          <li><a class="dropdown-item" href="dashboard.html?tab=orders"><i class="fa-solid fa-box me-2 text-muted"></i> My Orders</a></li>
          <li><a class="dropdown-item" href="dashboard.html?tab=wishlist"><i class="fa-solid fa-heart me-2 text-muted"></i> Wishlist</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><button class="dropdown-item text-danger js-logout-btn" type="button"><i class="fa-solid fa-right-from-bracket me-2"></i> Log Out</button></li>
        </ul>
      </div>
    `;

    // Logout click trigger
    authContainer.querySelector('.js-logout-btn').addEventListener('click', () => {
      window.AuthManager.logout();
      window.location.href = 'index.html';
    });

  } else {
    // Logged out: show Sign In button
    authContainer.innerHTML = `
      <a href="auth.html" class="btn btn-outline-primary py-2 px-3 border-0 d-flex align-items-center gap-2">
        <i class="fa-solid fa-circle-user fa-xl"></i>
        <div class="text-start lh-1">
          <span class="d-block text-muted" style="font-size: 0.7rem; font-weight: 400;">Hello, Sign In</span>
          <span class="d-block text-dark fw-bold" style="font-size: 0.85rem; font-family: var(--font-heading);">Your Account</span>
        </div>
      </a>
    `;
  }
}
