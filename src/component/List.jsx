import React, { PureComponent } from 'react';
import {
  arrayOf, object, func, bool,
} from 'prop-types';

class List extends PureComponent {
  renderNoData = () => (
    <div>
      Nenhum resultado encontrado :(
    </div>
  );

  renderContent = () => {
    const { items, renderRow, loadMore } = this.props;
    return (
      <div>
        <div>
          {items && items.map(renderRow)}
        </div>
        {loadMore && (
        <div>
          <button type="button"> Carregar mais </button>
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

List.propTypes = {
  items: arrayOf(object),
  renderRow: func.isRequired,
  loadMore: bool,
};

List.defaultProps = {
  items: [],
  loadMore: false,
};

export default List;
