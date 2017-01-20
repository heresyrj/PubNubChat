import React, {Component} from "react";


class Siderbar extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    const {visible} = this.state;
    return (
      <div>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            width="thin"
            direction="right"
            visible={visible}
            icon="labeled"
            vertical
            inverted
          >
            <Menu.Item name="home">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item name="gamepad">
              <Icon name="gamepad" />
              Games
            </Menu.Item>
            <Menu.Item name="camera">
              <Icon name="camera" />
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>

          
      </div>
    );
  }
}

export default Siderbar;
