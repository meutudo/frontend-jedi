import React, { PureComponent } from 'react';
import {
  arrayOf, object, func, bool,
} from 'prop-types';

class List extends PureComponent {
  renderLoading = () => (<div>Loading...</div>)

  renderNoData = () => (
    <div>
      Nenhum resultado encontrado :(
    </div>
  );

  renderContent = () => {
    const {
      items, renderRow, loadMore, loadMoreAction,
    } = this.props;
    return (
      <div>
        <div>
          {items && items.map(renderRow)}
        </div>
        {loadMore && (
        <div>
          <button type="button" onClick={loadMoreAction}> Carregar mais </button>
        </div>
        )}
      </div>
    );
  }

  render() {
    const { items, isLoading } = this.props;
    if (isLoading) {
      return this.renderLoading();
    }
    return items.length ? this.renderContent() : this.renderNoData();
  }
}

List.propTypes = {
  items: arrayOf(object),
  loadMore: bool,
  isLoading: bool,
  renderRow: func.isRequired,
  loadMoreAction: func.isRequired,
};

List.defaultProps = {
  items: [],
  loadMore: false,
  isLoading: false,
};

export default List;
