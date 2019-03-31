import React, { PureComponent } from 'react';

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
        {loadMore && <div>
          <button> Carregar mais </button>
        </div>}
      </div>
    );
  }
  render() {
    const { items } = this.props;
    return items.length ? this.renderContent() : this.renderNoData();
  }
}

export default List;
