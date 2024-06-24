import { SimpleGrid, Text } from "@chakra-ui/react";
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
    const [refresh, setRefresh] = useState(null);

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
                console.log("watchListData: " + watchListData);
                if(watchListData != ""){
                    const idDict = watchListData.reduce((acc, item) => {
                        acc[item.movie] = item.id;
                        return acc;
                      }, {});
                    setIdData(idDict);
                    console.log("idDict: "+ idDict);
                    const movieIds = watchListData.map((item) => item.movie);
                    if(movieIds){
                        const movieData = await FetchMoviesWithIds(movieIds);
                        if(movieData){
                            setMovies(movieData.movies);
                            setGenres(movieData.genres);
                            setActors(movieData.actors);
                        }
                    }
                }else{
                    setMovies(null);
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
            if(refresh){
                setRefresh(false);
            }
        } else{
            setSignedIn(false);
        }
    },[signedIn, refresh]);


    return (
        <SimpleGrid spacing={5} minChildWidth="800px" p="20px">
            {!signedIn ? (<Text>You need to be signed in</Text>) :
            isLoading ? (<Text>Loading...</Text>) : 
            movies != null ? (<MovieList movies={movies} genres={genres} actors={actors} pageName={pagename} idData={idData} setRefresh={setRefresh} />) :
                (<Text>Nothing to see here</Text>)}
        </SimpleGrid>
      );
}

