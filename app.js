const BASR_URL = "https://latest.currency-api.pages.dev/v1/currencies"

const dropdownSelects = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurre = document.querySelector(".to select");
const message = document.querySelector(".msg")

// For the extra file created which has country code, we can print and check wether it is accesible or not
// for (code in countryList) {
//     console.log(code , countryList[code])
// }

window.addEventListener("load",()=>{
    updateExchangeRate();
})
for (let select of dropdownSelects) { 
    // Here we are selecting the option we added in the HTML code of select
    for (currencyCode in countryList) {
        // Accessing the data from Code.js file for all the countrycode
        let newOption = document.createElement("option"); // Here a new element is created, "option" means an option type of element is created
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        // This is to define which of the country code is to be shown at the start of the web page
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected"
        } else if (select.name === "to" && currencyCode === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption)  // Here the earlier added options are now appended by the newOption created from list file
    }

    select.addEventListener("change",(evt)=>{  // Here eventListener is added to select and whenever that is changed
        updateFlag(evt.target) // change is brought in the target place of update which is given in the function as "element"
    })
}

const updateFlag = (element) => {
    let currencyCode = element.value;

    // Here the country code is accessed from the countrylist

    let countryCode = countryList[currencyCode]; // INR = IN
    
    // Now we will access the flag link

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    // Now we will select the image option which is present in the parent of element selected
    // To navigate to the image option from the element we will first go to the parent element of select and then to img

    let img = element.parentElement.querySelector("img");


    img.src = newSrc;
}

button.addEventListener("click", async (evt)=>{
    // Here we will give a command which will prevent the page to reload to it's default place
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input")
    let amountVal = amount.value;
    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }
    
    const URL = `${BASR_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json()
    let rate = data[fromCurr.value.toLowerCase()][toCurre.value.toLowerCase()];
    console.log(rate)

    let finalAmount = amountVal * rate;
    console.log(finalAmount);

    message.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurre.value}`

}
