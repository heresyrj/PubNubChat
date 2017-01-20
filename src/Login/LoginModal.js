import React, {Component} from 'react';
import PubNub from "pubnub";
import { Button, Modal, Form } from 'semantic-ui-react';

class LoginModal extends Component {
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
    // console.log(typeof(this.pubnub));
    // this.pubnub.subscribe({
    //   channels:[this.channel],
    //   withPresence: true,
    // });
    // this.pubnub.addListener({
    //     presence: (p)=>{ console.log(p); }
    // });

    this.resetState();
    this.props.onSubmit(this.sessionInfo);
  }

  loginCancelHandler() {
    this.props.onCancel();
    this.resetState();
  }


  render() {
    return (
      <Modal size='small' open={this.props.loginModalVisible} >
              <Modal.Header>
                Login Your Account
              </Modal.Header>
              <Form>
                <Form.Field>
                  <label>Username</label>
                  <input name="username" onChange={this.inputsChangeHandler} />
                </Form.Field>
                <Form.Field>
                  <label>Channel</label>
                  <input name="channel" onChange={this.inputsChangeHandler} />
                </Form.Field>
              </Form>
              <Modal.Actions>
                <Button negative content='Cancel' onClick={this.loginCancelHandler} />
                <Button positive icon='checkmark' labelPosition='right' content='Login' onClick={this.loginSubmitHandler} />
              </Modal.Actions>
      </Modal>
    )
  }

}

export default LoginModal;