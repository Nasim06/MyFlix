import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FetchWatchList } from "../utils/MyListDataMethods";
import { FetchMoviesWithIds } from "../utils/FetchMovieData";
import SignedInContext from "../utils/SignedInContext";
import MovieList from '../components/MovieList';

export default function MyListsMovies(props) {

    const {signedIn, setSignedIn} = useContext(SignedInContext);
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState(null);
    const [genres, setGenres] = useState(null);
    const [actors, setActors] = useState(null);
    const [idData, setIdData] = useState(null);

    let pagename = "";
    if(props.watched == "false"){
        pagename = "watchList";
    }else{
        pagename = "watched";
    }

    let token = "";

    useEffect(() => {
        const fetchWatchListData = async () => {
            setIsLoading(true);
            try{
                const watchListData = await FetchWatchList(props.watched, token);
                if(watchListData.count != 0){
                    const idDict = watchListData.results.reduce((acc, item) => {
                        acc[item.movie] = item.id;
                        return acc;
                      }, {});
                    setIdData(idDict);
                    console.log(idDict);
                    const movieIds = watchListData.results.map((item) => item.movie);
                    if(movieIds){
                        const movieData = await FetchMoviesWithIds(movieIds);
                        if(movieData){
                            setMovies(movieData.movies);
                            setGenres(movieData.genres);
                            setActors(movieData.actors);
                        }
                    }
                }
            } catch(error){
                console.log(error);
            }
            setIsLoading(false);
        }
        if(signedIn){
            token = localStorage.getItem("accessToken");
        }
        if(token) {
            fetchWatchListData();
        } else{
            setSignedIn(false);
        }
    },[signedIn]);


    return (
        <SimpleGrid spacing={5} minChildWidth="800px" p="20px">
            {!signedIn ? (<Text>You need to be signed in</Text>) :
            isLoading ? (<Text>Loading...</Text>) : 
            movies ? (<MovieList movies={movies} genres={genres} actors={actors} pageName={pagename} idData={idData}/>) : 
                (<Text>Nothing to see here</Text>)}
        </SimpleGrid>
      );
}

