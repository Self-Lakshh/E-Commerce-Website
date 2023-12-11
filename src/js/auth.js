// CommerceFlow Authentication and Profile Manager
(function() {
  let currentUser = null;

  // Mock Users DB stored in localStorage to persist multiple registered accounts
  function getRegisteredUsers() {
    try {
      const users = localStorage.getItem('cf_registered_users');
      if (users) {
        return JSON.parse(users);
      }
      
      // Default initial mock tester account
      const defaultUsers = [
        {
          name: "John Doe",
          email: "tester@example.com",
          password: "password123",
          phone: "+1 (555) 019-2834",
          addresses: [
            {
              id: 1,
              title: "Home",
              street: "123 Tech Avenue, Apt 4B",
              city: "Silicon Valley",
              state: "CA",
              zip: "94025",
              country: "United States",
              isDefault: true
            }
          ]
        }
      ];
      localStorage.setItem('cf_registered_users', JSON.stringify(defaultUsers));
      return defaultUsers;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  function saveRegisteredUsers(users) {
    localStorage.setItem('cf_registered_users', JSON.stringify(users));
  }

  // Load user session from localStorage
  function loadSession() {
    try {
      const stored = localStorage.getItem('cf_user');
      if (stored) {
        currentUser = JSON.parse(stored);
      } else {
        currentUser = null;
      }
    } catch (e) {
      console.error("Failed to load user session:", e);
      currentUser = null;
    }
  }

  // Save user session
  function saveSession() {
    try {
      if (currentUser) {
        localStorage.setItem('cf_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('cf_user');
      }
      // Notify active navbar and scripts
      const event = new CustomEvent('cf-auth-updated', { detail: { user: currentUser } });
      window.dispatchEvent(event);
    } catch (e) {
      console.error(e);
    }
  }

  window.AuthManager = {
    // Check if user is logged in
    getCurrentUser: function() {
      loadSession();
      return currentUser;
    },

    // Login logic
    login: function(email, password) {
      const users = getRegisteredUsers();
      const user = users.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim() && u.password === password);

      if (user) {
        // Clone user details without password
        currentUser = {
          name: user.name,
          email: user.email,
          phone: user.phone || "",
          addresses: user.addresses || []
        };
        saveSession();
        window.UiManager.showToast(`Welcome back, ${currentUser.name}!`, "success");
        return { success: true };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
    },

    // Register logic
    register: function(name, email, password) {
      const users = getRegisteredUsers();
      const exists = users.some(u => u.email.toLowerCase().trim() === email.toLowerCase().trim());

      if (exists) {
        return { success: false, message: "An account with this email already exists" };
      }

      const newUser = {
        name: name,
        email: email,
        password: password,
        phone: "",
        addresses: []
      };

      users.push(newUser);
      saveRegisteredUsers(users);

      // Auto login after registration
      currentUser = {
        name: newUser.name,
        email: newUser.email,
        phone: "",
        addresses: []
      };
      saveSession();
      window.UiManager.showToast(`Account created! Welcome, ${currentUser.name}!`, "success");
      return { success: true };
    },

    // Logout logic
    logout: function() {
      currentUser = null;
      saveSession();
      window.UiManager.showToast("Logged out successfully", "info");
      return true;
    },

    // Update profile
    updateProfile: function(profileData) {
      loadSession();
      if (!currentUser) return { success: false, message: "No active user session" };

      const users = getRegisteredUsers();
      const userIndex = users.findIndex(u => u.email.toLowerCase().trim() === currentUser.email.toLowerCase().trim());

      if (userIndex > -1) {
        // Update users DB
        users[userIndex].name = profileData.name;
        users[userIndex].phone = profileData.phone;
        
        saveRegisteredUsers(users);

        // Update current session
        currentUser.name = profileData.name;
        currentUser.phone = profileData.phone;
        saveSession();
        
        window.UiManager.showToast("Profile updated successfully", "success");
        return { success: true };
      }
      return { success: false, message: "User not found in database" };
    },

    // Address Management
    saveAddress: function(address) {
      loadSession();
      if (!currentUser) return false;

      const users = getRegisteredUsers();
      const userIndex = users.findIndex(u => u.email.toLowerCase().trim() === currentUser.email.toLowerCase().trim());

      if (userIndex > -1) {
        const addresses = users[userIndex].addresses || [];
        
        if (address.id) {
          // Edit existing address
          const index = addresses.findIndex(a => a.id === address.id);
          if (index > -1) {
            addresses[index] = address;
          }
        } else {
          // Create new address
          address.id = Date.now();
          addresses.push(address);
        }

        // If marked default, clear others
        if (address.isDefault) {
          addresses.forEach(a => {
            if (a.id !== address.id) a.isDefault = false;
          });
        }

        users[userIndex].addresses = addresses;
        saveRegisteredUsers(users);

        currentUser.addresses = addresses;
        saveSession();
        
        window.UiManager.showToast("Address saved successfully", "success");
        return true;
      }
      return false;
    },

    deleteAddress: function(addressId) {
      loadSession();
      if (!currentUser) return false;

      const users = getRegisteredUsers();
      const userIndex = users.findIndex(u => u.email.toLowerCase().trim() === currentUser.email.toLowerCase().trim());

      if (userIndex > -1) {
        let addresses = users[userIndex].addresses || [];
        addresses = addresses.filter(a => a.id !== parseInt(addressId));
        
        // If we deleted default, mark first as default
        if (addresses.length > 0 && !addresses.some(a => a.isDefault)) {
          addresses[0].isDefault = true;
        }

        users[userIndex].addresses = addresses;
        saveRegisteredUsers(users);

        currentUser.addresses = addresses;
        saveSession();
        
        window.UiManager.showToast("Address deleted", "info");
        return true;
      }
      return false;
    }
  };

  // Seed DB with mock users on module load
  getRegisteredUsers();
  // Initial load
  loadSession();
})();
