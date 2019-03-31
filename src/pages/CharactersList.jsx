import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  arrayOf, object, func, string, bool,
} from 'prop-types';
import { characters, ui } from '../redux';
import { getCharacters, getByUrl } from '../api/client';
import List from '../component/List';

class CharactersList extends PureComponent {
  componentDidMount() {
    const { fetchCharacters, toggleLoading } = this.props;
    toggleLoading();
    getCharacters().then((result) => {
      toggleLoading();
      fetchCharacters(result);
    });
  }

  loadAction = () => {
    const { loadMoreUrl, appendCharacters, toggleLoading } = this.props;
    toggleLoading();
    getByUrl(loadMoreUrl).then((result) => {
      toggleLoading();
      appendCharacters(result);
    });
  }

  renderRow = (character, index) => (
    <div key={`character_${index}`}>
      <div>{character.name}</div>
      <div>
        <Link to={`character/${index + 1}`}> Detalhes </Link>
      </div>
    </div>
  );

  render() {
    const { charactersList, loadMoreUrl, isLoading } = this.props;
    return (
      <List
        items={charactersList}
        loadMore={Boolean(loadMoreUrl)}
        renderRow={this.renderRow}
        loadMoreAction={this.loadAction}
        isLoading={isLoading}
      />
    );
  }
}

CharactersList.propTypes = {
  charactersList: arrayOf(object).isRequired,
  loadMoreUrl: string,
  isLoading: bool.isRequired,
  fetchCharacters: func.isRequired,
  appendCharacters: func.isRequired,
  toggleLoading: func.isRequired,
};

CharactersList.defaultProps = {
  loadMoreUrl: '',
};

const mapStateToProps = state => ({
  charactersList: state.characters.get('characters'),
  loadMoreUrl: state.characters.get('loadMoreUrl'),
  isLoading: state.ui.get('loading'),
});

const mapDispatchToProps = {
  fetchCharacters: characters.actions.fetchCharacters,
  appendCharacters: characters.actions.appendCharacters,
  toggleLoading: ui.actions.toggleLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
