// Obtención de referencias a elementos del DOM
const charactersEl = document.getElementById('characters'); // Elemento donde se mostrarán los personajes
const nameFilterEl = document.getElementById('name-filter'); // Input para filtrar por nombre
const statusFilterEl = document.getElementById('status-filter'); // Select para filtrar por estado
const moreInfoButton = document.getElementById('more-info-button'); // Botón para más información
const banner3El = document.getElementById('banner3'); // Segunda sección

// Función para obtener información de un personaje específico por su ID
async function getCharacter(characterId) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
    const data = await response.json();
    return data;
}

// Función para buscar personajes por nombre
async function searchCharacters(name) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
    const data = await response.json();
    return data.results;
}

// Función para obtener los personajes de la API
async function getCharacters(name, status) {
    let url = 'https://rickandmortyapi.com/api/character/';

    // Construir la URL con los parámetros de filtrado (si existen)
    if (name || status) {
        url += '?';
        if (name) {
            url += `name=${name}&`;
        }
        if (status) {
            url += `status=${status}`;
        }
    }

    // Realizar la solicitud HTTP GET y convertir la respuesta a JSON
    const response = await fetch(url);
    const data = await response.json();

    return data.results; // Devolver los resultados de los personajes
}

// Función para mostrar los personajes en el DOM
async function displayCharacters(name, status) {
    const characters = await getCharacters(name, status); // Obtener los personajes con los filtros aplicados

    charactersEl.innerHTML = ''; // Limpiar cualquier contenido previo

    // Iterar sobre los personajes obtenidos
    for (let character of characters) {
        const card = document.createElement('div'); // Crear un elemento div para cada personaje
        card.classList.add('character-card'); // Agregar una clase CSS para estilizar el elemento

        // Obtener la última locación conocida del personaje
        const lastLocation = character.location.name;

        // Obtener el primer episodio en el que aparece el personaje
        const firstEpisodeUrl = character.episode[0];
        const firstEpisodeResponse = await fetch(firstEpisodeUrl);
        const firstEpisodeData = await firstEpisodeResponse.json();
        const firstEpisodeName = firstEpisodeData.name;

        // Crear el HTML para mostrar la información del personaje
        card.innerHTML = `
            <img src="${character.image}" /> <!-- Mostrar la imagen del personaje -->
            <div class="character-info">
                <h2 class="character-name"> ${character.name} </h2> <!-- Mostrar el nombre del personaje -->
                <p class="character-status"> Estatus: ${character.status} </p> <!-- Mostrar el estado del personaje -->
                <p class="character-species"> Especie: ${character.species} </p> <!-- Mostrar la especie del personaje -->
                <p class="character-location"> Última locación conocida: ${lastLocation} </p> <!-- Mostrar la última locación conocida del personaje -->
                <p class="character-first-episode"> Visto por primera vez en: ${firstEpisodeName} </p> <!-- Mostrar el primer episodio en el que aparece el personaje -->
            </div>
        `;

        charactersEl.appendChild(card); // Agregar el elemento del personaje al contenedor en el DOM
    }
}

// Mostrar todos los personajes al cargar la página
displayCharacters();

// Event Listener para el input de filtro de nombre
nameFilterEl.addEventListener('input', () => {
    displayCharacters(nameFilterEl.value, statusFilterEl.value); // Mostrar los personajes con el filtro de nombre aplicado
});

// Event Listener para el cambio en el filtro de estado
statusFilterEl.addEventListener('change', () => {
    displayCharacters(nameFilterEl.value, statusFilterEl.value); // Mostrar los personajes con el filtro de estado aplicado
});

// Event Listener para el botón de más información
moreInfoButton.addEventListener('click', () => {
    banner3El.scrollIntoView({ behavior: 'smooth' }); // Desplazar suavemente a la segunda sección
});
