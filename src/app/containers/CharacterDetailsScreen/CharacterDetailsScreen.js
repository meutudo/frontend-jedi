import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { fetchCharacter } from '../../store/starWarsCharacters';

import CharacterDetail from '../../presentational/CharacterDetail/CharacterDetail.js';

class CharacterDetailsScreen extends Component {
  state = {

  }

  componentDidMount() {
    const { fetchCharacter } = this.props;
    const id = this.props.match.params.id;
    fetchCharacter(id);
  }

  render() {
    const { character, isFetchingCharacter } = this.props;
    return (
      character ?
        <CharacterDetail data={character} /> :
        <div className="d-flex justify-content-center pt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading movies...</span>
          </div>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacter: id => dispatch(fetchCharacter(id)),
  };
}

const mapStateToProps = state => {
  return {
    isFetchingCharacter: state.starWarsCharacters.isFetchingCharacter,
    character: state.starWarsCharacters.character
  }
};

const CharacterDetailsScreenContainer = connect(mapStateToProps, mapDispatchToProps)(CharacterDetailsScreen);

export default withRouter(CharacterDetailsScreenContainer);
