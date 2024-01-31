const BASE_URL = "http://localhost:8000/users";

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
    <h1>${element.name}</h1>
    <p>${element.username}</p>
    <a href="#">Read More</a>
</div>
    
    `;
  });
}
