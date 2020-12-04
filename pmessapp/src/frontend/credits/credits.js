import React, { Component } from "react";
import pranjal from './credit-images/pranjal.jpeg';
import shravani from './credit-images/shravani.jpeg';
import nehal from './credit-images/nehal.jpeg';
import ankita from './credit-images/ankita.jpeg';

class Credits extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <style>{"body{background-color: #e0ece4;}"}</style>
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>Credits</h2>
        <table
          style={{
            display: "inline-block",
            marginTop: "100px",
            marginLeft: "550px",
          }}
        >
          <tbody>
            <tr>
              <td>
                <img
                  height="100px"
                  src={ankita}
                ></img>
              </td>
              <td>
                <img
                  height="100px"
                  src={shravani}
                ></img>
              </td>
              <td>
                <img
                  height="100px"
                  src={nehal}
                ></img>
              </td>
              <td>
                <img
                  height="100px"
                  src={pranjal}
                ></img>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>Ankita Chikodi</td>
              <td style={{ textAlign: "center" }}>Shravani Pande</td>
              <td style={{ textAlign: "center" }}>Nehal Sharma</td>
              <td style={{ textAlign: "center" }}>Pranjal Sharma</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Credits;
