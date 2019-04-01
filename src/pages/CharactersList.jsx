import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  arrayOf, object, func, string, bool,
} from 'prop-types';
import {
  ListItem, ListItemText, ListItemIcon, Divider,
} from '@material-ui/core';
import ArrowRight from '@material-ui/icons/ArrowRight';
import { characters, requests } from '../redux';
import { getCharacters, getByUrl } from '../api/client';
import CustomList from '../component/CustomList';

class CharactersList extends PureComponent {
  componentDidMount() {
    const { fetchCharacters, requestApi } = this.props;
    requestApi({
      fetch: getCharacters,
      callBack: fetchCharacters,
    });
  }

  loadAction = () => {
    const { loadMoreUrl, appendCharacters, requestApi } = this.props;
    requestApi({
      args: loadMoreUrl,
      callBack: appendCharacters,
      fetch: getByUrl,
    });
  }

  renderRow = (character, index) => (
    <Link to={`character/${index + 1}`}>
      <ListItem button key={`character_${index}`}>
        <ListItemText primary={character.name} />
        <ListItemIcon>
          <ArrowRight />
        </ListItemIcon>
        <Divider />
      </ListItem>
    </Link>
  );

  render() {
    const { charactersList, loadMoreUrl, isLoading } = this.props;
    return (
      <CustomList
        items={charactersList}
        loadMore={!isLoading && Boolean(loadMoreUrl)}
        renderRow={this.renderRow}
        loadMoreAction={this.loadAction}
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
  requestApi: func.isRequired,
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
  requestApi: requests.actions.requestApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
