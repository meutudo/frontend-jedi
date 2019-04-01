import React, { PureComponent } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import { number, func } from 'prop-types';
import { InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import debounce from 'lodash/debounce';
import {
  ui, movies, characters, requests,
} from '../redux';
import MovieList from './MovieList';
import CharactersList from './CharactersList';
import { getFilms, getCharacters } from '../api/client';

const style = {
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

class Home extends PureComponent {
  debounceAction = debounce(value => this.searchByText(value), 800);

  searchByText = (value) => {
    const {
      tabSelectedIndex, fetchMovies, fetchCharacters, requestApi,
    } = this.props;
    requestApi({
      fetch: tabSelectedIndex ? getCharacters : getFilms,
      args: value,
      callBack: tabSelectedIndex ? fetchCharacters : fetchMovies,
    });
  }

  onChange = (event) => {
    this.debounceAction(event.target.value);
  }

  setSelectedTab = (event, value) => {
    const { setTabSelectedIndex } = this.props;
    setTabSelectedIndex(value);
  }

  render() {
    const { tabSelectedIndex } = this.props;
    return (
      <section>
        <div style={style.searchContainer}>
          <InputBase placeholder="Pesquisar" onChange={this.onChange} />
          <IconButton aria-label="Search">
            <SearchIcon />
          </IconButton>
        </div>
        <Tabs
          value={tabSelectedIndex}
          variant="fullWidth"
          onChange={this.setSelectedTab}
        >
          <Tab label="Filmes" />
          <Tab label="Personagens" />
        </Tabs>
        {tabSelectedIndex === 0 && <MovieList />}
        {tabSelectedIndex === 1 && <CharactersList />}
      </section>
    );
  }
}

Home.propTypes = {
  tabSelectedIndex: number.isRequired,
  setTabSelectedIndex: func.isRequired,
  fetchMovies: func.isRequired,
  fetchCharacters: func.isRequired,
  requestApi: func.isRequired,
};

const mapStateToProps = state => ({
  tabSelectedIndex: state.ui.get('tabSelectedIndex'),
});

const mapDispatchToProps = {
  setTabSelectedIndex: ui.actions.setTabSelectedIndex,
  fetchMovies: movies.actions.fetchMovies,
  fetchCharacters: characters.actions.fetchCharacters,
  requestApi: requests.actions.requestApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
