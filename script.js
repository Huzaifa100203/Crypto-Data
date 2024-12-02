

const cryptoSelect = document.getElementById("crypto-select");
const priceDisplay = document.getElementById("price-display");
const highDisplay = document.getElementById("high-display");
const lowDisplay = document.getElementById("low-display");

const API_KEY = "0362da7c54e2b24d07713fe6d94a0299";
const API_URL = `https://api.coinlayer.com/api/live?access_key=${API_KEY}`;


async function fetchCryptoData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    if (!data.success) throw new Error(data.error.info);

  
    const selectedCrypto = cryptoSelect.value;

    const price = data.rates[selectedCrypto];
    const high = (price * 1.05).toFixed(2); 
    const low = (price * 0.95).toFixed(2); 

    priceDisplay.textContent = `Current Price: $${price.toFixed(2)}`;
    highDisplay.textContent = `24h High: $${high}`;
    lowDisplay.textContent = `24h Low: $${low}`;
  } catch (error) {
    priceDisplay.textContent = "Error fetching data.";
    highDisplay.textContent = "";
    lowDisplay.textContent = "";
    console.error(error);
  }
}

cryptoSelect.addEventListener("change", fetchCryptoData);

setInterval(fetchCryptoData, 10000);

// fetchCryptoData();
