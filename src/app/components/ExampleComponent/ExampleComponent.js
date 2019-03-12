import React, { Component } from 'react';

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
      </div>
    );
  }
}

export default ExampleComponent;
