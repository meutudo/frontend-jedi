import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import CustomCard from '../CustomCard/CustomCard.js';

const renderCards = data => {
  return data.map((item, index) => {
    let key = `${index}-${
      item.name || item.title
        .replace(/\s/g, '')
        .toLowerCase()
    }`;

    return <CustomCard
      imageUrl="https://picsum.photos/200/90" key={key}/>;
  });
}

const CustomList = props => {
  const movies = props.data
    ? props.data.results
    : null;

  return (
    <div>
      <CardColumns>
        { movies && renderCards(movies) }
      </CardColumns>
    </div>
  );
}

export default CustomList;
