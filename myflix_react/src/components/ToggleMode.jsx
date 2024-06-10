
import {Button, useColorMode} from "@chakra-ui/react"
import {SunIcon, MoonIcon} from "@chakra-ui/icons"
import colorScheme from "../utils/Pallete"

export default function ToggleMode() {

    const colorscheme = colorScheme()
    const {colorMode, toggleColorMode} = useColorMode() 

    return (
        <Button onClick={toggleColorMode} bg={colorscheme[1]}>
            {colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
        </Button>
    )
}
