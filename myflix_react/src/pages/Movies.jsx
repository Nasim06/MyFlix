import {Card, CardBody, CardHeader, Heading, Image, SimpleGrid, Text} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import colorScheme from "../utils";

export default function Movies() {

  const colorscheme = colorScheme();

  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState(null)
  const [genres, setGenres] = useState(null)
  const [actors, setActors] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try{
        const movieResponse = await fetch("http://127.0.0.1:8000/api/movies?page=1");
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
    fetchData();
  }, []);

  return (
    <SimpleGrid spacing={10} minChildWidth="450px" p="20px" bg={colorscheme[1]}>
      {movies && movies.results.map(movie =>(
        <Card key={movie.id} direction={{ base: 'column', sm: 'row' }} bg={colorscheme[0]}>
          <Image src={movie.poster} w="134px" h="196px"/>
          <CardHeader w="250px">
            <Heading size="md">{movie.title}</Heading>
            <Text> Genres: 
            {genres && movie.genre.map(genre =>(
              " " + genres[genre-1].name + ", "
            ))}
            </Text>
            <Text>Runtime: {movie.runtime} mins</Text>
            <Text>Released: {movie.released}</Text>
            <Text>IMDB Rating: {movie.imdb_rating}</Text>
          </CardHeader>
          <CardBody>
            <Text fontSize="small">Overview: {movie.overview}</Text>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  )
}


