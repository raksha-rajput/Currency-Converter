const BASE_URL = "https://hexarate.paikama.co/api/rates/USD/INR/latest";
// {
//     "status_code": 200,
//     "data": {
//       "base": "USD",
//       "target": "INR",
//       "mid": 89.851,
//       "unit": 1,
//       "timestamp": "2026-01-08T00:00:01.513Z"
//     }
//   }

const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
let fromCurrCode = document.querySelector(".from select");
let toCurrCode = document.querySelector(".To select");
let msg = document.querySelector(".msg")

//console.log(dropdowns[1]);

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode
        if(select.name === "From" && currCode==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "To" && currCode==="INR"){
            newOption.selected = "selected";
        }
          
        
        select.append(newOption)
    }

    select.addEventListener("change" , (evt)=>{
        updateFlag(evt.target);
    })
}


const updateFlag = (elements)=>{
    let currcode = elements.value;
    let countrycode = countryList[currcode];
     let     newsrc  = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img =    elements.parentElement.querySelector("img")
    img.src = newsrc;
};

button.addEventListener("click", async(evt)=>{
evt.preventDefault();

let amount = document.querySelector(".amount input");
let amval = amount.value;
if(amval==="" || amval<0){
    amval =1;
    amount.value = "1";
}

let url = `https://hexarate.paikama.co/api/rates/${fromCurrCode.value}/${toCurrCode.value}/latest`
let response = await fetch(url);
let data = await response.json();
//console.log(data);
let rate = data.data.mid;
let finalamount = rate * amval
//console.log(finalamount);
msg.innerText = `${amval} ${fromCurrCode.value} = ${finalamount}${toCurrCode.value}`;

})