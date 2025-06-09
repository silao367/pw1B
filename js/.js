const pokemonnome = document.querySelector('.pokemonnome');
const pokemonnumero = document.querySelector('.pokemonnumero');
const pokemonImage = document.querySelector('.pokemonimage');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonvolta = document.querySelector('.btn-volta');
const buttonprox = document.querySelector('.btn-prox');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonnome.innerHTML = 'Loading...';
  pokemonnumero.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonnome.innerHTML = data.name;
    pokemonnumero.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonnome.innerHTML = 'Not found :c';
    pokemonnumero.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);