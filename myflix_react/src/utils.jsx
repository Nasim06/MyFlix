import { useColorModeValue } from "@chakra-ui/react"

export default function colorScheme() {

    const primary = useColorModeValue("light.primary", "dark.primary")
    const secondary = useColorModeValue("light.secondary", "dark.secondary")
    const accent = useColorModeValue("light.accent", "dark.accent")
    const colorscheme = [primary, secondary, accent]

    return colorscheme
}
