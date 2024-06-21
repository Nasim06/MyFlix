import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text, VStack } from '@chakra-ui/react';
import colorScheme from '../utils/ColorScheme';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { AddToWatchList, patchWatched, DeleteFromList } from '../utils/MyListDataMethods';

const MovieList = ({ movies, genres, actors, pageName, idData }) => {
    const colorscheme = colorScheme();

    const token = localStorage.getItem("accessToken");

    const footer = (movieId) => {
        if(pageName == "movies"){
            return(
                <Button size="lg" bg={colorscheme[2]} onClick={() => AddToWatchList(movieId, "False", token)} >
                    <AddIcon />
                </Button>
            )
        }
        if(pageName == "watchList"){
            return(
                <VStack>
                    <Button size="lg" bg={colorscheme[2]} onClick={() => patchWatched(idData[movieId], "True", token)} >
                        <AddIcon />
                    </Button>
                    <Button size="lg" bg={colorscheme[2]} onClick={() => DeleteFromList(idData[movieId], token)} >
                        <CloseIcon />
                    </Button>
                </ VStack>
            )
        }
        if(pageName == "watched"){
            return(
                <Button size="lg" bg={colorscheme[2]} onClick={() => DeleteFromList(idData[movieId], token)} >
                    <CloseIcon />
                </Button>
            )
        }
        
    }


    return (
        <>
        {movies && movies.map((movie) => (
            <Card key={movie.id} direction={{ base: 'column', sm: 'row' }} 
            bg={colorscheme[0]} h="235px" variant="outline" overflow="hidden" 
            border="5px solid" borderColor={colorscheme[2]}>

                <Image src={movie.poster} w="161px" h="235px" objectFit="cover" alt="movie poster" />

                <CardHeader w="300px">
                    <Heading size="md">{movie.title}</Heading>
                    <Text> Genres: {genres && movie.genre.map((genre) => ` ${genres[genre - 1].name},`)}</Text>
                    <Text>Runtime: {movie.runtime} mins</Text>
                    <Text>Released: {movie.released}</Text>
                    <Text>IMDB Rating: {movie.imdb_rating}</Text>
                    <Text>Director: {movie.director}</Text>
                    </CardHeader>

                <CardBody>
                    <Text fontSize="sm">Overview: {movie.overview}</Text>
                    <Text as="i"> Actors: {actors && movie.actors.map((actor) => ` ${actors[actor - 1].name},`)}</Text>
                </CardBody>

                <CardFooter pl="0px">
                    {footer(movie.id)}
                </CardFooter>

            </Card>
            ))}
        </>
    );
};
    
export default MovieList;
