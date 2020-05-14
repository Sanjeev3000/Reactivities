import React, { Component } from "react";

import "./App.css";
import { Header, Icon, List } from "semantic-ui-react";
import axios from "axios";
class App extends Component {
  state = {
    values: [],
  };
  componentDidMount() {
    axios.get("http://localhost:5000/api/values").then((response) => {
      this.setState(
        {
          values: response.data,
        },
        () => {
          console.log(this.state.values);
        }
      );
    });
  }
  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Reactivites</Header.Content>
        </Header>
        <List>
          {this.state.values.map((x: any) => (
            <List.Item key={x.id}>{x.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
