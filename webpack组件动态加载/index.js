import React from "react";
import ReactDOM from "react-dom";
import { Bar } from "dqhan";
class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Bar />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("app"));
