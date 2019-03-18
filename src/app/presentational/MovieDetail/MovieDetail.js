import React from 'react';
import Container from 'react-bootstrap/Container';

export default ({data}) => {
  console.log('data', data);
  return (
    <Container fluid className="pt-3">
      <h1>{data && data.title}</h1>
      <p>{data && data.opening_crawl}</p>
      <p>Directed by {data && data.director}</p>
      <p>Produced by {data && data.producer}</p>
      <p>Release date {data && data.release_date}</p>
    </Container>
  );
}
