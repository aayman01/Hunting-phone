// console.log('connected phone hunting')

const loadPhone = async(searchText) => {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await res.json();
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones);
}

const displayPhones = phones => {
    // step - 1

    const phoneContainer = document.getElementById("card-container");

    // clear phone container card before  adding new cards
    phoneContainer.textContent = '';
    
    // show all button if there are more than 12 phone
    const showAllContainer = document.getElementById("show-all-container");
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    // display only 12 phone
    phones = phones.slice(0, 12);

    // displaying every single phone
    phones.forEach( phone =>{
        // step  - 2
        // console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = "card p-4 bg-base-100 shadow-xl";
        // set inner html
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLodingSpinner(false);
}

// search handle

const handleSearch =()=>{
    toggleLodingSpinner(true);
    const searchfield = document.getElementById("search-field").value;
    console.log(searchfield)
    loadPhone(searchfield);
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