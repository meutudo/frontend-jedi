import React, { PureComponent } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import { number, func } from 'prop-types';
import { ui, movies, characters } from '../redux';
import MovieList from './MovieList';
import CharactersList from './CharactersList';
import { InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import debounce from 'lodash/debounce';
import { getFilms, getCharacters } from '../api/client';


class Home extends PureComponent {
  searchByText = (value) => {
    const { tabSeletedIndex, fetchMovies, fetchCharacters } = this.props;
    if (tabSeletedIndex === 0) {
      getFilms(value).then(result => fetchMovies(result.results));
    } else {
      getCharacters(value).then(result => {
        fetchCharacters(result)
      });
    }
  }
  debounceAction = debounce(this.searchByText, 800);

  onChange = (event) => {
    this.debounceAction(event.target.value);
  }

  setSelectedTab = (event, value) => {
    const { setTabSelectedIndex } = this.props;
    setTabSelectedIndex(value);
  }

  render() {
    const { tabSeletedIndex } = this.props;
    return (
      <section>
        <div>
          <InputBase placeholder="Pesquisar" onChange={this.onChange} />
          <IconButton aria-label="Search">
            <SearchIcon />
          </IconButton>
        </div>
        <Tabs value={tabSeletedIndex} onChange={this.setSelectedTab}>
          <Tab label="Filmes" />
          <Tab label="Personagens" />
        </Tabs>
        {tabSeletedIndex === 0 && <MovieList />}
        {tabSeletedIndex === 1 && <CharactersList />}
      </section>
    )
  }
};

Home.proptTypes = {
  tabSeletedIndex: number,
  setTabSelectedIndex: func
}

const mapStateToProps = (state) => ({
  tabSeletedIndex: state.ui.get('tabSelectedIndex')
});

const mapDispatchToProps = {
  setTabSelectedIndex: ui.actions.setTabSelectedIndex,
  fetchMovies: movies.actions.fetchMovies,
  fetchCharacters: characters.actions.fetchCharacters,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);