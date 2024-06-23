import { useToast } from "@chakra-ui/react";


export const FetchWatchList = async (watched, token) => {
    let url = "http://127.0.0.1:8000/api/watchlist"
    if(watched == "true"){
        url += "?watched=True"
    } else{
        url += "?watched=False"
    }
    console.log(url);

    try{
        const response = await fetch(url, {headers: {Authorization: 'JWT ' + token}});
        const data = await response.json();
        return data;
    } catch (error){
        console.error(error);
        return null;
    }
}


export const AddToWatchList = async (movie_id, watched, token) => {
    const url = "http://127.0.0.1:8000/api/watchlist/create"
    const requestOptions = {
        method: "POST",
        headers: {Authorization: "JWT " + token,
            'Content-Type': 'application/json'},
        body: JSON.stringify({
            movie: movie_id,
            watched: watched,
        }),
    };

    try{
        const response = await fetch(url, requestOptions);
        if(response.ok){
            return "Success"
        } else if(response.status == 409){
            return "Conflict"
        }
        else {
            return "Failed"
        }
    } catch (error){
        console.error(error);
        return null;
    }
}


export const patchWatched = async (watchListId, watched, token) => {
    const url = "http://127.0.0.1:8000/api/watchlist/" + watchListId
    const requestOptions = {
        method: "PATCH",
        headers: {Authorization: "JWT " + token,
            'Content-Type': 'application/json'},
        body: JSON.stringify({
            watched: watched,
        }),
    };

    try{
        const response = await fetch(url, requestOptions);
        if(response.ok){
            return "Moved Successfully"
        }else {
            return "Failed to move"
        }
    } catch (error){
        console.error(error);
        return null;
    }
}


export const DeleteFromList = async (watchListId, token) => {
    const url = "http://127.0.0.1:8000/api/watchlist/" + watchListId
    const requestOptions = {
        method: "DELETE",
        headers: {Authorization: "JWT " + token,
            'Content-Type': 'application/json'},
    };

    try{
        const response = await fetch(url, requestOptions);
        if(response.ok){
            return "Success"
        }else {
            return "Failed"
        }
    } catch (error){
        console.error(error);
        return null;
    }
}
