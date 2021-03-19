import { createMuiTheme , responsiveFontSizes } from "@material-ui/core";

const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
      background: {
        default: "#ccc",
        light: "#F3F5FF",
      },
    },
    typography: {
        fontFamily: [
          'Sahel',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
})

export default responsiveFontSizes(theme);