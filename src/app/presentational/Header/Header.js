import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const Header = props => (
  <Nav className="justify-content-center" defaultActiveKey="/movies">
    <Nav.Item>
      <LinkContainer to="/movies">
        <Nav.Link>
          Movies
        </Nav.Link>
      </LinkContainer>
    </Nav.Item>

    <Nav.Item>
      <LinkContainer to="/characters">
        <Nav.Link>
          Characters
        </Nav.Link>
      </LinkContainer>
    </Nav.Item>
  </Nav>
);


export default Header;
