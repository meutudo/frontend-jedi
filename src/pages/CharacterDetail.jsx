import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { shape, func } from 'prop-types';
import { getCharacterById } from '../api/client';
import { characters, requests } from '../redux';

class CharacterDetail extends PureComponent {
  componentDidMount() {
    const { match: { params: { id } }, fetchCharacter, requestApi } = this.props;
    requestApi({
      fetch: getCharacterById,
      args: id,
      callBack: fetchCharacter,
    });
  }

  render() {
    const { character } = this.props;
    return (
      <Fragment>
        <div>{character.name}</div>
      </Fragment>
    );
  }
}

CharacterDetail.propTypes = {
  character: shape.isRequired,
  match: shape.isRequired,
  fetchCharacter: func.isRequired,
  requestApi: func.isRequired,
};

const mapStateToProps = state => ({
  character: state.characters.get('characterSelected'),
});

const mapDispatchToProps = {
  fetchCharacter: characters.actions.fetchCharacterSelected,
  requestApi: requests.actions.requestApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail);
