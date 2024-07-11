
const api_key = "F4xp2fRzv98YnAqWhgLMkQCVaG2N5T";

const options = document.querySelectorAll(".options select");
let amt = document.getElementById("amount").value;
const from = document.querySelector("#fromName select");
const to = document.querySelector("#toName select");
let msg = document.querySelector("#rate-msg");
let btn = document.querySelector("form button");

for (let select of options) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "fromOpts" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "toOpts" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}



const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};




let changeRate = async (amt) => {
  if (amt === "" || amt < 1) {
    amt = 1;
    amount.value = "1";
  }

  const url =
    "https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=EUR&to=INR%2CGBP";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "1a6cf81b93mshe60291ca10961cap1edd37jsn424ef15433b6",
      "x-rapidapi-host":
        "currency-conversion-and-exchange-rates.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    let fromCurr = (result.rates[from.value]);
    let toCurr = (result.rates[to.value]);
    let rateDec = toCurr/fromCurr;
    let rate = rateDec.toFixed(2);
    rate = Number(rate);
    totalAmt = rate * amt;
    msg.innerHTML = `${amt} ${from.value} = ${totalAmt} ${to.value}`;
  } catch (error) {
    console.error(error);
    msg.innerHTML = "Something Error";
  }
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  amt = document.getElementById("amount").value;
  changeRate(amt);
});
