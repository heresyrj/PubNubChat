import React, {Component} from "react";
import { Button, Input, Icon } from 'semantic-ui-react';

import "./style.css";

class MessageInput extends Component {
  constructor (props) {
    super(props);
    this.state = {
        input: '',
        isBtnDisabled: true,
        isBtnLoading: false,
    };
    
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onSendHandler = this.onSendHandler.bind(this);
    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
  }

  componentDidMount() {
    this.pubnub = this.props.sessionInfo.pubnub;
    this.channel = this.props.sessionInfo.channel;
    this.user = this.props.sessionInfo.user;
  }
  
  handleKeyPress(event) {
    if (event.key === 'Enter' && this.state.input !== '') {
      this.onSendHandler();
    }
  }

  onInputChangeHandler(event) {
    let isBtnDisabled = false;
    if (event.target.value === '') isBtnDisabled = true;
    this.setState({
      input: event.target.value,
      isBtnDisabled: isBtnDisabled,
    });
  }

  onSendHandler() {
    
    this.msg = "<b style='color:"+this.props.color+";'>"+this.user+ "</b> <span class='msgBubble'>" + this.state.input +"</span>";
    this.setState({isBtnLoading: true});

    let publishConfig = {
      channel : this.channel,
      message : this.msg
    };

    this.pubnub.publish(publishConfig, (status, response) => {
      console.log(status, response);
      this.setState({
        input: '',
        isBtnLoading: false,
        isBtnDisabled: true,
      });
    })

    this.setState({input: ''});
  }

  render() {
    return (
      <div className="inputWrapper">
        <Input placeholder="Type a message" className="textInput" onChange={this.onInputChangeHandler} value={this.state.input} onKeyPress={this.handleKeyPress}/>
        <Button type='submit' className="submitButton" onClick={this.onSendHandler} animated='vertical' disabled={this.state.isBtnDisabled} loading={this.state.isBtnLoading}>
          <Button.Content visible>Send</Button.Content>
          <Button.Content hidden>
            <Icon name='send' />
          </Button.Content>
        </Button>
      </div>
    );
  }
}
export default MessageInput;




