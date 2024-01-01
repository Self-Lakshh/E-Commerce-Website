// CommerceFlow UI Utilities & Animation Manager
(function() {
  // Ensure toast container exists on document
  function ensureToastContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  window.UiManager = {
    // Show a floating toast notification
    showToast: function(message, type = "success") {
      const container = ensureToastContainer();
      
      const toast = document.createElement('div');
      toast.className = `cf-toast ${type}`;
      
      // Select appropriate icon
      let icon = "fa-circle-check";
      if (type === "warning") icon = "fa-triangle-exclamation";
      else if (type === "danger") icon = "fa-circle-xmark";
      else if (type === "info") icon = "fa-circle-info";

      toast.innerHTML = `
        <i class="fa-solid ${icon} cf-toast-icon ${type}"></i>
        <div class="cf-toast-message">${message}</div>
        <button class="cf-toast-close" aria-label="Close Toast"><i class="fa-solid fa-xmark"></i></button>
      `;

      // Wire close button click
      toast.querySelector('.cf-toast-close').addEventListener('click', () => {
        this.dismissToast(toast);
      });

      // Append to screen container
      container.appendChild(toast);

      // Auto-dismiss after 4 seconds
      setTimeout(() => {
        this.dismissToast(toast);
      }, 4000);
    },

    // Animate and dismiss a toast
    dismissToast: function(toast) {
      if (toast && toast.parentNode) {
        toast.classList.add('toast-slide-out');
        // Wait for slide-out keyframe to complete before deleting node
        toast.addEventListener('animationend', (e) => {
          if (e.animationName === 'toast-slide-out') {
            toast.remove();
          }
        });
      }
    },

    // Return stars HTML rating bar
    getStarsHtml: function(rating) {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStar;
      
      let html = "";
      for (let i = 0; i < fullStars; i++) {
        html += '<i class="fa-solid fa-star"></i>';
      }
      if (halfStar) {
        html += '<i class="fa-solid fa-star-half-stroke"></i>';
      }
      for (let i = 0; i < emptyStars; i++) {
        html += '<i class="fa-regular fa-star"></i>';
      }
      return html;
    },

    // Render skeleton loaders for catalogs
    renderSkeletons: function(containerElement, count = 8) {
      if (!containerElement) return;
      
      let html = "";
      for (let i = 0; i < count; i++) {
        html += `
          <div class="col-6 col-md-4 col-lg-3 mb-4">
            <div class="skeleton-box p-3">
              <div class="skeleton-image mb-3 rounded"></div>
              <div class="skeleton-text title"></div>
              <div class="skeleton-text mb-3" style="width: 50%;"></div>
              <div class="d-flex justify-content-between align-items-center mt-3">
                <div class="skeleton-text price"></div>
                <div class="skeleton-text" style="width: 32px; height: 32px; border-radius: 50%;"></div>
              </div>
            </div>
          </div>
        `;
      }
      containerElement.innerHTML = html;
    },

    // Render empty states for lists (cart, wishlist)
    renderEmptyState: function(containerElement, message, iconClass = "fa-shopping-cart") {
      if (!containerElement) return;
      
      containerElement.innerHTML = `
        <div class="empty-state py-5">
          <i class="fa-solid ${iconClass} empty-state-icon"></i>
          <h3 class="mt-3">Nothing to show</h3>
          <p class="text-muted">${message}</p>
          <a href="catalog.html" class="btn btn-primary mt-3">
            <i class="fa-solid fa-bag-shopping me-2"></i> Browse Products
          </a>
        </div>
      `;
    }
  };
})();
