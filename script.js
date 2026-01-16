// قاموس اللغات لدعم Web3
const translations = {
    ar: { title: "متجر تي - T-Shop", buy: "شراء بـ Pi", settings: "إعدادات Web3", lang: "اللغة", wallet: "المحفظة" },
    en: { title: "T-Shop", buy: "Pay with Pi", settings: "Web3 Settings", lang: "Language", wallet: "Wallet" },
    fr: { title: "T-Shop", buy: "Payer avec Pi", settings: "Paramètres Web3", lang: "Langue", wallet: "Portefeuille" }
};

// وظيفة تبديل قائمة الإعدادات الزجاجية
function toggleSettings() {
    const menu = document.getElementById('settings-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// تغيير اللغة وتحديث الواجهة فوراً
function changeLanguage(lang) {
    document.title = translations[lang].title;
    const titleElement = document.querySelector('h1');
    if(titleElement) titleElement.innerText = translations[lang].title;
    renderProducts(lang); 
}

// تحميل وعرض الـ 20 منتجاً مع الصور الأربعة لكل منتج
async function renderProducts(lang = 'ar') {
    try {
        const response = await fetch('product.json');
        const products = await response.json();
        const container = document.getElementById('product-container');
        
        if(!container) return;

        container.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="image-container">
                    <div class="product-slider" id="slider-${product.id}">
                        ${product.images.map(img => `<img src="${img}" alt="${product.name}">`).join('')}
                    </div>
                </div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price-tag">π ${product.price}</div>
                <button class="buy-btn" onclick="initiatePayment(${product.price}, '${product.name}')">
                    <i class="fas fa-wallet"></i> ${translations[lang].buy}
                </button>
            </div>
        `).join('');
    } catch (error) {
        console.error("خطأ في تحميل بيانات المنتجات:", error);
    }
}

// تشغيل الدالة عند فتح التطبيق
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
