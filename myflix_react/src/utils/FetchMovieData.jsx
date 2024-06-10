
export const BuildQuery = (searchParams) => {

  const page = searchParams.get("page");
  const genreValue = searchParams.get("genre");
  const actorValue = searchParams.get("actor");
  const directorValue = searchParams.get("director");
  const releasedValue = searchParams.get("released_after");
  const imdbValue = searchParams.get("imdb_rating_gte");
  const runtimeValue = searchParams.get("runtime_lte");

  let searchValues = "";

  page ? searchValues += page : searchValues += "1";
  if(genreValue){
    searchValues += "&genre=" + genreValue;
  }
  if(actorValue){
    searchValues += "&actor=" + actorValue;
  }
  if(directorValue){
    searchValues += "&director=" + directorValue;
  }
  if(releasedValue){
    searchValues += "&released_after=" + releasedValue;
  }
  if(imdbValue){
    searchValues += "&imdb_rating_gte=" + imdbValue;
  }
  if(runtimeValue){
    searchValues += "&runtime_lte" + runtimeValue;
  }

  return "http://127.0.0.1:8000/api/movies?page=" + searchValues;

}


export const FetchMovieData = async (movieUrl, setMovies, setGenres, setActors, setIsLoading)  => {

  setIsLoading(true);
  try{
    const movieResponse = await fetch(movieUrl);
    const movieData = await movieResponse.json();
    console.log("Movie Data:", movieData);

    const genreResponse = await fetch("http://127.0.0.1:8000/api/genres");
    const genreData = await genreResponse.json();
    console.log("Genre Data:", genreData);

    const actorResponse = await fetch("http://127.0.0.1:8000/api/actors");
    const actorData = await actorResponse.json();
    console.log("Actor Data:", actorData);

    setMovies(movieData);
    setGenres(genreData);
    setActors(actorData);
  } catch(e){
    console.log ("Error fetching data: ", e);
  } finally {
    setIsLoading(false);
  }

}


