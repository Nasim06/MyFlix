import React from 'react';
import { Card, CardBody, CardHeader, Heading, Image, Text } from '@chakra-ui/react';
import colorScheme from '../utils/ColorScheme';

const MovieList = ({ movies, genres, actors }) => {
    const colorscheme = colorScheme();
    return (
        <>
        {movies && movies.results.map((movie) => (
            <Card key={movie.id} direction={{ base: 'column', sm: 'row' }} 
            bg={colorscheme[0]} h="196" variant="outline" overflow="hidden" 
            border="5px solid" borderColor={colorscheme[2]}>
                <Image src={movie.poster} w="134px" h="196px" objectFit="cover" alt="movie poster" />
                <CardHeader w="300px">
                <Heading size="md">{movie.title}</Heading>
                <Text> Genres: {genres && movie.genre.map((genre) => ` ${genres[genre - 1].name},`)}</Text>
                <Text>Runtime: {movie.runtime} mins</Text>
                <Text>Released: {movie.released}</Text>
                <Text>IMDB Rating: {movie.imdb_rating}</Text>
                </CardHeader>
                <CardBody>
                <Text>Overview: {movie.overview}</Text>
                <Text> Actors: {actors && movie.actors.map((actor) => ` ${actors[actor - 1].name},`)}</Text>
                </CardBody>
            </Card>
            ))}
        </>
    );
};
    
export default MovieList;
