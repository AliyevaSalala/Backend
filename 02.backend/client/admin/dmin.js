const BASE_URL = "http://localhost:3000/products";

const tBody = document.querySelector("tbody");
const form = document.querySelector("form");
const productName = document.querySelector("#product-name");
const productUserName = document.querySelector("#user-name");
const photo = document.querySelector("#photo");

let base64;

async function getAllData() {
  const res = await axios(`${BASE_URL}`);

  // console.log(res.data);
  drawTable(res.data);
}

getAllData();

function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    const trElem = document.createElement("tr");
    trElem.innerHTML = `
    <td>${element.id}</td>
    <td><img src="${element.image}"></td>
    <td>${element.title}</td>
    <td>${element.desc}</td>
    <td><button onclick=deleteBtn("${element.id}",this)>Delete</button> <button onclick= editId("${element.id}")>Edit</button></td>
    `;
    tBody.append(trElem);
  });
}

// =============DELETE

async function deleteBtn(id, btn) {
  try {
    if (confirm("eminmisin???")) {
      const res = await axios.delete(`${BASE_URL}/${id}`);
      if (res.status === 200) {
        btn.closest("tr").remove();
      }
    }
  } catch (error) {
    throw error;
  }
}

//================= POST PATCH

let editStatus = null;

async function editId(id) {
  editStatus = id;
  window.scrollTo(0, 0);
  const res = await axios(`${BASE_URL}/${id}`);

  productName.value = res.data.title;
  productUserName.value = res.data.desc;
  //   photo.value = res.data.image;
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let newObj = {
    image: base64,
    title: productName.value,
    desc: productUserName.value,
  };

  //   if (productName.value && productUserName.value && photo.value) {
  //     await axios.post(`${BASE_URL}`, newObj);
  //     getAllData();
  //   } else {
  //     window.alert("olmazzzzzzzzz");
  //   }
  if (!editStatus) {
    if (productName.value && productUserName.value && photo.value) {
      await axios.post(`${BASE_URL}`, newObj);
    } else {
      alert("!!!!!!");
    }
  } else {
    await axios.patch(`${BASE_URL}/${editStatus}`, newObj);
  }

  productName.value = "";
  productUserName.value = "";
});

photo.addEventListener("change", function (e) {
  console.log(e.target.files[0]);
  uploadImageUrl(e);
});

const uploadImageUrl = async (e) => {
  try {
    const file = e.target.files[0];
    base64 = await convertBase64(file);
    // console.log(base64);
  } catch (error) {
    console.log(error);
  }
};

const convertBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = () => {
      reject(error);
    };
  });
};
