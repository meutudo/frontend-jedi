import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { LinkContainer } from 'react-router-bootstrap';

const CharacterCard = props => {
  const {
    name,
    url,
    eye_color: eyeColor,
    skin_color: skinColor
  } = props.data;
  const { type } = props;

  // REVIEW IT
  const slugSplited = url.split('/');
  const slugId = slugSplited[slugSplited.length-2];

  console.log('Inside Character Card', props.data);

  return (
    <Card className="bg-dark text-white">
      <Card.Body>
        <Card.Title>Character - {name} Character</Card.Title>
        <Card.Text>
          Eye Color: {eyeColor}
        </Card.Text>
        <Card.Text>
          Skin Color: {skinColor}
        </Card.Text>
        <LinkContainer to={`/${type}/${slugId}`}>
          <Card.Link>
            See more...
          </Card.Link>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default CharacterCard;
