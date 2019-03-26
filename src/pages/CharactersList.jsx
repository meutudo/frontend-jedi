import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { characters } from '../redux'
import { getCharacters } from '../api/client';

class CharactersList extends PureComponent {
  componentDidMount() {
    const { fetchCharacters } = this.props;
    getCharacters().then(result => fetchCharacters(result));
  }
  render() {
    const { characters } = this.props;
    return (characters.map((character, index) => {
      return (
        <div key={`character_${index}`}>
          <div>{character.name}</div>
          <div>
            <Link to={`character/${index+1}`} > > </Link>
          </div>
        </div>
      );
    }));
  }
}

const mapStateToProps = (state) => ({
  characters: state.characters.get('characters')
})

const mapDispatchToProps = {
  fetchCharacters: characters.actions.fetchCharacters
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
