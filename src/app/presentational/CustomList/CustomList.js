import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';

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
  const data = props.data
    ? props.data.results
    : null;
  const { typeSlug, cardComponent: Card } = props;

  return (
    <div>
      <CardColumns>
        { data && renderCards(data, typeSlug, Card) }
      </CardColumns>
    </div>
  );
}

export default CustomList;
