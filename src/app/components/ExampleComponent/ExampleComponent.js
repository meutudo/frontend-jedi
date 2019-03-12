import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './ExampleComponent.scss';

class ExampleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={event => this.handleChange(event)} />
        <Button variant="primary">Primary</Button>
      </div>
    );
  }
}

export default ExampleComponent;
