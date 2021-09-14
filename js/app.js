/////////////////////////////////////////// API call start ////////////////////////////////////////
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();
/////////////////////////////////////////// API call end ////////////////////////////////////////




////////////////////////////////// show all product in UI //////////////////////////////////////
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const title = product.title;
    const finalTitle = title.slice(0,20)
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <div class="carD-body">
      <h4>${finalTitle}</h4>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p><span>Rating : ${product.rating.rate}</span> & <span>Review : ${product.rating.count}</span><p/>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-primary" onclick="details(${product.id})">Details</button>
      </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
    document.getElementById('footer').style.display = 'block';
  }
};
////////////////////////////////// show all product in UI //////////////////////////////////////




//////////////////////////////////// add to cart //////////////////////////////////////////////
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal()
};
const orderConfirm = () => {
  document.getElementById('confirm-message').style.display = 'block';
}
const hideMsg = () => {
  document.getElementById('confirm-message').style.display = 'none';
}
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};
//////////////////////////////////// add to cart //////////////////////////////////////////////




////////////////////////////// main price update function ////////////////////////////////////
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};
////////////////////////////// main price update function ////////////////////////////////////



//////////////////////////////// set innerText function ////////////////////////////////////
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};
//////////////////////////////// set innerText function ////////////////////////////////////




////////////////////////// update delivery charge and total Tax ////////////////////////////
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};
//////////////////////////////// set innerText function ////////////////////////////////////



////////////////////////////grandTotal update function /////////////////////////////////////
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
////////////////////////////grandTotal update function /////////////////////////////////////



/////////////////////////////////////// API for modal //////////////////////////////////////
const details = id => {
  fetch(`https://fakestoreapi.com/products/${id}`)
  .then(res => res.json())
  // .then(data => console.log(data))
  .then(data => modal(data))
}
/////////////////////////////////////// API for modal //////////////////////////////////////




////////////////////////// show data on modal /////////////////////////////////////////////
const modal = data => {
  console.log(data);
  const modalBox = document.getElementById('modal');
  modalBox.style.display = 'block';
  modalBox.innerHTML = '';
  const desc = data.description;
  const description = desc.slice(0,100);
  const title = data.title;
  const finalTitle = title.slice(0,20)
  const div = document.createElement('div');
  div.classList.add('singleModal');
  div.innerHTML = `
  <h4>Product Details</h4>
  <img style="width: 100%; height: 250px;" src=${data.image} alt="">
  <h4>Product name :${finalTitle} </h4>
  <h5>Details : ${description}</h5>
  <button class="closeBtn" onclick="closeModal()">Close</button>
  `
  modalBox.appendChild(div);
}

const closeModal = () => {
  document.getElementById('modal').style.display = 'none';
}
////////////////////////// show data on modal /////////////////////////////////////////////
