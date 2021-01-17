import { useState } from 'react';
import './App.css';
import PokemonDisplay from './components/PokemonDisplay';
import PokemonList from './components/PokemonList';
import PokemonTypeList from './components/PokemonTypeList';
const api = {
  key: "60e758d6d6bba7b7991e4359e98c79bb",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  let [selectedType, setSelectedType] = useState("");
  let [selectedPokemonUrl, setSelectedPokemonUrl] = useState(null);
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="App">
      <header className="App-header">
        <PokemonDisplay pokemonUrl={selectedPokemonUrl} />
        <PokemonTypeList setType={setSelectedType} />
        <PokemonList type={selectedType} setPokemonUrl={setSelectedPokemonUrl} />
      </header>
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°c
            </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          ) : ('')}
        </main>
      </div>
    </div>

  );
}

export default App;
