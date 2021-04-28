import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';
import { mainAction, mainSelect } from '../../redux';

class Main extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const res = {};
    console.log('----->');
    return res;
  }

  apiTest = () => {
    this.props.dispatch(mainAction.actionApiTest());
  };

  localTest = () => {
    console.log('-----local');
    this.props.dispatch(mainAction.actionLocalTest({ a: 1, b: 2 }));
  };

  render() {
    return (
      <div style={styles.content}>
        主页面
        <button
          onClick={() => {
            this.apiTest();
          }}
        >
          网络接口请求
        </button>
        <button
          onClick={() => {
            this.localTest();
          }}
        >
          本地redux
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: mainSelect.dataSelect(state),
});
export default connect(mapStateToProps)(Main);
