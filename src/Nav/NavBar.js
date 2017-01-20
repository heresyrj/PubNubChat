import React, {Component} from "react";
import {Icon} from "semantic-ui-react";

import LoginModal from "../Login/LoginModal";
import LoginForm from "../Login/LoginForm";
import "./style.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {loginModalVisible: false};

    this.loginModalCancelHandler = this.loginModalCancelHandler.bind(this);
    this.loginModalSubmitHandler = this.loginModalSubmitHandler.bind(this);
    this.logToggleBtnClickHandler = this.logToggleBtnClickHandler.bind(this);
    this.usersBtnClickHandler = this.usersBtnClickHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.isLogedIn && nextProps.isLogedIn) {
      this.pubnub.hereNow(
        {channels: [this.channel], includeUUIDs: true, includeState: true},
        function(status, response) {
         this.props.onOccupancyUpdate(response);
        }.bind(this)
      );
    }
  }
  
  loginModalCancelHandler() {
    this.setState({loginModalVisible: false});
    if (this.props.isLogedIn)
      this.props.loginToggle();
  }

  loginModalSubmitHandler(sessionInfo) {
    this.pubnub = sessionInfo.pubnub;
    this.channel = sessionInfo.channel;
    this.setState({loginModalVisible: false});
    this.props.loginHandler(sessionInfo);
  }

  logToggleBtnClickHandler() {
    if (!this.state.loginModalVisible && this.props.isLogedIn) {
      this.props.loginToggle();
      this.setState({loginModalVisible: false});
    } else {
      this.setState({
        loginModalVisible: this.state.loginModalVisible ? false : true
      });
    }
  }

  usersBtnClickHandler() {
    if(!this.props.siderVisible) {
      this.pubnub.hereNow(
        {channels: [this.channel], includeUUIDs: true, includeState: true},
        function(status, response) {
          console.log(status);
          this.props.siderToggle(response);
        }.bind(this)
      );
    } else {
      this.props.siderToggle();
    }
  }

  render() {
    if (this.props.isLogedIn) {
      return (
        <div className="headerBar">
          <div className="flex">
            <h1 className="mb0"><Icon name="talk outline" /> ChatChat
            <span className="colorPrimary regular"> | {this.channel}</span> 
            </h1>
             <button className="ccBtnUsers ml1"onClick={this.usersBtnClickHandler}>
                [<Icon name="users" />
                {this.props.totalOccupancy}]
            </button>
          </div>

          <div className="btns">
            <button className="ccBtnLogout" onClick={this.logToggleBtnClickHandler}>
               Log Out
            </button>
          </div>
          <LoginModal
            loginModalVisible={this.state.loginModalVisible}
            onCancel={this.loginModalCancelHandler}
            onSubmit={this.loginModalSubmitHandler}
          />
        </div>
      );
    } else {
      return (
        <div className="loginWrap">
          <LoginForm 
            loginModalVisible={this.state.loginModalVisible}
            onCancel={this.loginModalCancelHandler}
            onSubmit={this.loginModalSubmitHandler}/>
        </div>
      );
    }
    
  }
}

export default NavBar;
