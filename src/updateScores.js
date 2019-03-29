import React, { Component } from "react";

import * as serviceWorker from "./serviceWorker";
import { Button, Row, Col } from "reactstrap";
export default class UpdateScore extends Component {
  constructor() {
    super();
    this.state = { apiItems: [] };
  }
  async fetchHighScores() {
    const url = "http://ftw-highscores.herokuapp.com/tictactoe-dev?limit=50";
    let response;
    console.log("url", url);
    try {
      response = await fetch(url, {
        method: "GET"
      });
    } catch (error) {
      console.log(error);
    }
    let json = await response.json();
    this.setState({ apiItems: json.items });
    console.log(this.state.apiItems);
  }

  async highScoreUpload() {
    let data = new URLSearchParams();
    data.append("player", "Oanh");
    data.append("score", 20);
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      json: true
    });
    let json = await response.json();
    this.fetchHighScores();
    console.log(json);
  }
  componentDidMount() {
    this.fetchHighScores();
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.highScoreUpload()}>
          {" "}
          High Score Upload{" "}
        </Button>
        {this.state.apiItems &&
          this.state.apiItems.map(item => (
            <li>
              {" "}
              {item.player}: {item.score}
            </li>
          ))}
      </div>
    );
  }
}
