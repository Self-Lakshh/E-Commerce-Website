// CommerceFlow Wishlist State Manager
(function() {
  let wishlist = [];

  // Load wishlist from localStorage
  function loadWishlist() {
    try {
      const stored = localStorage.getItem('cf_wishlist');
      if (stored) {
        wishlist = JSON.parse(stored);
      } else {
        wishlist = [];
      }
    } catch (e) {
      console.error("Failed to load wishlist from localStorage:", e);
      wishlist = [];
    }
  }

  // Save wishlist to localStorage
  function saveWishlist() {
    try {
      localStorage.setItem('cf_wishlist', JSON.stringify(wishlist));
      // Dispatch custom event for reactive UI
      const event = new CustomEvent('cf-wishlist-updated', { detail: { wishlist: wishlist } });
      window.dispatchEvent(event);
    } catch (e) {
      console.error("Failed to save wishlist to localStorage:", e);
    }
  }

  window.WishlistManager = {
    // Get all items in wishlist
    getWishlist: function() {
      loadWishlist();
      return wishlist;
    },

    // Check if item is in wishlist
    isInWishlist: function(productId) {
      loadWishlist();
      return wishlist.some(id => id === parseInt(productId));
    },

    // Toggle wishlist membership
    toggleItem: function(productId) {
      loadWishlist();
      const id = parseInt(productId);
      const index = wishlist.indexOf(id);
      let added = false;

      const product = window.ProductEngine.getProductById(id);
      if (!product) return false;

      if (index > -1) {
        wishlist.splice(index, 1);
        window.UiManager.showToast(`Removed ${product.title} from wishlist`, "info");
      } else {
        wishlist.push(id);
        window.UiManager.showToast(`Added ${product.title} to wishlist`, "success");
        added = true;
      }

      saveWishlist();
      return added;
    },

    // Get total items count
    getWishlistCount: function() {
      loadWishlist();
      return wishlist.length;
    }
  };

  // Initial load
  loadWishlist();
})();
