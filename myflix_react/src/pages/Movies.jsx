import { Button, Card, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import colorScheme from "../utils/ColorScheme";
import { ArrowBackIcon, ArrowForwardIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { useSearchParams } from 'react-router-dom';
import { FetchMovieData } from '../utils/FetchMovieData'
import { PageForward, PageBackward, BackToPageOne } from '../utils/Pagination';
import MovieFilter from '../components/MovieFilter';
import MovieList from '../components/MovieList';

export default function Movies() {

  const colorscheme = colorScheme();

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState(null);
  const [genres, setGenres] = useState(null);
  const [actors, setActors] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  //const movieUrl = BuildQuery(searchParams);
  const movieUrl = "http://127.0.0.1:8000/api/movies?" + searchParams;

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchMovieData(movieUrl);
      if (data) {
        setMovies(data.movies);
        setGenres(data.genres);
        setActors(data.actors);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieUrl]);


  return (
    <SimpleGrid spacing={5} minChildWidth="650px" p="20px">

      <MovieFilter setParams={setSearchParams} params={searchParams} />

      <Card h="100px" justify="center" bg={colorscheme[0]} border="5px solid" borderColor={colorscheme[2]}>
        <HStack justify="center">
          <Button leftIcon={<ArrowLeftIcon boxSize="40px" mr="20px" />} onClick={() => BackToPageOne(searchParams, setSearchParams)} ></Button>
          <Button leftIcon={<ArrowBackIcon boxSize="50px" mr="20px" />} onClick={() => PageBackward(searchParams, setSearchParams)} ></Button>
          <Button leftIcon={<ArrowForwardIcon boxSize="50px" />} onClick={() => PageForward(searchParams, setSearchParams)} ></Button>
        </HStack>
      </Card>

      {isLoading ? (<Text>Loading...</Text>) : 
      (<MovieList movies={movies} genres={genres} actors={actors} />)}

    </SimpleGrid>
  )

}


