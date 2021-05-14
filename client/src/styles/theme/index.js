import { createMuiTheme , responsiveFontSizes } from "@material-ui/core";

const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
      background: {
        default: '#ccc',
        light: '#fff',
        chatMain: '#eee'
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '#root': {
            height: '100vh',
            display: 'flex',
            flexFlow: 'column wrap',
          },
          'svg': {
            verticalAlign: 'middle'
          }
        }
      }
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