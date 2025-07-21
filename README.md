# jQuery E-Ticaret Uygulaması 🛒

## Proje Hakkında

Bu proje, jQuery kullanarak geliştirilmiş modern bir e-ticaret uygulamasıdır. Fake Store API'sini kullanarak ürün verilerini çeker ve kullanıcıya interaktif bir alışveriş deneyimi sunar. Tüm uygulama **tek bir JavaScript dosyasında** IIFE (Immediately Invoked Function Expression) formatında yazılmıştır.

## 🚀 Özellikler

### Day 1 - jQuery Basics & XML/JSON
- ✅ jQuery seçiciler (ID, class, advanced selectors)
- ✅ Event yönetimi (click, hover, vb.)
- ✅ Document.ready() kullanımı
- ✅ JSON veri işleme

### Day 2 - HTML Manipülasyonu & AJAX
- ✅ AJAX ile Fake Store API'den ürün verilerini çekme
- ✅ Dinamik HTML oluşturma ve DOM'a ekleme
- ✅ Ürün kartları dinamik oluşturma
- ✅ Arama kutusu (ürün ID'si ile)
- ✅ Debounce/throttle uygulaması

### Day 3 - jQuery Animasyonlar & Efektler
- ✅ fadeIn(), slideDown() animasyonları
- ✅ Hover efektleri ve .animate() kullanımı
- ✅ Buton animasyonları
- ✅ Özel jQuery plugin geliştirme
- ✅ Slick Carousel entegrasyonu
- ✅ Fancybox ile resim büyütme

### Day 4 - İleri Düzey DOM Manipülasyonu
- ✅ Event delegation (dinamik elementler için)
- ✅ Traversing (.closest(), .find(), vb.)
- ✅ Cloning ile template kullanımı
- ✅ Sepet yönetimi (append, prepend kullanarak)
- ✅ LocalStorage entegrasyonu

## 📁 Proje Yapısı

```
insider-codecraft-25-bootcamp-task12/
├── ecommerce-app.js    # Ana uygulama dosyası (IIFE formatında)
└── README.md          # Bu dosya
```

## 🛠️ Teknolojiler

- **jQuery 3.6.0** - DOM manipülasyonu ve AJAX
- **Bootstrap 5.1.3** - UI framework
- **Font Awesome 6.0** - İkonlar
- **Slick Carousel 1.8.1** - Ürün carousel'ı
- **Fancybox 4.0** - Resim büyütme
- **Fake Store API** - Ürün verileri

## 🚀 Kurulum ve Çalıştırma

### 1. Projeyi İndirin
```bash
git clone https://github.com/kullaniciadi/insider-codecraft-25-bootcamp-task12.git
cd insider-codecraft-25-bootcamp-task12
```

### 2. Basit HTTP Sunucusu Başlatın


**Node.js ile:**
```bash
npx http-server -p 8000
```

**Live Server (VS Code) ile:**
- VS Code'da projeyi açın
- `ecommerce-app.js` dosyasına sağ tıklayın
- "Open with Live Server" seçin

### 3. Tarayıcıda Açın
```
http://localhost:8000
```

## 📖 Kullanım

### Ana Özellikler

1. **Ürün Listesi**: Sayfa yüklendiğinde tüm ürünler otomatik olarak yüklenir
2. **Ürün Arama**: ID ile ürün arama (1-20 arası)
3. **Sepete Ekleme**: "Sepete Ekle" butonuna tıklayarak ürünleri sepete ekleyin
4. **Ürün Detayları**: "Detay Göster" ile ürün detaylarını modal'da görüntüleyin
5. **Resim Büyütme**: Ürün resimlerine tıklayarak büyütülmüş halde görüntüleyin
6. **Sepet Yönetimi**: Sepetten ürün çıkarma ve sepeti temizleme
7. **Carousel**: Öne çıkan ürünlerin otomatik dönen carousel'ı

### Animasyonlar ve Efektler

- **Ürün Kartları**: Hover efektleri ve giriş animasyonları
- **Sepete Ekleme**: Buton animasyonu ve sepet badge güncellemesi
- **Sepet İşlemleri**: Slide animasyonları ile ürün ekleme/çıkarma
- **Arama**: Debounce ile optimize edilmiş arama

## 🔧 Teknik Detaylar

### IIFE Yapısı
Uygulama, global namespace kirliliğini önlemek için IIFE formatında yazılmıştır:

```javascript
(function() {
    'use strict';
    // Tüm uygulama kodu burada
})();
```

### Event Delegation
Dinamik olarak eklenen elementler için event delegation kullanılmıştır:

```javascript
$(document).on('click', '.addToCartBtn', function() {
    // Sepete ekleme işlemi
});
```

### LocalStorage Entegrasyonu
Sepet verileri tarayıcıda saklanır:

```javascript
localStorage.setItem('cart', JSON.stringify(cart));
const cart = JSON.parse(localStorage.getItem('cart')) || [];
```

### Özel jQuery Plugin
Sepet yönetimi için özel plugin geliştirilmiştir:

```javascript
$.fn.cartManager = function(options) {
    // Plugin kodu
};
```

## 🎯 API Kullanımı

### Fake Store API Endpoints

- **Tüm Ürünler**: `GET https://fakestoreapi.com/products`
- **Tek Ürün**: `GET https://fakestoreapi.com/products/{id}`

### AJAX İstekleri

```javascript
$.ajax({
    url: 'https://fakestoreapi.com/products',
    method: 'GET',
    success: function(products) {
        // Başarılı yanıt işleme
    },
    error: function() {
        // Hata işleme
    }
});
```

## 🎨 CSS ve Stil

Uygulama, Bootstrap temel alınarak özel CSS stilleri ile geliştirilmiştir:

- **Responsive tasarım**: Mobil ve masaüstü uyumlu
- **Modern UI**: Gradient arka planlar ve gölge efektleri
- **Animasyonlar**: CSS3 transitions ve keyframes
- **Hover efektleri**: İnteraktif kullanıcı deneyimi

## 🐛 Hata Ayıklama

### Konsol Mesajları
Uygulama başlatıldığında konsola bilgi mesajları yazdırılır:

```javascript
console.log('jQuery E-Ticaret Uygulaması başlatıldı! 🛒');
```

### Yaygın Sorunlar

1. **CORS Hatası**: Dosyayı HTTP sunucusu üzerinden çalıştırın
2. **jQuery Yüklenmedi**: İnternet bağlantınızı kontrol edin
3. **API Yanıt Vermiyor**: Fake Store API'nin durumunu kontrol edin

## 📝 Geliştirme Notları

### Kod Yapısı
- Tüm kod Türkçe yorumlarla açıklanmıştır
- Fonksiyonlar modüler olarak organize edilmiştir
- Error handling tüm AJAX istekleri için eklenmiştir

### Performance Optimizasyonları
- Debounce ile arama optimizasyonu
- Event delegation ile memory leak önleme
- Lazy loading ile animasyon optimizasyonu
