// console.log('connected phone hunting')

const loadPhone = async (searchText = 'samsung', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones)
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // step - 1

  const phoneContainer = document.getElementById("card-container");

  // clear phone container card before  adding new cards
  phoneContainer.textContent = "";

  // show all button if there are more than 12 phone
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // console.log("IS show all", isShowAll);

  // display only 12 phone

  if(!isShowAll){
    phones = phones.slice(0, 12);
  }

  // displaying every single phone
  phones.forEach((phone) => {
    // step  - 2
    // console.log(phone)
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card p-4 bg-base-100 shadow-xl";
    // set inner html
    phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
                <button onclick="handleShowDeatils('${phone.slug}')" class="btn btn-primary">Show deatils</button>
              </div>
            </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLodingSpinner(false);
};

// show deatils button

const handleShowDeatils = async (id) => {
    console.log('btn clicked', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
    const phone = data.data;
    showPhoneDeatils(phone);
}

const showPhoneDeatils = (phone) => {
  const phoneName = document.getElementById("show-deatil-phone-name");
    phoneName.innerText = phone.name;
    const showDeatilContainer = document.getElementById("show-deatil-container");
    showDeatilContainer.innerHTML = `
      <img src="${phone.image}" alt=""/>
      <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
      <p><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
      <p><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
      <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
      <p><span class="font-bold">Slug: </span>${phone?.slug}</p>
      <p><span class="font-bold">Release data: </span>${phone?.releaseDate}</p>
      <p><span class="font-bold">Brand: </span>${phone?.brand}</p>
      <p><span class="font-bold">GPS: </span>${phone?.others?.GPS}</p>
      `;
    show_deatils_modal.showModal();
}

// search handle
const handleSearch =(isShowAll)=>{
    toggleLodingSpinner(true);
    const searchfield = document.getElementById("search-field").value;
    console.log(searchfield)
    loadPhone(searchfield, isShowAll);
}

// toggle loding spinner

const toggleLodingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all

const handleShowAll = (isShowAll) => {
  handleSearch(true);
};

loadPhone();