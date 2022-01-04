import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { CButton, CRow, CCol, CImg } from "@coreui/react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { login } from "../actions/auth";

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.email, this.state.password))
        .then(() => {
          history.push("/");
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { isLoggedIn, message } = this.props;
    const user = JSON.parse(localStorage.getItem("user"));

    if (isLoggedIn === true) {
      if(user) {
        if(user.role === 'grosir'){
          // if(user.status_role === "koperasi"){
          //   return <Redirect to="/listBiji" />;
          // } else {
          //   return <Redirect to="/listProduk" />;
          // }
          
          return <Redirect to="/listBiji" />;

        } else {
          // if(user.status_role === "koperasi"){
          //   return <Redirect to="/masterData" />;
          // } else {
          //   return <Redirect to="/roasting" />;
          // }
          
          return <Redirect to="/masterData" />;

        }
      } else {
        console.log("LOGIN FAILED");
      }
    }

    return (
      <div
        className="c-app c-default-layout  align-items-center justify-content-center"
        style={{ backgroundColor: "white" }}
      >
        <CImg
          src="/images/login form-04.png"
          className="d-inline-block align-top"
          alt="login-form"
          style={{ position: "absolute", maxWidth: "600px" }}
        />

        <div
          className="justify-content-center"
          style={{
            width: "400px",
            zIndex: "99",
            maxHeight: "1000px",
            position: "absolute",
          }}
        >
          <Form
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div
              className="form-group"
              style={{ marginTop: "13em", paddingLeft: "5em" }}
            >
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                // validations={[required]}
              />
            </div>

            <div style={{ marginTop: "3em", paddingLeft: "5em" }}>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                // validations={[required]}
              />
            </div>

            <CRow style={{ marginTop: "12em" }}>
              <CCol xs="6">
                <div>
                  <button
                    className="btn btn-light btn-block"
                    style={{ backgroundColor: "white" }}
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>
              </CCol>
              <CCol xs="6" className="text-right">
                <CButton color="link" className="px-0">
                  Forgot password?
                </CButton>
              </CCol>
            </CRow>

            {/* {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )} */}

            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>

        {/* <CContainer>
          <CRow className="justify-content-center">
            <CCol md="4"></CCol>
          </CRow>
        </CContainer> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(Login);
