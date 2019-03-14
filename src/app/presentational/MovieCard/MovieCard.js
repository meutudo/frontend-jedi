import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { LinkContainer } from 'react-router-bootstrap';

const CustomCard = props => {
  const {
    title,
    opening_crawl:openingCrawl,
    producer,
    url
  } = props.data;
  const { type } = props;

  // REVIEW IT
  const slugSplited = url.split('/');
  const slugId = slugSplited[slugSplited.length-2];

  console.log('Inside Character Card', props.data);

  return (
    <Card className="bg-dark text-white p">
      <Card.Body>
        <Card.Title>Movie - {title}</Card.Title>
        <Card.Text>
          Opening Crawl: {openingCrawl}
        </Card.Text>
        <Card.Text>Producer: {producer}</Card.Text>
        <LinkContainer to={`/${type}/${slugId}`}>
          <Card.Link>
            See more...
          </Card.Link>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
