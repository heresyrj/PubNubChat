import React, {Component} from 'react';
import PubNub from "pubnub";
import { Button, Form, Icon } from 'semantic-ui-react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      channel: '',
    }

    this.resetState =  this.resetState.bind(this);
    this.loginCancelHandler = this.loginCancelHandler.bind(this);
    this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
    this.inputsChangeHandler = this.inputsChangeHandler.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  resetState() {
    this.setState({ 
      username: '',
      channel: ''
    });
  }

  inputsChangeHandler(event) {
    if(event.target.name === 'username') {
      this.setState({ username : event.target.value });
    } else {//'channel'
      this.setState({ channel : event.target.value  });
    }
  }

  loginSubmitHandler() {
    this.username = this.state.username;
    this.channel = this.state.channel;
    this.uuid = PubNub.generateUUID();

    this.pubnub = new PubNub({ 
      publishKey : 'pub-c-0dd570c3-f787-4263-aa43-7256e2618d0b', 
      subscribeKey : 'sub-c-10219458-d6e6-11e6-bd29-0619f8945a4f',
      uuid: this.uuid
    });

    this.pubnub.setState(
        {
          state: {"username" : this.username },
          uuid: this.uuid,
          channels: [this.channel]
        },
        function (status) {
          console.log(status);
        }
    );

    this.sessionInfo = {
      pubnub: this.pubnub, 
      channel: this.channel, 
      user: this.username
    }

    this.resetState();
    this.props.onSubmit(this.sessionInfo);
  }

  loginCancelHandler() {
    this.props.onCancel();
    this.resetState();
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.loginSubmitHandler();
    }
  }


  componentWillUnmount() {

  }
  render() {
    return (
        <div className="grid center">
          <h1 className="center mb6"><Icon name="talk outline" />ChatChat</h1>
          <Form className="mb3">
            <Form.Field>
                <input className="ccInput center" name="username" placeholder="Your display name" onChange={this.inputsChangeHandler} />
            </Form.Field>
            <Form.Field>
                <input className="ccInput center" name="channel" placeholder="Channel" onChange={this.inputsChangeHandler} onKeyPress={this.handleKeyPress}/>
            </Form.Field>
            </Form>
            <Button className="ccBtnLogin" content='Start Chatting' onClick={this.loginSubmitHandler} disabled={(this.state.username !== '' && this.state.channel
            !== '')? false : true}/>
        </div>
        
    )
  }

}

export default LoginForm;