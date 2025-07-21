// jQuery E-Ticaret Uygulaması - Tek Dosya IIFE Formatında
// Tüm HTML, CSS ve JavaScript kodları bu dosyada

(function() {
    'use strict';
    
    // HTML içeriği
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>jQuery E-Ticaret Uygulaması</title>
        
        <!-- External Libraries -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css">
        
        <style id="app-styles">
            /* CSS Stilleri */
            .product-card {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 15px;
                margin: 10px;
                transition: all 0.3s ease;
                background: white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .product-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            
            .product-image {
                width: 100%;
                height: 200px;
                object-fit: contain;
                border-radius: 5px;
                cursor: pointer;
            }
            
            .cart-item {
                border: 1px solid #28a745;
                background: #f8f9fa;
                margin: 5px 0;
                padding: 10px;
                border-radius: 5px;
                animation: slideInRight 0.3s ease;
            }
            
            .cart-item img {
                width: 50px;
                height: 50px;
                object-fit: contain;
            }
            
            .carousel-container {
                margin: 20px 0;
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
            }
            
            .search-container {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px 0;
                margin-bottom: 30px;
            }
            
            .loading {
                display: none;
                text-align: center;
                padding: 20px;
            }
            
            .price {
                font-size: 1.2em;
                font-weight: bold;
                color: #28a745;
            }
            
            .cart-badge {
                background: #dc3545;
                color: white;
                border-radius: 50%;
                padding: 2px 6px;
                font-size: 0.8em;
                position: absolute;
                top: -5px;
                right: -5px;
            }
            
            #cart {
                max-height: 400px;
                overflow-y: auto;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .pulse-animation {
                animation: pulse 0.3s ease-in-out;
            }
        </style>
    </head>
    <body>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
                <a class="navbar-brand" href="#"><i class="fas fa-shopping-store"></i> E-Ticaret</a>
                <div class="navbar-nav ms-auto">
                    <button class="btn btn-outline-light position-relative" id="cartToggle">
                        <i class="fas fa-shopping-cart"></i> Sepet
                        <span class="cart-badge" id="cartBadge">0</span>
                    </button>
                </div>
            </div>
        </nav>

        <!-- Arama Bölümü -->
        <div class="search-container">
            <div class="container">
                <h2 class="text-center mb-4">Ürün Arama</h2>
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="input-group">
                            <input type="text" class="form-control" id="searchInput" placeholder="Ürün ID'si ile arama yapın (1-20)">
                            <button class="btn btn-light" id="searchBtn"><i class="fas fa-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <!-- Carousel Bölümü -->
            <div class="carousel-container">
                <h3 class="text-center mb-4">Öne Çıkan Ürünler</h3>
                <div id="productCarousel" class="loading">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Yükleniyor...</span>
                    </div>
                </div>
            </div>

            <div class="row">
                <!-- Ürün Listesi -->
                <div class="col-lg-8">
                    <h3>Tüm Ürünler</h3>
                    <div class="loading" id="productsLoading">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Ürünler yükleniyor...</span>
                        </div>
                    </div>
                    <div id="productList" class="row"></div>
                </div>

                <!-- Sepet Bölümü -->
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5><i class="fas fa-shopping-cart"></i> Sepetim</h5>
                            <button class="btn btn-sm btn-danger" id="clearCartBtn">
                                <i class="fas fa-trash"></i> Temizle
                            </button>
                        </div>
                        <div class="card-body">
                            <div id="cart">
                                <p class="text-muted text-center">Sepetiniz boş</p>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between">
                                <strong>Toplam: $<span id="cartTotal">0.00</span></strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Ürün Detay Modalı -->
        <div class="modal fade" id="productModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTitle">Ürün Detayı</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" id="modalBody">
                        <!-- Modal içeriği dinamik olarak yüklenecek -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                        <button type="button" class="btn btn-primary" id="modalAddToCart">Sepete Ekle</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- External Scripts -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"></script>
    </body>
    </html>
    `;

    // Ana uygulama fonksiyonu
    function initializeApp() {
        // HTML'i sayfaya yaz
        document.open();
        document.write(htmlContent);
        document.close();

        // jQuery yüklendikten sonra uygulamayı başlat
        const checkJQuery = setInterval(function() {
            if (typeof jQuery !== 'undefined') {
                clearInterval(checkJQuery);
                startApplication();
            }
        }, 100);
    }

    // Ana uygulama başlatma fonksiyonu
    function startApplication() {
        $(document).ready(function() {
            // Global değişkenler
            let allProducts = [];
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let currentModalProduct = null;
            
            // Sayfa yüklendiğinde sepeti güncelle
            updateCartDisplay();
            
            // Ürünleri yükle
            loadProducts();
            
            // Event listener'lar
            setupEventListeners();
            
            // Debounce fonksiyonu - arama için
            function debounce(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            }
            
            // AJAX ile ürünleri çek
            function loadProducts() {
                $('#productsLoading').show();
                
                $.ajax({
                    url: 'https://fakestoreapi.com/products',
                    method: 'GET',
                    success: function(products) {
                        allProducts = products;
                        displayProducts(products);
                        setupCarousel(products.slice(0, 6)); // İlk 6 ürünü carousel'da göster
                        $('#productsLoading').hide();
                    },
                    error: function() {
                        $('#productsLoading').hide();
                        $('#productList').html('<div class="alert alert-danger">Ürünler yüklenirken hata oluştu!</div>');
                    }
                });
            }
            
            // Ürünleri DOM'a ekle
            function displayProducts(products) {
                const $productList = $('#productList');
                $productList.empty();
                
                // Her ürün için kart oluştur
                $.each(products, function(index, product) {
                    const productCard = createProductCard(product);
                    $productList.append(productCard);
                    
                    // Animasyonlu giriş efekti
                    setTimeout(() => {
                        $(productCard).fadeIn(500);
                    }, index * 100);
                });
            }
            
            // Ürün kartı oluştur (template cloning yaklaşımı)
            function createProductCard(product) {
                const $card = $('<div>')
                    .addClass('col-md-6 col-lg-4 mb-4')
                    .css('display', 'none');
                
                const cardContent = `
                    <div class="product-card h-100" data-product-id="${product.id}">
                        <img src="${product.image}" class="product-image mb-3" alt="${product.title}">
                        <h6 class="card-title">${product.title.substring(0, 50)}...</h6>
                        <p class="text-muted small">${product.description.substring(0, 80)}...</p>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="price">$${product.price}</span>
                            <span class="badge bg-secondary">${product.category}</span>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary btn-sm addToCartBtn">
                                <i class="fas fa-cart-plus"></i> Sepete Ekle
                            </button>
                            <button class="btn btn-outline-info btn-sm showDetailsBtn">
                                <i class="fas fa-eye"></i> Detay Göster
                            </button>
                        </div>
                    </div>
                `;
                
                $card.html(cardContent);
                return $card;
            }
            
            // Carousel kurulumu
            function setupCarousel(products) {
                const $carousel = $('#productCarousel');
                $carousel.empty().removeClass('loading');
                
                // Carousel için ürün kartları oluştur
                $.each(products, function(index, product) {
                    const carouselItem = `
                        <div class="carousel-item text-center p-3">
                            <img src="${product.image}" style="height: 150px; object-fit: contain;" alt="${product.title}">
                            <h6 class="mt-2">${product.title.substring(0, 30)}...</h6>
                            <p class="price">$${product.price}</p>
                            <button class="btn btn-sm btn-primary addToCartBtn" data-product-id="${product.id}">
                                Sepete Ekle
                            </button>
                        </div>
                    `;
                    $carousel.append(carouselItem);
                });
                
                // Slick carousel başlat
                $carousel.slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    dots: true,
                    arrows: true,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });
            }
            
            // Event listener'ları kur
            function setupEventListeners() {
                // Event delegation - dinamik elementler için
                $(document).on('click', '.addToCartBtn', function() {
                    const $btn = $(this);
                    const $productCard = $btn.closest('.product-card, .carousel-item');
                    let productId;
                    
                    if ($productCard.hasClass('product-card')) {
                        productId = $productCard.data('product-id');
                    } else {
                        productId = $btn.data('product-id');
                    }
                    
                    addToCart(productId);
                    
                    // Buton animasyonu
                    $btn.addClass('btn-success pulse-animation').html('<i class="fas fa-check"></i> Eklendi!');
                    setTimeout(() => {
                        $btn.removeClass('btn-success pulse-animation').html('<i class="fas fa-cart-plus"></i> Sepete Ekle');
                    }, 1000);
                });
                
                // Detay göster butonu
                $(document).on('click', '.showDetailsBtn', function() {
                    const $productCard = $(this).closest('.product-card');
                    const productId = $productCard.data('product-id');
                    showProductDetails(productId);
                });
                
                // Sepeti temizle
                $('#clearCartBtn').click(function() {
                    clearCart();
                });
                
                // Modal'dan sepete ekle
                $('#modalAddToCart').click(function() {
                    if (currentModalProduct) {
                        addToCart(currentModalProduct.id);
                        $('#productModal').modal('hide');
                    }
                });
                
                // Arama fonksiyonu - debounce ile
                const debouncedSearch = debounce(function() {
                    const searchTerm = $('#searchInput').val().trim();
                    if (searchTerm) {
                        searchProduct(searchTerm);
                    }
                }, 500);
                
                $('#searchInput').on('input', debouncedSearch);
                $('#searchBtn').click(() => {
                    const searchTerm = $('#searchInput').val().trim();
                    if (searchTerm) {
                        searchProduct(searchTerm);
                    }
                });
                
                // Hover efektleri
                $(document).on('mouseenter', '.product-card', function() {
                    $(this).animate({
                        'box-shadow': '0 8px 25px rgba(0,0,0,0.3)'
                    }, 200);
                }).on('mouseleave', '.product-card', function() {
                    $(this).animate({
                        'box-shadow': '0 2px 4px rgba(0,0,0,0.1)'
                    }, 200);
                });
                
                // Sepet item silme - event delegation
                $(document).on('click', '.remove-cart-item', function() {
                    const productId = $(this).data('product-id');
                    removeFromCart(productId);
                });
                
                // Resim büyütme - Fancybox
                $(document).on('click', '.product-image', function() {
                    const imageSrc = $(this).attr('src');
                    Fancybox.show([{
                        src: imageSrc,
                        type: 'image'
                    }]);
                });
            }
            
            // Sepete ürün ekle
            function addToCart(productId) {
                const product = allProducts.find(p => p.id == productId);
                if (!product) return;
                
                // Sepette zaten var mı kontrol et
                const existingItem = cart.find(item => item.id == productId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        ...product,
                        quantity: 1
                    });
                }
                
                // LocalStorage'a kaydet
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Sepeti güncelle
                updateCartDisplay();
                
                // Sepete ekleme animasyonu
                animateAddToCart();
            }
            
            // Sepetten ürün çıkar
            function removeFromCart(productId) {
                cart = cart.filter(item => item.id != productId);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            }
            
            // Sepeti temizle
            function clearCart() {
                // Animasyonlu temizleme
                $('#cart .cart-item').fadeOut(300, function() {
                    cart = [];
                    localStorage.removeItem('cart');
                    updateCartDisplay();
                });
            }
            
            // Sepet görünümünü güncelle
            function updateCartDisplay() {
                const $cart = $('#cart');
                const $cartBadge = $('#cartBadge');
                
                if (cart.length === 0) {
                    $cart.html('<p class="text-muted text-center">Sepetiniz boş</p>');
                    $cartBadge.text('0');
                    $('#cartTotal').text('0.00');
                    return;
                }
                
                $cart.empty();
                let total = 0;
                
                $.each(cart, function(index, item) {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    
                    const cartItem = `
                        <div class="cart-item" data-product-id="${item.id}">
                            <div class="row align-items-center">
                                <div class="col-3">
                                    <img src="${item.image}" class="img-fluid">
                                </div>
                                <div class="col-6">
                                    <small>${item.title.substring(0, 30)}...</small>
                                    <br>
                                    <span class="text-success">$${item.price} x ${item.quantity}</span>
                                </div>
                                <div class="col-3 text-end">
                                    <button class="btn btn-sm btn-danger remove-cart-item" data-product-id="${item.id}">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    const $cartItem = $(cartItem).hide();
                    $cart.append($cartItem);
                    $cartItem.slideDown(300);
                });
                
                // Sepet badge ve toplam güncelle
                $cartBadge.text(cart.reduce((sum, item) => sum + item.quantity, 0));
                $('#cartTotal').text(total.toFixed(2));
            }
            
            // Ürün detaylarını göster
            function showProductDetails(productId) {
                const product = allProducts.find(p => p.id == productId);
                if (!product) return;
                
                currentModalProduct = product;
                
                const modalContent = `
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${product.image}" class="img-fluid" alt="${product.title}">
                        </div>
                        <div class="col-md-6">
                            <h5>${product.title}</h5>
                            <p class="text-muted">${product.description}</p>
                            <p><strong>Kategori:</strong> ${product.category}</p>
                            <p><strong>Değerlendirme:</strong> 
                                <span class="text-warning">
                                    ${'★'.repeat(Math.floor(product.rating.rate))}
                                </span>
                                (${product.rating.rate}/5 - ${product.rating.count} değerlendirme)
                            </p>
                            <h4 class="price">$${product.price}</h4>
                        </div>
                    </div>
                `;
                
                $('#modalTitle').text(product.title);
                $('#modalBody').html(modalContent);
                $('#productModal').modal('show');
            }
            
            // Ürün arama
            function searchProduct(searchTerm) {
                // Eğer sayı ise ID ile ara
                if (!isNaN(searchTerm)) {
                    const productId = parseInt(searchTerm);
                    if (productId >= 1 && productId <= 20) {
                        $.ajax({
                            url: `https://fakestoreapi.com/products/${productId}`,
                            method: 'GET',
                            success: function(product) {
                                displayProducts([product]);
                                // Arama sonucu animasyonu
                                $('#productList').hide().fadeIn(500);
                            },
                            error: function() {
                                $('#productList').html('<div class="alert alert-warning">Ürün bulunamadı!</div>');
                            }
                        });
                    } else {
                        $('#productList').html('<div class="alert alert-warning">Geçerli bir ürün ID\'si girin (1-20)!</div>');
                    }
                } else {
                    // Tüm ürünleri göster
                    displayProducts(allProducts);
                }
            }
            
            // Sepete ekleme animasyonu
            function animateAddToCart() {
                const $cartBtn = $('#cartToggle');
                $cartBtn.addClass('btn-success');
                
                // Sepet simgesini büyüt-küçült
                $cartBtn.find('i').animate({
                    fontSize: '1.2em'
                }, 200).animate({
                    fontSize: '1em'
                }, 200);
                
                setTimeout(() => {
                    $cartBtn.removeClass('btn-success');
                }, 1000);
            }
            
            // Özel jQuery plugin - sepet yönetimi için
            $.fn.cartManager = function(options) {
                const settings = $.extend({
                    animation: 'fade',
                    duration: 300
                }, options);
                
                return this.each(function() {
                    const $this = $(this);
                    
                    // Plugin metodları
                    $this.data('cartManager', {
                        addItem: function(item) {
                            const $item = $(item);
                            if (settings.animation === 'fade') {
                                $item.hide().appendTo($this).fadeIn(settings.duration);
                            } else if (settings.animation === 'slide') {
                                $item.hide().appendTo($this).slideDown(settings.duration);
                            }
                        },
                        removeItem: function(selector) {
                            const $item = $this.find(selector);
                            if (settings.animation === 'fade') {
                                $item.fadeOut(settings.duration, function() {
                                    $(this).remove();
                                });
                            } else if (settings.animation === 'slide') {
                                $item.slideUp(settings.duration, function() {
                                    $(this).remove();
                                });
                            }
                        },
                        clear: function() {
                            $this.children().fadeOut(settings.duration, function() {
                                $(this).remove();
                            });
                        }
                    });
                });
            };
            
            // Sepet için plugin'i başlat
            $('#cart').cartManager({
                animation: 'slide',
                duration: 300
            });
            
            // Sayfa kaydırma efekti
            $(window).scroll(function() {
                const scrollTop = $(this).scrollTop();
                if (scrollTop > 100) {
                    $('nav').addClass('shadow');
                } else {
                    $('nav').removeClass('shadow');
                }
            });
            
            // Konsola başlangıç mesajı
            console.log('jQuery E-Ticaret Uygulaması başlatıldı! 🛒');
            console.log('Kullanılabilir özellikler:');
            console.log('- AJAX ile ürün yükleme');
            console.log('- Dinamik DOM manipülasyonu');
            console.log('- LocalStorage ile sepet yönetimi');
            console.log('- jQuery animasyonları ve efektleri');
            console.log('- Event delegation');
            console.log('- Debounce ile arama');
            console.log('- Özel jQuery plugin');
        });
    }

    // Sayfa yüklendiğinde uygulamayı başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }

})();
