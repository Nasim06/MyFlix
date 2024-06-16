
export const FetchMovieData = async (movieUrl) => {
  try {
    const movieResponse = await fetch(movieUrl);
    const movieData = await movieResponse.json();

    const genreResponse = await fetch("http://127.0.0.1:8000/api/genres");
    const genreData = await genreResponse.json();

    const actorResponse = await fetch("http://127.0.0.1:8000/api/actors");
    const actorData = await actorResponse.json();

    return { movies: movieData, genres: genreData, actors: actorData };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Or handle errors differently
  }
};

