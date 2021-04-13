import React from "react";
import { connect } from "react-redux";
import styles from "./styles";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div style={styles.content}>主页面</div>;
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Main);
