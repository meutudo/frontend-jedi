import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
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
      <section className="detail character-detail">
        <Typography variant="h5" component="h3">
          {character.name}
        </Typography>
        <Typography component="p">
          {`Ano de Nascimento: ${character.birth_year || ''}`}
        </Typography>
        <Typography component="p">
          {`Cor do cabelo: ${character.hair_color || ''}`}
        </Typography>
        <Typography component="p">
          {`Altura: ${character.height || ''} cm`}
        </Typography>
        <Typography component="p">
          {`Massa: ${character.mass || ''}`}
        </Typography>
        <Typography component="p">
          {`Cor da pele: ${character.skin_color || ''}`}
        </Typography>
      </section>
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
