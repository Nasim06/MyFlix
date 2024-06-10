import {Box, Card, CardBody, CardHeader, HStack, Heading, Image, SimpleGrid, Spacer, Text} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import colorScheme from "../utils/Pallete";
import { ArrowBackIcon, ArrowForwardIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { useSearchParams } from 'react-router-dom';
import {BuildQuery, FetchMovieData} from '../utils/FetchMovieData'

export default function Movies() {

  const colorscheme = colorScheme();

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState(null);
  const [genres, setGenres] = useState(null);
  const [actors, setActors] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const movieUrl = BuildQuery(searchParams);

  useEffect(() => {
    const fetchData = async () => {
      await FetchMovieData(movieUrl, setMovies, setGenres, setActors, setIsLoading);
    }
    fetchData();
  }, []);



  return (
    <SimpleGrid spacing={5} minChildWidth="650px" p="20px" bg={colorscheme[1]}>

      <Box h="200px">
        <Heading>Filter:</Heading>  
      </Box>

      <Box h="50px">
        <HStack justify="center">
          <ArrowLeftIcon boxSize="40px" mr="20px"/>
          <ArrowBackIcon boxSize="50px" mr="20px"/>
          <ArrowForwardIcon boxSize="50px" />
        </HStack>
      </Box>

      {movies && movies.results.map(movie =>(
        <Card key={movie.id} direction={{ base: 'column', sm: 'row' }} 
        bg={colorscheme[0]} h="196" variant="outline" overflow="hidden">

          <Image src={movie.poster} w="134px" h="196px" objectFit="cover" alt="movie poster"/>

          <CardHeader w="300px">
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
            <Text>Overview: {movie.overview}</Text>
            <Text> Actors: 
            {actors && movie.actors.map(actor =>(
              " " + actors[actor-1].name + ", "
            ))}
            </Text>
          </CardBody>

        </Card>
      ))}

    </SimpleGrid>
    
  )

}


