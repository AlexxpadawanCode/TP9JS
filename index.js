// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

const container = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort")
let countries = [];
let sort = "alpha";

async function fetchCountries() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      countries = data;
      countriesDisplay();
    });

  console.log(countries);
}

function countriesDisplay() {
  container.innerHTML = countries
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "maxToMin") {
        return b.population - a.population;
      } else if (sort === "minToMax") {
        return a.population - b.population;
      } else if (sort === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map((country) => {
      return `
        <div class="country-card">
        <img src="${country.flags.svg}" alt="Flag of ${
        country.name.common
      }" class="country-flag">
            <h2>${country.translations.fra.common}</h2>
            <h4>${country.capital}</h4>
            <p>Population : ${country.population.toLocaleString()}</p>
            
        </div>
    `;
    })
    .join("");
}

fetchCountries();
inputSearch.addEventListener("input", countriesDisplay);
inputRange.addEventListener("input", () => {
  countriesDisplay();
  rangeValue.textContent = inputRange.value;
});

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sort = e.target.id;
    countriesDisplay();
  })
})
