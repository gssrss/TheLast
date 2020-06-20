import React from "react"
import AudioPlayer from "react-h5-audio-player"
import Metla from "./Metla.mp3"
import "react-h5-audio-player/lib/styles.css"
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
//import { withRouter } from "react-router"
import fire from "./config/fire"
import "./Audioplayer.css"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
//import { createBrowserHistory } from "history"
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  //MDBFormInline,
  MDBAnimation,
} from "mdbreact"
import "./Login.css"

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.signup = this.signup.bind(this)
    //this.onClickCovid = this.onClickCovid.bind(this)
    this.refreshPage = this.refreshPage.bind(this)
    this.state = {
      email: "",
      password: "",
      collapseID: "",
      //covid: false,
      //history: createBrowserHistory(),
    }
  }
  login = async (e) => {
    const { history } = this.props
    e.preventDefault()
    try {
      await fire
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
      history.push("/Home")
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
      // console.log(error);
    }
  }
  signup = async (e) => {
    const { history } = this.props
    e.preventDefault()
    try {
      await fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
      history.push("/Home")
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
      //console.log(error.message);
    }
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }))
  componentDidMount() {
    document.querySelector("nav").style.height = "65px"
  }
  componentWillUnmount() {
    document.querySelector("nav").style.height = "auto"
  }
  // onClickCovid() {
  //   this.setState({ covid: true })
  // }
  refreshPage() {
    window.location.reload(false)
  }
  render() {
    //const { email } = this.state
    const { collapseID } = this.state
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("navbarCollapse")}
      />
    )
    // if (this.state.covid) {
    //   return <Covid19 />
    // } else {
    return (
      <>
        <div id="classicformpage">
          <div>
            <MDBNavbar dark expand="md" scrolling fixed="top">
              <MDBContainer>
                <MDBNavbarToggler
                  onClick={this.toggleCollapse("navbarCollapse")}
                />
                <MDBCollapse id="navbarCollapse" isOpen={collapseID} navbar>
                  <MDBNavbarNav left>
                    <MDBNavLink to="home">
                      <MDBBtn onClick={this.refreshPage}>Youmusic</MDBBtn>
                    </MDBNavLink>
                    <MDBNavItem>
                      <MDBNavLink to="/Covid">
                        <MDBBtn>Covid 19</MDBBtn>
                      </MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                  <MDBNavLink to="/">
                    <MDBNavbarBrand>
                      <h1
                        className="white-text"
                        style={{ fontFamily: "italic" }}
                      >
                        Wellcome to Youmusic
                      </h1>
                    </MDBNavbarBrand>
                  </MDBNavLink>
                  <MDBNavbarNav right>
                    <MDBNavItem>
                      <div className="md-form my-0">
                        <h3 title="SomeUser">
                          <MDBNavLink to="/Home">
                            <MDBIcon icon="user"></MDBIcon>
                          </MDBNavLink>
                        </h3>
                      </div>
                    </MDBNavItem>
                  </MDBNavbarNav>
                </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>
            {collapseID && overlay}
          </div>

          <MDBView>
            <MDBMask className="d-flex justify-content-center align-items-center gradient" />
            <MDBContainer
              style={{ height: "100%", width: "100%", paddingTop: "5rem" }}
              className="mt-5  d-flex justify-content-center align-items-center"
            >
              <MDBRow>
                <MDBAnimation
                  type="fadeInLeft"
                  delay=".3s"
                  className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
                >
                  <h1 className="h1-responsive font-weight-bold">
                    Sign up right now!
                  </h1>
                  <hr className="hr-light" />
                  <h6 className="mb-4">
                    Life is too short to listen bad music
                  </h6>
                </MDBAnimation>
                <MDBCol md="6" xl="5" className="mb-4">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <MDBCard id="classic-card">
                      <MDBCardBody className="white-text">
                        <h3 className="text-center">
                          <MDBIcon icon="user" /> Register:
                        </h3>
                        <hr className="hr-light" />
                        <div>
                          <MDBInput
                            onChange={this.handleChange}
                            value={this.state.email}
                            className="white-text"
                            iconClass="white-text"
                            label="Your email"
                            icon="envelope"
                            type="email"
                            name="email"
                          />
                          <MDBInput
                            value={this.state.password}
                            onChange={this.handleChange}
                            className="white-text"
                            iconClass="white-text"
                            label="Your password"
                            icon="lock"
                            type="password"
                            name="password"
                          />
                        </div>
                        <div className="text-center mt-4 black-text">
                          <MDBBtn onClick={this.signup} color="indigo">
                            Sign Up
                          </MDBBtn>

                          <MDBBtn onClick={this.login} color="indigo">
                            Login
                          </MDBBtn>

                          <hr className="hr-light" />
                          <div className="text-center d-flex justify-content-center white-label">
                            <MDBIcon icon="envelope" className="white-text" />
                          </div>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <div>
              <AudioPlayer
                className="Player"
                //autoPlay="true"
                loop="true"
                src={Metla}
                //onPlay={(e) => console.log("onPlay")}
              />
            </div>
          </MDBView>
          <ToastContainer />
        </div>
      </>
    )
  }
}
//}
export default Login
