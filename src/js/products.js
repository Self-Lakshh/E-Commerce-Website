// CommerceFlow Products Database and Query Engine
(function() {
  // Categories and Brands definition
  const CATEGORIES = ["Audio", "Mobile", "Wearables", "Laptops", "Accessories"];
  const BRANDS = ["Apple", "Sony", "Samsung", "Bose", "Logitech", "Dell", "Anker", "Lenovo"];

  // Helper to generate reviews
  function generateReviews(productId, rating) {
    const reviewers = ["Alex M.", "Sarah T.", "David K.", "Emma W.", "Michael P.", "Sophia L.", "James R.", "Olivia B."];
    const comments = {
      5: ["Absolutely amazing product! Exceeded my expectations.", "Superb build quality and performance. Worth every penny.", "Highly recommend! Perfect customer service and fast shipping.", "Best purchase I've made this year. Flawless!"],
      4: ["Very good product, works as advertised. Will buy again.", "Solid performance, but there is some room for minor improvements.", "Great value for the price. Decent specs.", "Happy with the purchase. Good battery life and design."],
      3: ["Average quality. Works fine but nothing special.", "It is okay. A bit overpriced for the feature set.", "Mediocre performance. Had some minor bugs initially.", "Does the job, but build quality could be better."],
      2: ["Disappointed. Stopped working after a week.", "Not worth the money. Features are very limited.", "Poor battery life and very slow response.", "Would not recommend. Better alternatives exist at this price."]
    };
    
    const count = Math.floor(Math.random() * 4) + 2; // 2 to 5 reviews
    const reviews = [];
    
    for (let i = 0; i < count; i++) {
      const r_rating = Math.max(1, Math.min(5, Math.floor(rating) + (Math.random() > 0.5 ? 0 : -1)));
      const reviewer = reviewers[Math.floor(Math.random() * reviewers.length)];
      const list = comments[r_rating] || comments[4];
      const comment = list[Math.floor(Math.random() * list.length)];
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 90)); // up to 90 days ago
      
      reviews.push({
        author: reviewer,
        rating: r_rating,
        date: date.toISOString().split('T')[0],
        comment: comment
      });
    }
    return reviews;
  }

  // Base raw products templates to expand to 120 items
  const baseProducts = [
    // AUDIO
    { name: "WH-1000XM5 Wireless Headphones", category: "Audio", brand: "Sony", price: 348, oldPrice: 399, rating: 4.8, stock: 15, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60", specs: { "Type": "Over-Ear", "Connection": "Bluetooth 5.2", "Battery Life": "30 Hours", "Noise Cancelling": "Industry-leading ANC" } },
    { name: "AirPods Pro (2nd Gen)", category: "Audio", brand: "Apple", price: 229, oldPrice: 249, rating: 4.7, stock: 24, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&auto=format&fit=crop&q=60", specs: { "Type": "In-Ear", "Connection": "Bluetooth 5.3", "Battery Life": "6 Hours (24 in case)", "Water Resistance": "IPX4" } },
    { name: "QuietComfort Ultra Headphones", category: "Audio", brand: "Bose", price: 379, oldPrice: 429, rating: 4.6, stock: 12, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60", specs: { "Type": "Over-Ear", "Connection": "Bluetooth 5.3", "Battery Life": "24 Hours", "Noise Cancelling": "CustomTune ANC" } },
    { name: "SoundLink Flex Bluetooth Speaker", category: "Audio", brand: "Bose", price: 129, oldPrice: 149, rating: 4.5, stock: 18, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60", specs: { "Type": "Portable Speaker", "Connection": "Bluetooth 4.2", "Battery Life": "12 Hours", "Water Resistance": "IP67 Waterproof" } },
    { name: "LinkBuds S True Wireless", category: "Audio", brand: "Sony", price: 148, oldPrice: 199, rating: 4.3, stock: 30, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60", specs: { "Type": "In-Ear", "Connection": "Bluetooth 5.2", "Battery Life": "6 Hours", "Weight": "4.8g per earbud" } },
    { name: "Soundcore Liberty 4 NC", category: "Audio", brand: "Anker", price: 79, oldPrice: 99, rating: 4.4, stock: 45, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=60", specs: { "Type": "In-Ear", "Connection": "Bluetooth 5.3", "Battery Life": "10 Hours", "Noise Cancelling": "98.5% ANC reduction" } },

    // MOBILE
    { name: "iPhone 15 Pro Max", category: "Mobile", brand: "Apple", price: 1199, oldPrice: 1299, rating: 4.9, stock: 8, image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60", specs: { "Display": "6.7-inch Super Retina XDR", "Processor": "A17 Pro chip", "Storage": "256GB", "Camera": "48MP Main | 5x Telephoto" } },
    { name: "Galaxy S24 Ultra", category: "Mobile", brand: "Samsung", price: 1299, oldPrice: 1399, rating: 4.8, stock: 10, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60", specs: { "Display": "6.8-inch Dynamic AMOLED 2X", "Processor": "Snapdragon 8 Gen 3", "Storage": "512GB", "Stylus": "S-Pen Included" } },
    { name: "iPhone 15", category: "Mobile", brand: "Apple", price: 799, oldPrice: 849, rating: 4.5, stock: 14, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=60", specs: { "Display": "6.1-inch Super Retina XDR", "Processor": "A16 Bionic chip", "Storage": "128GB", "Camera": "48MP Dual" } },
    { name: "Galaxy A54 5G", category: "Mobile", brand: "Samsung", price: 349, oldPrice: 449, rating: 4.2, stock: 22, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60", specs: { "Display": "6.4-inch Super AMOLED", "Processor": "Exynos 1380", "Storage": "128GB", "Battery": "5000 mAh" } },
    
    // WEARABLES
    { name: "Apple Watch Series 9", category: "Wearables", brand: "Apple", price: 399, oldPrice: 429, rating: 4.7, stock: 16, image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500&auto=format&fit=crop&q=60", specs: { "Display": "Always-On Retina", "Sensors": "ECG | Blood Oxygen", "Battery Life": "18 Hours", "Water Resistance": "Swimproof 50m" } },
    { name: "Galaxy Watch 6 Classic", category: "Wearables", brand: "Samsung", price: 329, oldPrice: 399, rating: 4.5, stock: 20, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60", specs: { "Display": "1.5-inch Super AMOLED", "Sensors": "BIA body analysis | Sleep", "Bezel": "Rotating Bezel", "OS": "Wear OS Powered by Samsung" } },
    { name: "Apple Watch Ultra 2", category: "Wearables", brand: "Apple", price: 799, oldPrice: 849, rating: 4.9, stock: 5, image: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?w=500&auto=format&fit=crop&q=60", specs: { "Display": "3000 nits Always-On", "Case": "49mm Titanium", "Battery Life": "Up to 36 Hours", "GPS": "Precision Dual-frequency" } },
    
    // LAPTOPS
    { name: "MacBook Air 13 M3", category: "Laptops", brand: "Apple", price: 1099, oldPrice: 1199, rating: 4.8, stock: 9, image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&auto=format&fit=crop&q=60", specs: { "CPU": "Apple M3 Chip", "RAM": "8GB Unified", "Storage": "256GB SSD", "Weight": "2.7 lbs" } },
    { name: "Dell XPS 15", category: "Laptops", brand: "Dell", price: 1699, oldPrice: 1999, rating: 4.6, stock: 6, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60", specs: { "CPU": "Intel Core i7-13700H", "RAM": "16GB DDR5", "Storage": "512GB SSD", "Display": "15.6-inch FHD+" } },
    { name: "Lenovo ThinkPad X1 Carbon Gen 11", category: "Laptops", brand: "Lenovo", price: 1499, oldPrice: 1799, rating: 4.5, stock: 11, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60", specs: { "CPU": "Intel Core i7-1365U vPro", "RAM": "16GB LPDDR5", "Storage": "1TB SSD PCIe Gen 4", "Weight": "2.48 lbs" } },
    { name: "IdeaPad Slim 3", category: "Laptops", brand: "Lenovo", price: 449, oldPrice: 599, rating: 4.1, stock: 17, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60", specs: { "CPU": "Intel Core i3-1215U", "RAM": "8GB LPDDR5", "Storage": "256GB SSD", "Display": "15.6-inch Touchscreen" } },
    
    // ACCESSORIES
    { name: "MX Master 3S Wireless Mouse", category: "Accessories", brand: "Logitech", price: 99, oldPrice: 109, rating: 4.8, stock: 35, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60", specs: { "Sensor": "8K DPI Darkfield", "Buttons": "7 Programmable", "Scroll": "MagSpeed Electromagnetic", "Battery": "Up to 70 days" } },
    { name: "MX Keys S Keyboard", category: "Accessories", brand: "Logitech", price: 109, oldPrice: 119, rating: 4.6, stock: 28, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60", specs: { "Keys": "Smart Backlighting", "Connection": "Bluetooth | Logi Bolt", "Layout": "Full size", "Multi-device": "Up to 3 systems" } },
    { name: "Anker Prime 20,000mAh Power Bank", category: "Accessories", brand: "Anker", price: 129, oldPrice: 139, rating: 4.7, stock: 50, image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?w=500&auto=format&fit=crop&q=60", specs: { "Capacity": "20,000 mAh", "Output": "200W Max total", "Ports": "2x USB-C | 1x USB-A", "Display": "Smart Digital Display" } }
  ];

  // Helper to generate a larger catalog (up to 120 items)
  const products = [];
  let idCounter = 1;

  // Let's populate the database by replicating templates with small variations
  // to create 120 unique products.
  const adjs = ["Premium", "Ultra", "Elite", "Pro", "Classic", "Essential", "Advanced", "NextGen", "Smart", "Compact"];
  const colors = ["Matte Black", "Space Gray", "Silver", "Alpine White", "Navy Blue", "Forest Green", "Rose Gold"];

  // Push base products first
  baseProducts.forEach(bp => {
    products.push({
      id: idCounter++,
      title: bp.name,
      description: `Experience the highest tier of tech design. The ${bp.name} combines cutting-edge utility with premium ${bp.brand} craftsmanship. Designed for durability, performance, and everyday convenience in various tasks.`,
      category: bp.category,
      brand: bp.brand,
      price: bp.price,
      oldPrice: bp.oldPrice,
      rating: bp.rating,
      stock: bp.stock,
      image: bp.image,
      specs: bp.specs,
      reviews: generateReviews(idCounter, bp.rating)
    });
  });

  // Generate additional products dynamically
  while (products.length < 120) {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
    const adj = adjs[Math.floor(Math.random() * adjs.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    let name = "";
    let price = 0;
    let oldPrice = 0;
    let specs = {};
    let image = "";
    
    if (category === "Audio") {
      const types = ["Earbuds", "Wireless Speaker", "Soundbar", "Gaming Headset", "Noise-Cancelling Buds"];
      const type = types[Math.floor(Math.random() * types.length)];
      name = `${brand} ${adj} ${type} (${color})`;
      price = Math.floor(Math.random() * 250) + 49;
      oldPrice = Math.random() > 0.4 ? Math.floor(price * (1 + (Math.random() * 0.3 + 0.1))) : null;
      specs = { "Type": type, "Connection": "Bluetooth 5.3", "Battery Life": `${Math.floor(Math.random() * 20) + 8} Hours`, "Color": color };
      image = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60";
    } else if (category === "Mobile") {
      const types = ["5G Smartphone", "Tablet", "Mini Tablet", "Foldable Phone"];
      const type = types[Math.floor(Math.random() * types.length)];
      name = `${brand} ${adj} ${type} - ${color}`;
      price = Math.floor(Math.random() * 900) + 299;
      oldPrice = Math.random() > 0.4 ? Math.floor(price * (1 + (Math.random() * 0.2 + 0.1))) : null;
      specs = { "Display": `${(Math.random() * 4 + 6).toFixed(1)}-inch screen`, "Processor": "Octa-Core CPU", "Storage": `${Math.random() > 0.5 ? 256 : 128}GB`, "Color": color };
      image = "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60";
    } else if (category === "Wearables") {
      const types = ["Smartwatch Sport", "Fitness Tracker", "Smart Band", "Adventure Watch"];
      const type = types[Math.floor(Math.random() * types.length)];
      name = `${brand} ${adj} ${type} (${color})`;
      price = Math.floor(Math.random() * 400) + 99;
      oldPrice = Math.random() > 0.4 ? Math.floor(price * (1 + (Math.random() * 0.2 + 0.1))) : null;
      specs = { "Display": "OLED Color Screen", "Sensors": "Heart Rate | Activity tracking", "Battery Life": `${Math.floor(Math.random() * 7) + 2} Days`, "Water Resistance": "50m swim-resistant" };
      image = "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60";
    } else if (category === "Laptops") {
      const types = ["Ultrabook Laptop", "Gaming Station", "Convertible 2-in-1", "Developer Edition"];
      const type = types[Math.floor(Math.random() * types.length)];
      name = `${brand} ${adj} ${type} (${color})`;
      price = Math.floor(Math.random() * 1500) + 599;
      oldPrice = Math.random() > 0.4 ? Math.floor(price * (1 + (Math.random() * 0.2 + 0.1))) : null;
      specs = { "CPU": "Latest Gen Processor", "RAM": `${Math.random() > 0.5 ? 16 : 8}GB RAM`, "Storage": `${Math.random() > 0.5 ? 512 : 256}GB SSD`, "Color": color };
      image = "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60";
    } else { // Accessories
      const types = ["Ergonomic Mouse", "Mechanical Keyboard", "USB-C Multi-Hub", "Gan Fast Charger", "Tech Backpack"];
      const type = types[Math.floor(Math.random() * types.length)];
      name = `${brand} ${adj} ${type}`;
      price = Math.floor(Math.random() * 120) + 19;
      oldPrice = Math.random() > 0.4 ? Math.floor(price * (1 + (Math.random() * 0.3 + 0.1))) : null;
      specs = { "Category": type, "Connection": "Plug & Play", "Compatibility": "Universal Windows/macOS", "Warranty": "2 Years" };
      image = "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60";
    }
    
    // Choose appropriate image placeholder from Unsplash search patterns
    // to match categories
    const categoryImages = {
      "Audio": [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60"
      ],
      "Mobile": [
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60"
      ],
      "Wearables": [
        "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1517502884422-41eaaced0168?w=500&auto=format&fit=crop&q=60"
      ],
      "Laptops": [
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60"
      ],
      "Accessories": [
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?w=500&auto=format&fit=crop&q=60"
      ]
    };
    
    const catImages = categoryImages[category];
    image = catImages[Math.floor(Math.random() * catImages.length)];
    
    const rating = parseFloat((Math.random() * 1.2 + 3.8).toFixed(1)); // rating between 3.8 and 5.0
    const stock = Math.floor(Math.random() * 45) + 3; // 3 to 48 in stock
    
    products.push({
      id: idCounter++,
      title: name,
      description: `The ${name} is engineered to represent standard-setting features for modern workloads. Developed using robust electronics and high-grade plastic composite shells, it delivers outstanding utility for any demanding scenario.`,
      category: category,
      brand: brand,
      price: price,
      oldPrice: oldPrice,
      rating: rating,
      stock: stock,
      image: image,
      specs: specs,
      reviews: generateReviews(idCounter, rating)
    });
  }

  // Export DB globally
  window.PRODUCTS_DB = products;
  window.CATEGORIES_DB = CATEGORIES;
  window.BRANDS_DB = BRANDS;

  // Search, Filter, Sort Engine
  window.ProductEngine = {
    // Get single product details
    getProductById: function(id) {
      return products.find(p => p.id === parseInt(id));
    },

    // Search and filter catalog items
    queryProducts: function(filters) {
      let result = [...products];

      // 1. Text Search
      if (filters.search && filters.search.trim() !== "") {
        const query = filters.search.toLowerCase().trim();
        result = result.filter(p => 
          p.title.toLowerCase().includes(query) || 
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        );
      }

      // 2. Category Filter
      if (filters.category && filters.category !== "All") {
        result = result.filter(p => p.category === filters.category);
      }

      // 3. Brand Filters (Array of brands)
      if (filters.brands && filters.brands.length > 0) {
        result = result.filter(p => filters.brands.includes(p.brand));
      }

      // 4. Rating Filters (Min rating threshold)
      if (filters.minRating) {
        result = result.filter(p => p.rating >= parseFloat(filters.minRating));
      }

      // 5. Price range filter
      if (filters.minPrice) {
        result = result.filter(p => p.price >= parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        result = result.filter(p => p.price <= parseFloat(filters.maxPrice));
      }

      // 6. Availability filter
      if (filters.inStockOnly) {
        result = result.filter(p => p.stock > 0);
      }

      // 7. Sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "price-asc":
            result.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            result.sort((a, b) => b.price - a.price);
            break;
          case "rating":
            result.sort((a, b) => b.rating - a.rating);
            break;
          case "featured":
          default:
            // Just sorting by id or default featured criteria
            result.sort((a, b) => b.rating * b.stock - a.rating * a.stock);
            break;
        }
      }

      return result;
    },

    // Fetch related products (same category, different ID)
    getRelatedProducts: function(productId, limit = 4) {
      const current = this.getProductById(productId);
      if (!current) return [];
      
      return products
        .filter(p => p.category === current.category && p.id !== current.id)
        .slice(0, limit);
    },

    // Save a new product review
    addProductReview: function(productId, review) {
      const p = this.getProductById(productId);
      if (p) {
        p.reviews.unshift({
          author: review.author,
          rating: parseInt(review.rating),
          date: new Date().toISOString().split('T')[0],
          comment: review.comment
        });
        
        // Recalculate average rating
        const total = p.reviews.reduce((sum, r) => sum + r.rating, 0);
        p.rating = parseFloat((total / p.reviews.length).toFixed(1));
        return true;
      }
      return false;
    }
  };

  console.log("CommerceFlow Products DB loaded with " + products.length + " products.");
})();
