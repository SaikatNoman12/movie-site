const API_LINK = "https://api.themoviedb.org/3/movie/popular?api_key=173d5484d5aa462bf824a490a167b01a";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=173d5484d5aa462bf824a490a167b01a&query=";

const section = document.getElementById("section");
const form = document.getElementById('form');
const search = document.getElementById("query");


function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function (data) {
            if (data.results.length) {
                const row = document.createElement('div');
                row.setAttribute('class', 'row');
                section.appendChild(row);

                data.results.forEach(movie => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    row.appendChild(card);

                    const img = document.createElement('img');
                    img.classList.add('thumbnail');
                    img.src = movie.poster_path ? `${IMG_PATH}${movie.poster_path}` : "./thumbnail.avif";
                    card.appendChild(img);

                    const h2 = document.createElement('h2');
                    h2.innerText = movie.title ? movie.title : 'No title hear';
                    card.appendChild(h2);
                });
            }
            else{
               const errorHTML = 
               `
                <div class="error">
                 <h2>NO DATA FOUND</h2>
                </div>
               `
               section.innerHTML = errorHTML;
            }
        });
}
returnMovies(API_LINK);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    section.innerHTML = '';

    const searchItem = search.value;
    const searchApi = `${SEARCH_API}${searchItem}`;
    returnMovies(searchApi);
});