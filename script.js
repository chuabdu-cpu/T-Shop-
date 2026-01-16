async function loadProducts() {
    try {
        // تأكد من أن الاسم هنا هو 'product.json' ليتطابق مع ملفك في GitHub
        const response = await fetch('product.json'); 
        const products = await response.json();
        const container = document.getElementById('products-container');
        container.innerHTML = ""; 

        products.forEach(product => {
            const productHTML = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price-container">
                        <span class="pi-price">𝝅 ${product.price_pi}</span>
                        <span class="usd-price">($${product.price_usd})</span>
                    </div>
                    <button class="buy-btn" onclick="onBuyClicked('${product.name}', ${product.price_pi})">شراء الآن</button>
                </div>
            `;
            container.innerHTML += productHTML;
        });
    } catch (error) {
        console.error("خطأ في تحميل المنتجات:", error);
        document.getElementById('products-container').innerHTML = "فشل تحميل المنتجات. تأكد من وجود ملف product.json";
    }
}

function onBuyClicked(productName, amount) {
    const paymentData = {
        amount: amount,
        memo: "شراء " + productName + " من T-Shop",
        metadata: { productName: productName }
    };
    window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: (id) => console.log("Pending...", id),
        onReadyForServerCompletion: (id, txid) => alert("تم الدفع بنجاح!"),
        onCancel: (id) => console.log("Cancelled"),
        onError: (error, payment) => console.error(error)
    });
}

loadProducts();
