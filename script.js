js

// 1. عرض سعر Pi بالدولار تلقائياً

async function fetchPiPrice() {

try {

const response = await fetch("https: //api.coingecko.com/api/v3/simple 2✓✓price?ids=pi-network&vs_currencies= usd");

const data = await response.json(); const piPrice = data["pi-network"].usd; document.getElementById( "pi-price").innerText = 1 π = piPrice;

} catch (error) {

console.error)"فشل في جلب سعر :"

error);

{

{

fetchPiPrice();

//2 زر تحميل التطبيق

document.getElementById("downloa dBtn").addEventListener("click", () => {

window.location.href = "https://tshop0213.pinet.com/ عدل الرابط

حسب الحاجة

;({// 3 تحميل المنتجات تلقائياً من ملف

products.json

async function loadProducts() { try {

24

const response = await fetch("products.json"); const products = await response.json();

const container = document.getEle mentById("product-list");

products.forEach(product => { const item = document.createElement("div"); item.className = "product-item"; item.innerHTML = ` <h3>product.name</h3> <p>{product.description}</p> >p<السعر: product.price} π</p<

container.appendChild(item);

;({

} catch (error) {

18:57

": فشل تحميل المنتجات")console.error error);

{

loadProducts();{

{

loadProducts();

0

// 4. البحث عن المنتجات

document.getElementById("searchInp ut").addEventListener("input", function 0{

const keyword = this.value.toLowerCase();

const items = document.querySelect

orAll(".product-item");

items.forEach(item => {

item.style.display = item.innerText.

toLowerCase().includes(keyword) ?

"block": "none";

;({

;