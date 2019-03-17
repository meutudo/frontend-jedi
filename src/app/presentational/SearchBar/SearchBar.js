import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import './searchBar.scss';

class SearchBar extends Component {

  state = {
    query: 'INITIAL'
  }

  handleInputChange({ target: { value:query }}) {
    this.props.handleChange(query);
    // this.setState({
    //   query: event.target.value
    // });
  }

  render() {
    return (
      <InputGroup className="mb-3">
        <FormControl
          placeholder=""
          aria-label="Search"
          aria-describedby="Search"
          onChange={event => this.handleInputChange(event)}
        />
        <InputGroup.Append>
          <Button variant="outline-primary">Search</Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }

}

export default SearchBar;
