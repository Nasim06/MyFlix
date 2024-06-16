import {Button, Flex, HStack, Image, List, ListIcon, ListItem, Spacer} from "@chakra-ui/react";
import ToggleMode from "./ToggleMode";
import colorScheme from "../utils/ColorScheme";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";
import { useEffect, useContext } from "react";
import SignedInContext from "../utils/SignedInContext";
import { CiBoxList } from "react-icons/ci";

 
export default function Navbar() {
    const colorscheme = colorScheme();
    const { signedIn, setSignedIn } = useContext(SignedInContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            setSignedIn(false);
            return;
          }

        const fetchUserData = async () => {
            try{
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        "token": token
                    }),
                };

                const response = await fetch("http://127.0.0.1:8000/api/auth/jwt/verify/", requestOptions);
                if(response.ok){
                    setSignedIn(true);
                }else{
                    setSignedIn(false);
                    return;
                }
            } catch(error){
                console.log(error);
            }
        };
        fetchUserData();
    }, [signedIn])

    
    return (
        <Flex bg={colorscheme[0]} alignItems="center" maxH="100px">
            <Link to="/">
                <Image src="/MyFlixLogo.png" h="100px"/>
            </Link>
            <Spacer />
            
            <List fontSize="1em" spacing={5}>
                <HStack spacing={20}>
                    <ListItem>
                        <Button size="lg" bg={colorscheme[2]} leftIcon={<BiCameraMovie />} onClick={() => navigate("/Movies")}>
                            Movies
                        </Button>
                    </ListItem>
                    <ListItem>
                    <Button size="lg" bg={colorscheme[2]} leftIcon={<CiBoxList />} onClick={() => navigate("/MyList")}>
                            My List
                        </Button>
                    </ListItem>
                </HStack>
            </List>
            
            
            <Spacer />
            <ToggleMode p="20px" />
            {!signedIn ? <Button ml="20px" bg={colorscheme[2]} onClick={() => navigate("/SignIn")}>Sign in</Button> : <></> } 
            {!signedIn ? <Button ml="20px" mr="20px" bg={colorscheme[2]} onClick={() => navigate("/Register")}>Register</Button> : <></> } 

        </Flex>

    )
}
