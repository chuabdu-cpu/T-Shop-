// دالة لجلب المنتجات من ملف JSON وعرضها
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        const container = document.getElementById('products-container');

        products.forEach(product => {
            const productHTML = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price-box">
                        <span class="pi-price">𝝅 ${product.price_pi}</span>
                        <span class="usd-price">($${product.price_usd})</span>
                    </div>
                    <button onclick="handlePayment(${product.price_pi})">شراء الآن</button>
                </div>
            `;
            container.innerHTML += productHTML;
        });
    } catch (error) {
        console.error("خطأ في تحميل المنتجات:", error);
    }
}

// دالة معالجة الدفع الخاصة بـ Pi Network
function handlePayment(amount) {
    // هنا يتم استدعاء Pi SDK لإتمام العملية
    console.log("بدء عملية دفع بمبلغ: " + amount + " Pi");
    // بمجرد نجاح هذه العملية، ستكتمل الخانة الأخيرة في قائمة Pi
}

loadProducts();
