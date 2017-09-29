import React from 'react';
import ReactDom from 'react-dom';

import io from 'socket.io-client';

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.socket = io('/');
    this.socket.on('message', message => {
      this.setState({
        messages: [message, ...this.state.messages]
      });
    });
  }

  submitMessage = event => {
    const body = event.target.value;

    if (event.keyCode === 13 && body) {
      const message = {
        body,
        from: 'Me'
      };
      this.setState({
        messages: [message, ...this.state.messages]
      });
      this.socket.emit('message', body);
      event.target.value = '';
    }
  };

  render() {
    const messages = this.state.messages.map((message, index) => {
      return (
        <li key={index}> <b>{message.from}: </b>{message.body}</li>
      );
    });
    return (
      <div>
        <h1>Learning Map Chat Board</h1>
        <input type='text' placeholder='Enter a message' onKeyUp={this.submitMessage}/>

        {messages}
      </div>
    )
  }
}

ReactDom.render(<ChatApp />, document.getElementById('root'));
