let checkbox = document.querySelector('.checkbox');
let select=document.querySelector('.select')
let select1=document.querySelector('.select1')
let select2=document.querySelector('.select2')
let button=document.querySelector('button')
function updateBodyColor() {
    let g = checkbox.checked ? true : false;
    console.log(g);
    document.body.style.backgroundColor = g ? 'white' : 'black';
    document.body.style.color = g ?'black':'white' ;
    select.style.backgroundColor = g ? 'white' : 'black';
    select1.style.backgroundColor = g ? 'white' : 'black';
    select2.style.backgroundColor = g ? 'white' : 'black';
    select2.style.border = g ? 'white' : 'black';
    
    select.style.color = g ?'black':'white' ;
    button.style.color = g ?'black':'white';
    select1.style.color = g ?'black':'white' ;
    select2.style.color = g ?'black':'white' ;
    
}
checkbox.addEventListener('change', updateBodyColor);
let url = "https://66e8219fb17821a9d9db812e.mockapi.io/TableofUser";

async function getData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    functiondata(data);
  } catch (error) {
    console.error(error);
  }
}

getData();

let box = document.querySelector('.da');
let butto = document.querySelector('.button');
let addModal = document.querySelector('.addModal');
let addModal2 = document.querySelector('.addModal2');

let btnAdd = document.querySelector(".btnAdd");

let inpName = document.querySelector(".inpName");
let inpEmail = document.querySelector(".inpEmail");
let inpCity = document.querySelector(".s1");
let inpjob = document.querySelector(".s");
let inpPhone = document.querySelector('.s3');

let sortButton = document.querySelector('.sort');

sortButton.onclick = () => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.sort((a, b) => a.name.localeCompare(b.name));
      functiondata(data);
    })
    .catch(error => console.error(error));
};

function functiondata(data) {
  box.innerHTML = "";

  data.forEach((e) => {
    let row = document.createElement('tr');

    let tdName1 = document.createElement('h3');
    let tdName = document.createElement('td');
    let tdName2 = document.createElement('h6');
    let img = document.createElement('img');
    let div = document.createElement('div');
    let tdrre = document.createElement('td');
    let buttonDelete = document.createElement("button");
    buttonDelete.textContent = "🗑️";
    buttonDelete.onclick = () => {
      DeleteUser(e.id);
    };

    tdrre.classList.add('tdrre');
    div.classList.add('div5');
    let di = document.createElement('div');
    img.classList.add('div6');
    di.classList.add('div7');

    let tdCity = document.createElement('td');
    let tdjob = document.createElement('p');
    let tjobtype = document.createElement('p');
    let tdStatus = document.createElement('td');
    let tdPhone = document.createElement('td');

    img.src = 'https://i.pinimg.com/736x/38/f9/49/38f949c5ff0ac6add483b7e8eb05e49f.jpg';
    img.onclick = () => {
      addModal2.showModal();
    };
    tdName1.innerHTML = e.name;
    tdName2.innerHTML = e.Email;
    tdjob.innerHTML = e.City;
    tjobtype.innerHTML = e.job;
    tdPhone.innerHTML = new Date(e.phone).toLocaleDateString();

    if (e.Status === true) {
      tdStatus.innerHTML = "Online";
      tdStatus.classList.add('status1');
    } else {
      tdStatus.innerHTML = "Offline";
      tdStatus.classList.add('status2');
    }

    let tdpust = document.createElement('p');
    tdpust.innerHTML = '✏️';
    tdpust.onclick = () => {
      openModal(e);
    };
    tdpust.classList.add('td1');
    let di1 = document.createElement('div');
    di1.append(tdjob, tjobtype);
    di1.classList.add('di1');
    tdCity.append(di1);
    di.append(tdName1, tdName2);
    div.append(img, di);
    tdName.append(div);
    tdrre.append(buttonDelete, tdpust);
    row.append(tdName, tdCity, tdStatus, tdPhone, tdrre);
    box.appendChild(row);
  });
}

butto.onclick = () => {
  addModal.showModal();
};

btnAdd.onclick = () => {
  let user = {
    name: inpName.value,
    Email: inpEmail.value,
    City: inpCity.value,
    job: inpjob.value,
    Status: false,
    phone: inpPhone.value
  };

  postUser(user);
  addModal.close();

  inpName.value = "";
  inpEmail.value = "";
  inpCity.value = "";
  inpPhone.value = "";
};

async function DeleteUser(id) {
  try {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    getData();
  } catch (error) {
    console.log(error);
  }
}

async function postUser(user) {
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(user)
    });
    getData();
  } catch (error) {
    console.log(error);
  }
}

let close = document.querySelector('.close');
close.onclick = () => {
  addModal2.close();
};

let addModal3 = document.querySelector('.addModal3');
let btAdd1 = document.querySelector(".btnAdd1");

function openModal(e) {
  addModal3.showModal();

  let inpName1 = document.querySelector(".inpName1");
  let inpEmail1 = document.querySelector(".inpEmail1");
  let inpCity1 = document.querySelector(".s5");
  let inpPhone1 = document.querySelector(".s7");
  let inpjob1 = document.querySelector('.s4');
  
  inpName1.value = e.name;
  inpEmail1.value = e.Email;
  inpCity1.value = e.City;
  inpjob1.value = e.job;
  inpPhone1.value = e.phone;

  btAdd1.onclick = () => {
    e.name = inpName1.value;
    e.Email = inpEmail1.value;
    e.City = inpCity1.value;
    e.job = inpjob1.value;
    e.Status = !e.Status;  
    e.phone = inpPhone1.value;

    fetch(`${url}/${e.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(e)
    })
    .then(response => response.json())
    .then(() => {
      getData();
    })
    .catch(error => console.error(error));

    addModal3.close();
  };
}

let input = document.querySelector(".input");
input.oninput = async () => {
    try {
        const response = await fetch(`${url}?name=${input.value}`);
        const data = await response.json();
        functiondata(data);
    } catch (error) {
        console.error(error);
    }
};

let onlineonline = document.querySelector(".onlineonline");

onlineonline.onclick = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        data = data.filter(user => user.Status === true); 
        functiondata(data);  
    })
    .catch(error => console.error(error));
};

let onlineoffline = document.querySelector(".onlineoffline");

onlineoffline.onclick = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        data = data.filter(user => user.Status === false); 
        functiondata(data);  
    })
    .catch(error => console.error(error));
};

let onlineall = document.querySelector(".onlineall");

onlineall.onclick = () => {
    getData(); 
};

