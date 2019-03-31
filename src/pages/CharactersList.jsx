import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  arrayOf, object, bool, func,
} from 'prop-types';
import { characters } from '../redux';
import { getCharacters } from '../api/client';
import List from '../component/List';

class CharactersList extends PureComponent {
  componentDidMount() {
    const { fetchCharacters } = this.props;
    getCharacters().then(result => fetchCharacters(result));
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
    const { charactersList, loadMore } = this.props;
    return (
      <List items={charactersList} loadMore={loadMore} renderRow={this.renderRow} />
    );
  }
}

CharactersList.propTypes = {
  charactersList: arrayOf(object).isRequired,
  loadMore: bool,
  fetchCharacters: func.isRequired,
};

CharactersList.defaultProps = {
  loadMore: false,
};

const mapStateToProps = state => ({
  charactersList: state.characters.get('characters'),
  loadMore: state.characters.get('hasNext'),
});

const mapDispatchToProps = {
  fetchCharacters: characters.actions.fetchCharacters,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
