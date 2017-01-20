import React, {Component} from "react";
import {Sidebar,Segment,Menu,Icon} from "semantic-ui-react";

import NavBar from "./Nav/NavBar.js";
import MessageInput from "./Message/MessageInput";
import Display from "./Display/Display";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogedIn: false,
      siderVisible: false,
      occupantsAvailable: false,
      occupants: []
    };

    this.loginStateToggle = this.loginStateToggle.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.siderToggle = this.siderToggle.bind(this);
    this.updateOccupancy = this.updateOccupancy.bind(this);
  }

  loginStateToggle() {
    this.setState({isLogedIn: !this.state.isLogedIn});
  }

  loginHandler(sessionInfo) {
    this.sessionInfo = sessionInfo;
    this.loginStateToggle();
  }

  siderToggle(userstatus) {
    if (!this.state.siderVisible) {
      this.updateOccupancy(userstatus);
    }
    this.setState({siderVisible: !this.state.siderVisible});
  }

  updateOccupancy(userstatus) {
    console.log("total: "+userstatus);
    this.total = userstatus.totalOccupancy;
    this.setState({
      occupantsAvailable: true,
      occupants: userstatus.channels[this.sessionInfo.channel].occupants
    });
  }

  getRandomColor() {
    const colors = ['#BCE784', '#5DD39E', '#348AA7', '#525174', '#EE4266', '#F2711C'];

    const randomNum = Math.floor(Math.random() * 5);

    return colors[randomNum];
  }

  render() {
    const {siderVisible, occupantsAvailable, occupants} = this.state;
    console.log(occupants[0]);
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          width="thin"
          direction="right"
          visible={siderVisible}
          icon="labeled"
          vertical
          inverted
        >
          <Menu.Item name="channel">
            <Icon name="users" />
          </Menu.Item>
          {occupantsAvailable && occupants.map(occupant => {
                return (
                  <p className="username" key={occupant.uuid}>
                    {occupant.state.username}
                  </p>
                );
              })}
        </Sidebar>
        <Sidebar.Pusher>
          <div className="root">
            <NavBar
              isLogedIn={this.state.isLogedIn}
              loginToggle={this.loginStateToggle}
              loginHandler={this.loginHandler}
              siderToggle={this.siderToggle}
              siderVisible={siderVisible}
              totalOccupancy={this.state.occupants.length}
              onOccupancyUpdate={this.updateOccupancy}
            />
            <Display
              sessionInfo={this.sessionInfo}
              isLogedIn={this.state.isLogedIn}
            />
            {
              this.state.isLogedIn
                ? <MessageInput sessionInfo={this.sessionInfo} color={this.getRandomColor()} />
                : null
            }
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default App;
