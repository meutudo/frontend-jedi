import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

import style from './MovieDetail.scss';

export default ({data}) => {
  return (
    <Container className="movie-detail" fluid className="pt-3">
      <Card className="bg-dark text-white p">
        <Card.Body>
          <Card.Title className="mt-1">
            {data && data.title}
            <LinkContainer to="/movies">
              <Button className="float-right mb-3" variant="outline-light">Go Back</Button>
            </LinkContainer>
          </Card.Title>
          <Card.Img className="img mb-4" variant="bottom" src={require(`../../../assets/images/starwars_episode_${1}.jpg`)} />
          <Card.Text>{data && data.opening_crawl}</Card.Text>
          <Card.Text>Directed by {data && data.director}</Card.Text>
          <Card.Text>Produced by {data && data.producer}</Card.Text>
          <Card.Text>Release date {data && data.release_date}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
