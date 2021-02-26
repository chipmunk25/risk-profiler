import React from "react";
import "./style.scss";
import Login from "./login";
import LoadingProgress from 'components/Loading';
import { connect } from "react-redux"
import { showAuthLoader,hideAuthLoader } from "appRedux/Actions/common"
class SignIn extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
      isLoading: false

    };
  }

  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");

    this.setState({ isLoading: true })
    this.props.showLoader()
    setTimeout(() => {
      this.setState({ isLoading: false })
      this.props.hideLoader()
    }, 1500);
  }

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const { isLogginActive } = this.state;
    const {loader}  = this.props
    const current = isLogginActive ? "Login" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    
    return (
      <div>
        <div className="App">
          <LoadingProgress className="gx-loader-view gx-loader-position" loading={loader} />
          <div className="login">
            <div className="container" ref={ref => (this.container = ref)}>
              {isLogginActive && (
                <Login containerRef={ref => (this.current = ref)} />
              )}
              {!isLogginActive && (
                <Login containerRef={ref => (this.current = ref)} />
              )}
            </div>
            <RightSide
              current={current}
              currentActive={currentActive}
              containerRef={ref => (this.rightSide = ref)}
              onClick={this.changeState.bind(this)}
            />
          </div>

        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { loader } = state.common
  return {
    loader
  }
}
export default connect(mapStateToProps, { showLoader: showAuthLoader, hideLoader: hideAuthLoader })(SignIn);