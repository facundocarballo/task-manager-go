import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./buttons";

const colors = {
    dark: {
        bg: '#1A202C',
        primary: '#2F855A',
        secundary: '#EDF2F7',
        divider: '#4A5568'
    },
    light: {
        bg: '#EDF2F7',
        primary: '#48BB78',
        secundary: '#1A202C',
        divider: '#E2E8F0'
    }
};

const components = { Button };

const theme = extendTheme({colors, components})

export default theme;