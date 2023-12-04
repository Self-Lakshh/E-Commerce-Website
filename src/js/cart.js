// CommerceFlow Cart State Manager
(function() {
  let cart = [];

  // Load cart from localStorage
  function loadCart() {
    try {
      const stored = localStorage.getItem('cf_cart');
      if (stored) {
        cart = JSON.parse(stored);
      } else {
        cart = [];
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage:", e);
      cart = [];
    }
  }

  // Save cart to localStorage
  function saveCart() {
    try {
      localStorage.setItem('cf_cart', JSON.stringify(cart));
      // Dispatch custom event for pub-sub reactive UI
      const event = new CustomEvent('cf-cart-updated', { detail: { cart: cart } });
      window.dispatchEvent(event);
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  }

  window.CartManager = {
    // Get all cart items
    getCart: function() {
      return cart;
    },

    // Add item to cart
    addItem: function(productId, quantity = 1, selectedSpecs = {}) {
      loadCart();
      const product = window.ProductEngine.getProductById(productId);
      if (!product) return { success: false, message: "Product not found" };
      
      if (product.stock < quantity) {
        return { success: false, message: `Only ${product.stock} items left in stock` };
      }

      // Check if item already exists in cart with same specs
      const existingIndex = cart.findIndex(item => 
        item.id === product.id && 
        JSON.stringify(item.selectedSpecs) === JSON.stringify(selectedSpecs)
      );

      if (existingIndex > -1) {
        const newQty = cart[existingIndex].quantity + quantity;
        if (product.stock < newQty) {
          return { success: false, message: `Cannot add more. Total in cart exceeds stock (${product.stock})` };
        }
        cart[existingIndex].quantity = newQty;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          brand: product.brand,
          selectedSpecs: selectedSpecs,
          quantity: quantity,
          stockLimit: product.stock
        });
      }

      saveCart();
      
      // Dispatch a toast message notification
      window.UiManager.showToast(`Added ${product.title} to cart`, "success");
      return { success: true };
    },

    // Remove item from cart
    removeItem: function(productId, selectedSpecs = {}) {
      loadCart();
      const initialLength = cart.length;
      cart = cart.filter(item => 
        !(item.id === parseInt(productId) && 
          JSON.stringify(item.selectedSpecs) === JSON.stringify(selectedSpecs))
      );
      
      if (cart.length < initialLength) {
        saveCart();
        window.UiManager.showToast("Removed item from cart", "info");
        return true;
      }
      return false;
    },

    // Update item quantity
    updateQuantity: function(productId, quantity, selectedSpecs = {}) {
      loadCart();
      const item = cart.find(item => 
        item.id === parseInt(productId) && 
        JSON.stringify(item.selectedSpecs) === JSON.stringify(selectedSpecs)
      );

      if (item) {
        const qty = parseInt(quantity);
        if (qty <= 0) {
          return this.removeItem(productId, selectedSpecs);
        }
        
        if (item.stockLimit < qty) {
          window.UiManager.showToast(`Only ${item.stockLimit} items available in stock`, "warning");
          return false;
        }

        item.quantity = qty;
        saveCart();
        return true;
      }
      return false;
    },

    // Clear cart entirely
    clearCart: function() {
      cart = [];
      saveCart();
    },

    // Calculate totals
    getTotals: function(promoCode = "") {
      loadCart();
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Shipping Math
      let shipping = 0;
      if (subtotal > 0 && subtotal < 150) {
        shipping = 15; // standard shipping $15
      }

      // Tax Math (10% flat rate)
      const tax = parseFloat((subtotal * 0.1).toFixed(2));

      // Promo discount Math
      let discount = 0;
      if (promoCode.toUpperCase() === "SAVE10" && subtotal > 0) {
        discount = parseFloat((subtotal * 0.1).toFixed(2)); // 10% discount
      } else if (promoCode.toUpperCase() === "WELCOME5" && subtotal > 0) {
        discount = 5; // $5 flat off
      }

      const total = parseFloat((subtotal + shipping + tax - discount).toFixed(2));

      return {
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        discount: discount,
        total: Math.max(0, total)
      };
    },

    // Get total item count in cart
    getCartCount: function() {
      loadCart();
      return cart.reduce((count, item) => count + item.quantity, 0);
    }
  };

  // Initial load
  loadCart();
})();
