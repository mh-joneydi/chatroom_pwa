import { createMuiTheme , fade, responsiveFontSizes } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
      background: {
        default: '#eee',
        light: '#fff',
        chatMain: '#eee'
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          'html': {
            scrollBehavior: 'smooth'
          },
          '#root': {
            height: '100vh',
            display: 'flex',
            flexFlow: 'column wrap',
          },
          '*':{
            "scrollbarColor": `${fade(grey[600], 0.5 )} transparent`,
            "scrollbarWidth": 'thin',
          },
          '*::-webkit-scrollbar': {
            width: '5px'
          },
          '*::-webkit-scrollbar-thumb': {
              backgroundColor: fade(grey[600], 0.5 )
          },
          '*::-webkit-scrollbar-thumb:hover': {
              backgroundColor: fade(grey[700], 0.5 )
          },
          '.emoji-picker-react .emoji-group:first-child': {
            display: 'none'
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