import React, { PureComponent } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import { number, func } from 'prop-types';
import { ui } from '../redux';
import MovieList from './MovieList';
import CharactersList from './CharactersList';

class Home extends PureComponent {
  setSelectedTab = (event, value) => {
    const { setTabSelectedIndex } = this.props;
    setTabSelectedIndex(value);
  }

  render() {
    const { tabSeletedIndex } = this.props;
    return (
      <div>
          <Tabs value={tabSeletedIndex} onChange={this.setSelectedTab}>
            <Tab label="Filmes" />
            <Tab label="Personagens" />
          </Tabs>
          { tabSeletedIndex === 0 && <MovieList />}
          { tabSeletedIndex === 1 && <CharactersList /> }
      </div>
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
  setTabSelectedIndex: ui.actions.setTabSelectedIndex
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);