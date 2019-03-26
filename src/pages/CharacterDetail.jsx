import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCharacterById } from '../api/client';
import { characters } from '../redux';

class CharacterDetail extends PureComponent {
  componentDidMount() {
    const { match: { params: { id } }, fetchCharacter } = this.props;
    getCharacterById(id).then((result) => {
      fetchCharacter(result);
    });
  }
  
  render() {
    const { character } = this.props;
    return (
      <Fragment>
        <div>{character.name}</div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  character: state.characters.get('characterSelected')
});

const mapDispatchToProps = {
  fetchCharacter: characters.actions.fetchCharacterSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail);
