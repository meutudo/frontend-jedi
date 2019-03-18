import React from 'react';
import Container from 'react-bootstrap/Container';
import { capitalize } from '../../common/scripts/stringUtils.js'

export default ({data}) => {
  console.log('data', data);
  return (
    <Container fluid className="pt-3">
      <h1>{data && data.name}</h1>
      <p>Birth Year: {data && data.birth_year}</p>
      <p>Mass: {data && data.mass}</p>
      <p>Height: {data && data.height}</p>
      <p>Hair Color: {data && capitalize(data.hair_color)}</p>
      <p>Eye Color: {data && capitalize(data.eye_color)}</p>
      <p>Gender: {data && capitalize(data.gender)}</p>
    </Container>
  );
}
