import {Button, Flex, HStack, Image, List, ListIcon, ListItem, Spacer} from "@chakra-ui/react";
import ToggleMode from "./ToggleMode";
import colorScheme from "../utils/Pallete";
import { NavLink } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";

 
export default function Navbar() {
    const colorscheme = colorScheme();
    return (
        <Flex bg={colorscheme[0]} alignItems="center" maxH="100px">
            <NavLink to="/">
                <Image src="/MyFlixLogo.png" h="100px"/>
            </NavLink>
            <Spacer />
            
            <List fontSize="1em" spacing={5}>
                <HStack spacing={20}>
                    <ListItem>
                        <NavLink to="/Movies">
                            <ListIcon as={BiCameraMovie} boxSize="50px" onClick="window.location.reload();"/>
                            Movies
                        </NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="/MyList">
                            MyList
                        </NavLink>
                    </ListItem>
                </HStack>
            </List>
            
            
            <Spacer />
            <ToggleMode p="20px" />
            <Button m={10} bg={colorscheme[2]}>Sign in</Button>
        </Flex>

    )
}
