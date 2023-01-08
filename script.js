"use-strict";

let API ="https://api.themoviedb.org/3/movie/top_rated?api_key=551242c4c23b3bddce527e2bca5c3abe&language=en-US";
let page = 1;
const btnBefore = document.querySelector("#btnBefore");
const btnBefore2 = document.querySelector("#btnBefore2");
const btnAfter = document.querySelector("#btnAfter");
const btnAfter2 = document.querySelector("#btnAfter2");
const pageNum = document.querySelector('#pageNum');
const pageNum2 = document.querySelector('#pageNum2');

const nextPage = () => {
    if (page < 2) {
        page += 1;
        renderMovies(10, 20);
        pageNum.innerText = page;
        pageNum2.innerText = page;
    }
}
const prevPage = () => {
    if (page > 1) {
        page -= 1;
        renderMovies(0, 10);
        pageNum.innerText = page;
        pageNum2.innerText = page;
      }
}
btnAfter.addEventListener("click", nextPage);
btnBefore.addEventListener("click", prevPage);
btnAfter2.addEventListener('click', nextPage);
btnBefore2.addEventListener("click", prevPage);

// Pagination and buttons were written this way because the API only returned 1 page of results in this section. I optimized as much as I could to have better UX while checking this example.

const renderMovies = async (a, b) => {
  try {
    const response = await fetch(API);
    if (response.status === 200) {
      const data = await response.json();
      let movies = "";
      data.results.slice(a, b).forEach((movie) => {
        movies += `
                <div class="movieContainer">
                <h3 class="movieTitle">${movie.title}</h3>
                <img class="movieImg" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" />
                <p class="movieDescription">${movie.overview}</p>
            </div>`;
      });
      document.getElementById("moviesContainer").innerHTML = movies;
      pageNum.innerText = page;
      pageNum2.innerText = page;
    } else if (response.status === 401) {
      console.log(response.status_message);
    } else if (response.status === 404) {
      console.log("Not Found");
      console.log(response.status_message);
    } else {
      console.log("Something went wrong");
    }
  } catch (e) {
    console.log(e);
  }
};

renderMovies(0, 10);
