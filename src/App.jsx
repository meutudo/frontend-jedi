import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { pure } from 'recompose';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CustomAppBar from './CustomAppBar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import CharacterDetail from './pages/CharacterDetail';

const color = '#feda4a';
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: color,
      dark: color,
    },
    text: {
      primary: color,
    },
    divider: color,
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <CustomAppBar />
      <Route path="/" exact component={Home} />
      <Route path="/movie/:id" exact component={MovieDetail} />
      <Route path="/character/:id" exact component={CharacterDetail} />
    </BrowserRouter>
  </MuiThemeProvider>
);

export default pure(App);
