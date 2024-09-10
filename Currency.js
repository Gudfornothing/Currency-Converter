document.addEventListener("DOMContentLoaded", function () {
  const countryFlags = {
    INR: "https://flagsapi.com/IN/flat/64.png",
    USD: "https://flagsapi.com/US/flat/64.png",
    AUD: "https://flagsapi.com/AU/flat/64.png",
  };

  const fromSelect = document.querySelector("select[name='From']");
  const toSelect = document.querySelector("select[name='To']");
  const fromFlag = document.querySelector(".from .select-container img");
  const toFlag = document.querySelector(".TO .select-container img");
  const amountInput = document.querySelector(".Amount input");
  const convertButton = document.querySelector("button");
  const conversionMessage = document.querySelector(".msg");

  // Hardcoded exchange rates
  const exchangeRates = {
    INR: 1,
    USD: 0.0125,
    AUD: 0.018,
  };

  // Function to update flag image
  function updateFlag(selectElement, flagElement) {
    const selectedCurrency = selectElement.value;
    if (countryFlags[selectedCurrency]) {
      flagElement.src = countryFlags[selectedCurrency];
    }
  }

  // Function to convert currency
  function convertCurrency() {
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
      conversionMessage.textContent = "Please enter a valid amount.";
      return;
    }

    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      conversionMessage.textContent = "Exchange rate data is not available.";
      return;
    }

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const rate = toRate / fromRate;

    // Round off to two decimal places and convert to string for display purposes
    const convertedAmount = (amount * rate).toFixed(2);
    conversionMessage.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  }

  // Initialize flags and conversion rates on page load
  updateFlag(fromSelect, fromFlag);
  updateFlag(toSelect, toFlag);

  // Event listeners
  fromSelect.addEventListener("change", () => updateFlag(fromSelect, fromFlag));
  toSelect.addEventListener("change", () => updateFlag(toSelect, toFlag));
  convertButton.addEventListener("click", convertCurrency);
});
