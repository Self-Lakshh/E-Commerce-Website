// CommerceFlow Checkout & Order Processor
(function() {
  
  // Fetch order history from localStorage
  function getOrderHistory() {
    try {
      const stored = localStorage.getItem('cf_orders');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  // Save order to history database
  function saveOrder(order) {
    try {
      const orders = getOrderHistory();
      orders.unshift(order); // Put new orders first
      localStorage.setItem('cf_orders', JSON.stringify(orders));
    } catch (e) {
      console.error("Failed to save order to history:", e);
    }
  }

  window.CheckoutManager = {
    // Retrieve list of past orders for the logged-in user
    getUserOrders: function(userEmail) {
      if (!userEmail) return [];
      const allOrders = getOrderHistory();
      return allOrders.filter(o => o.userEmail.toLowerCase().trim() === userEmail.toLowerCase().trim());
    },

    // Process and submit order
    placeOrder: function(checkoutData) {
      const user = window.AuthManager.getCurrentUser();
      if (!user) {
        return { success: false, message: "User must be logged in to place an order." };
      }

      const cartItems = window.CartManager.getCart();
      if (cartItems.length === 0) {
        return { success: false, message: "Your cart is empty." };
      }

      // Calculate final pricing totals
      const totals = window.CartManager.getTotals(checkoutData.promoCode || "");

      // Generate invoice transaction code
      const orderNumber = `CF-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;

      const order = {
        orderNumber: orderNumber,
        date: new Date().toISOString().split('T')[0],
        userEmail: user.email,
        items: [...cartItems],
        totals: totals,
        shippingAddress: checkoutData.shippingAddress,
        shippingMethod: checkoutData.shippingMethod || "Standard Delivery",
        paymentMethod: checkoutData.paymentMethod || "Credit Card",
        status: "Processing"
      };

      // 1. Save to order history list
      saveOrder(order);

      // 2. Clear user cart
      window.CartManager.clearCart();

      // 3. Store active order context in sessionStorage for receipt view
      sessionStorage.setItem('cf_latest_order', JSON.stringify(order));

      window.UiManager.showToast("Order placed successfully!", "success");
      return { success: true, orderNumber: orderNumber };
    },

    // Fetch details of last placed order for confirmation screen
    getLatestOrder: function() {
      try {
        const stored = sessionStorage.getItem('cf_latest_order');
        return stored ? JSON.parse(stored) : null;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
})();
