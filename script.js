const apiKey = "60c6cb9a322bf029bab97caa1a7a9055"; // <-- apna OpenWeatherMap ka API key daalo
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const icon = document.getElementById("icon");
const error = document.getElementById("error");
const cityList = document.getElementById("cityList");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    console.log(data);

    cityName.textContent = data.name;
    temp.textContent = `🌡️ ${data.main.temp} °C`;
    condition.textContent = data.weather[0].main;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    error.textContent = "";
  } catch (err) {
    cityName.textContent = "";
    temp.textContent = "";
    condition.textContent = "";
    icon.src = "";
    error.textContent = "❌ City not found";
  }
  const cityList = document.getElementById("cityList");

  async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();

      cityName.textContent = data.name;
      temp.textContent = `🌡️ ${data.main.temp} °C`;
      condition.textContent = data.weather[0].main;
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      error.textContent = "";

      // ✅ Search history me add karo
      addCityToList(data.name);
    } catch (err) {
      cityName.textContent = "";
      temp.textContent = "";
      condition.textContent = "";
      icon.src = "";
      error.textContent = "❌ City not found";
    }
  }

  function addCityToList(city) {
    const li = document.createElement("li");
    li.textContent = city;

    // Agar user list item pe click kare to dobara weather dikha do
    li.addEventListener("click", () => {
      getWeather(city);
    });

    cityList.appendChild(li);
  }
}
