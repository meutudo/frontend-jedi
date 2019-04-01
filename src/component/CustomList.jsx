import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import {
  arrayOf, object, func, bool,
} from 'prop-types';
import { Button, ListItem, ListItemText } from '@material-ui/core';

const styles = {
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: '25px',
  },
};

class CustomList extends PureComponent {
  renderNoData = () => (
    <ListItem>
      <ListItemText primary="Nenhum resultado encontrado :(" />
    </ListItem>
  );

  renderContent = () => {
    const {
      items, renderRow, loadMore, loadMoreAction,
    } = this.props;
    return (
      <div>
        <List>
          {items && items.map(renderRow)}
        </List>
        {loadMore && (
          <div style={styles.buttonContainer}>
            <Button variant="contained" color="default" onClick={loadMoreAction}>
              Carregar mais
            </Button>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { items } = this.props;
    return items.length ? this.renderContent() : this.renderNoData();
  }
}

CustomList.propTypes = {
  items: arrayOf(object),
  loadMore: bool,
  renderRow: func.isRequired,
  loadMoreAction: func.isRequired,
};

CustomList.defaultProps = {
  items: [],
  loadMore: false,
};

export default CustomList;
