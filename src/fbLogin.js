import React, { Component } from "react";

import * as serviceWorker from "./serviceWorker";
import FacebookLogin from "react-facebook-login";

export default class FBLogin extends Component {
  responseFacebook(resp) {
    console.log("this is the FB response", resp);
  }

  render() {
    return (
      <div className="App">
        <FacebookLogin
          appId="305563746794682"
          autoLoad={true}
          fields="name,email,picture"
          callback={resp => this.responseFacebook(resp)}
        />
      </div>
    );
  }
}
