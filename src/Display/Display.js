import React, {Component} from "react";

import "./style.css";

class Display extends Component {
  constructor (props) {
    super(props);
    this.state = {
      msgs: []
    };
  }

  componentWillReceiveProps(nextProps) {

    if(!nextProps.isLogedIn) {
      this.setState({
        msgs: []
      })
      this.pubnub.unsubscribe({
        channels:[this.channel]
      });
    }

    if(!this.props.isLogedIn && nextProps.isLogedIn) {
      this.pubnub = nextProps.sessionInfo.pubnub;
      this.channel = nextProps.sessionInfo.channel;
      this.pubnub.addListener({
        message: (msg) => { 
          this.setState({ msgs: [...this.state.msgs, msg.message]});
          this.refs.scrollableView.scrollTop = this.refs.scrollableView.scrollHeight;
        },
      });
      this.pubnub.subscribe({
        channels:[this.channel],
        withPresence: true,
      });
    }
  }
  
  render() {
    
    const { msgs } = this.state;
    return (
        <div className="msgDisplay container" ref="scrollableView">
          <div>
          <div className="msgList">
            {msgs.map( (msg, i) => <p className="msg" key={msg+i} dangerouslySetInnerHTML={{__html: msg}}></p>  )}
          </div>
          </div>
        </div>
    );
  }
}
export default Display;





