const BASE_URL = "http://localhost:3000/products";

const productCards = document.querySelector(".products-card");

async function getAllData() {
  const res = await axios(`${BASE_URL}`);

  console.log(res.data);
  drawCards(res.data);
}

getAllData();

function drawCards(data) {
  productCards.innerHTML = "";
  data.forEach((element) => {
    productCards.innerHTML += `
    <div class="product-card">
    <img src="${element.image}" alt="">
    <h1>${element.title}</h1>
    <p>${element.desc}</p>
    <a href="#">Read More</a>
</div>
    
    `;
  });
}
