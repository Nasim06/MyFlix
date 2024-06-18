import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FetchWatchList } from "../utils/WatchListData";
import SignedInContext from "../utils/SignedInContext";

export default function WatchList() {

    const [listData, setListData] = useState();
    const { signedIn, setSignedIn } = useContext(SignedInContext);
    let token = "";

    useEffect(() => {
        const fetchData = async () => {
            if(signedIn){
                token = localStorage.getItem("accessToken");
            }
            if(token == ""){
                return <></>
            }   

            const data = await FetchWatchList("False", token)
            setListData(data.results);
            console.log(listData);
        }
        fetchData()
    },[]);



    return (
        <SimpleGrid>
            {listData && listData.map((item) => (
                <Heading key={item.id}>{item.movie}</Heading>
            ))}
        </SimpleGrid>
    )
}
