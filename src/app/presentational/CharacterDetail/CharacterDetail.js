import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { capitalize } from '../../common/scripts/stringUtils.js'

export default ({data}) => {
  return (
    <Container className="movie-detail" fluid className="pt-3">
      <Card className="bg-dark text-white p">
        <Card.Body>
          <Card.Title className="mt-1">
            {data && data.name}
            <LinkContainer to="/characters">
              <Button className="float-right mb-3" variant="outline-light">Go Back</Button>
            </LinkContainer>
          </Card.Title>
          <Card.Text>Birth Year: {data && data.birth_year}</Card.Text>
          <Card.Text>Mass: {data && data.mass}</Card.Text>
          <Card.Text>Height: {data && data.height}</Card.Text>
          <Card.Text>Hair Color: {data && capitalize(data.hair_color)}</Card.Text>
          <Card.Text>Eye Color: {data && capitalize(data.eye_color)}</Card.Text>
          <Card.Text>Gender: {data && capitalize(data.gender)}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
