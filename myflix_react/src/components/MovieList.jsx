import { useContext } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text, VStack, useToast } from '@chakra-ui/react';
import colorScheme from '../utils/ColorScheme';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { AddToWatchList, patchWatched, DeleteFromList } from '../utils/MyListDataMethods';
import SignedInContext from "../utils/SignedInContext";

const MovieList = ({ movies, genres, actors, pageName, idData, setRefresh }) => {
    const colorscheme = colorScheme();
    const toast = useToast();
    const token = localStorage.getItem("accessToken");
    const {signedIn, setSignedIn} = useContext(SignedInContext);


    const AddMovie = async (id, bool, token) =>{
        const response = await AddToWatchList(id, bool, token);
        if (response == "Success"){
            toast({
                title: 'Success', description: "Movie added to your watch list",
                status: 'success', duration: 3000, isClosable: true,
              })
        }else if(response == "Conflict"){
            toast({
                title: 'Conflict', description: "Movie already in you watch list",
                status: 'info', duration: 3000, isClosable: true,
            })
        }
        else{
            toast({
                title: 'Failed', description: "Something went wrong", 
                status: 'error', duration: 3000, isClosable: true,
              })
        }
    }   


    const DeleteMovie = async (id, token) =>{
        const response = await DeleteFromList(id, token);
        if (response == "Success"){
            toast({
                title: 'Success', description: "Movie removed from list",
                status: 'success', duration: 3000, isClosable: true,
              })
            setRefresh(true);
        }else{
            toast({
                title: 'Failed', description: "Something went wrong",
                status: 'error', duration: 3000, isClosable: true,
              })
        }
    }   


    const PatchMovie = async (id, token) =>{
        const response = await patchWatched(id, "True", token);
        if (response == "Success"){
            toast({
                title: 'Success', description: "Movie moved to Watched",
                status: 'success', duration: 3000, isClosable: true,
              })
            setRefresh(true);
        }else{
            toast({
                title: 'Failed', description: "Something went wrong",
                status: 'error', duration: 3000, isClosable: true,
              })
        }
    } 


    const footer = (movieId) => {
        if(pageName == "movies" && signedIn){
            return(
                <Button size="lg" bg={colorscheme[1]} _hover={{bg:colorscheme[2]}} onClick={() => AddMovie(movieId, "False", token) } >
                    <AddIcon />
                </Button>
            )
        }
        if(pageName == "watchList"){
            return(
                <VStack>
                    <Button size="lg" bg={colorscheme[1]} _hover={{bg:colorscheme[2]}} onClick={() => PatchMovie(idData[movieId], token)} >
                        <AddIcon />
                    </Button>
                    <Button size="lg" bg={colorscheme[1]} _hover={{bg:colorscheme[2]}} onClick={() => DeleteMovie(idData[movieId], token)} >
                        <CloseIcon />
                    </Button>
                </ VStack>
            )
        }
        if(pageName == "watched"){
            return(
                <Button size="lg" bg={colorscheme[1]} _hover={{bg:colorscheme[2]}} onClick={() => DeleteMovie(idData[movieId], token)} >
                    <CloseIcon />
                </Button>
            )
        }
        return(<></>)
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
