
export const FetchActorsData = async () => {
  const actorResponse = await fetch("http://127.0.0.1:8000/api/actors");
  const actorData = await actorResponse.json();
  return actorData;

}


export const FetchGenreData = async () => {
  const genreResponse = await fetch("http://127.0.0.1:8000/api/genres");
  const genreData = await genreResponse.json();
  return genreData;
}


export const FetchMovieData = async (movieUrl) => {
  try {
    const movieResponse = await fetch(movieUrl);
    const movieData = await movieResponse.json();
    const actorData = await FetchActorsData();
    const genreData = await FetchGenreData();

    return { movies: movieData, genres: genreData, actors: actorData };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Or handle errors differently
  }
};


export const FetchMoviesWithIds = async (ids) => {
  const url = "http://127.0.0.1:8000/api/movies/byId"
  const movieIdsList = Array.from(ids);
  console.log("movieIdsList: " + movieIdsList);
  const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          movie_ids : movieIdsList,
      }),
  };

  try{
      const response = await fetch(url, requestOptions);
      const movieData = await response.json();
      const actorData = await FetchActorsData();
      const genreData = await FetchGenreData();

      return { movies: movieData, genres: genreData, actors: actorData };
  } catch (error){
      console.error(error);
      return null;
  }
}