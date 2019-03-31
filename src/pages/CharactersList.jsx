import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { characters } from '../redux'
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
        <Link to={`character/${index + 1}`} > > </Link>
      </div>
    </div>
  );
  render() {
    const { characters, loadMore } = this.props;
    return (
      <List items={characters} loadMore={loadMore} renderRow={this.renderRow} />
    )
  }
}

const mapStateToProps = (state) => ({
  characters: state.characters.get('characters'),
  loadMore: state.characters.get('hasNext')
})

const mapDispatchToProps = {
  fetchCharacters: characters.actions.fetchCharacters
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
