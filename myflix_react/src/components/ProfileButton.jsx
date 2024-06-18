import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export default function ProfileButton(props) {

    const signOut = () => {
        console.log("first");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.reload();
        console.log("click");
    }

    return (
        <Menu>
            <MenuButton m="30px">
                <Avatar name={props.name} />
            </MenuButton>

            <MenuList>
                <MenuItem onClick={() => signOut()}>
                    Sign out
                </MenuItem>
            </MenuList>

        </Menu>
    )
}
