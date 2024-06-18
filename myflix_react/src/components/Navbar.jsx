import {Avatar, Button, Flex, HStack, Image, List, ListIcon, ListItem, Spacer} from "@chakra-ui/react";
import ToggleMode from "./ToggleMode";
import colorScheme from "../utils/ColorScheme";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";
import { useEffect, useContext, useState } from "react";
import SignedInContext from "../utils/SignedInContext";
import { CiBoxList } from "react-icons/ci";
import ProfileButton from "./ProfileButton";

 
export default function Navbar() {
    const colorscheme = colorScheme();
    const { signedIn, setSignedIn } = useContext(SignedInContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            setSignedIn(false);
            return;
          }

        const fetchUserData = async () => {
            try{
                const response = await fetch("http://127.0.0.1:8000/api/auth/users/me/", {headers: {Authorization: 'JWT ' + token}});
                if(response.ok){
                    setSignedIn(true);
                    const data = await response.json();
                    console.log(data.username);
                    setUsername(data.username);
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
                <HStack spacing={10}>
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
            {signedIn ? <ProfileButton name={username} /> : <></> }

        </Flex>

    )
}
