import React from "react";
import ReactDOM from "react-dom";
// import { Button } from "antd";
import { Bar } from "test";
class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* <Button /> */}
        <Bar />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("app"));
