import React, { PureComponent } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import { number, func } from 'prop-types';
import { InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import debounce from 'lodash/debounce';
import { ui, movies, characters } from '../redux';
import MovieList from './MovieList';
import CharactersList from './CharactersList';
import { getFilms, getCharacters } from '../api/client';


class Home extends PureComponent {
  debounceAction = debounce(this.searchByText, 800);

  searchByText = (value) => {
    const { tabSelectedIndex, fetchMovies, fetchCharacters } = this.props;
    if (tabSelectedIndex === 0) {
      getFilms(value).then(result => fetchMovies(result.results));
    } else {
      getCharacters(value).then((result) => {
        fetchCharacters(result);
      });
    }
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
        <div>
          <InputBase placeholder="Pesquisar" onChange={this.onChange} />
          <IconButton aria-label="Search">
            <SearchIcon />
          </IconButton>
        </div>
        <Tabs value={tabSelectedIndex} onChange={this.setSelectedTab}>
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
};

const mapStateToProps = state => ({
  tabSelectedIndex: state.ui.get('tabSelectedIndex'),
});

const mapDispatchToProps = {
  setTabSelectedIndex: ui.actions.setTabSelectedIndex,
  fetchMovies: movies.actions.fetchMovies,
  fetchCharacters: characters.actions.fetchCharacters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
