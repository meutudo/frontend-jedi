import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import Row from 'react-bootstrap/Row';
import ArrowsPagination from '../ArrowsPagination/ArrowsPagination';

const renderCards = (data, typeSlug, Card) => {
  return data.map((item, index) => {
    let key = `${index}-${
      item.name || item.title
        .replace(/\s/g, '')
        .toLowerCase()
    }`;

    return <Card
      data={item}
      typeSlug={typeSlug}
      key={key}/>;
  });
}

const CustomList = props => {
  const { data: { results: items, next: nextPageUrl, previous: previousPageUrl } } = props;
  const { typeSlug, cardComponent: Card } = props;

  return (
    <div>
      <Row className="px-3 pt-2">
        <CardColumns>
          { items && renderCards(items, typeSlug, Card) }
        </CardColumns>
      </Row>
      <Row className="justify-content-center">
        <ArrowsPagination
          next={nextPageUrl}
          previous={previousPageUrl}
          onPaginationChange={action => props.onPaginationChange(action)}
        />
      </Row>
    </div>
  );
}

export default CustomList;
