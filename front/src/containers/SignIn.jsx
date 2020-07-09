import React, { Component } from 'react';
import {
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  Container,
}
  from 'reactstrap';
import './SignIn.scss';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signinAuth } from '../actions/signin';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleUpdatelField = this.handleUpdatelField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdatelField(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    const { signinAuth, history } = this.props;
    e.preventDefault();
    const config = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(this.state),
    };
    fetch('http://localhost:5000/api/signin', config)
      .then((res) => {
        if (res.status === 400) {
          console.log('res.statusText', res.statusText);
        } if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        signinAuth(res.user, res.token);
        history.replace('/myprofile');
      });
  }

  render() {
    const { email, password } = this.state;
    return (
      <Container className="SignIn">
        <h2>Sign In</h2>
        <Form className="formgroup" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="Email"
              value={email}
              onChange={this.handleUpdatelField}
              placeholder="clement@gmail.com"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="Password"
              value={password}
              onChange={this.handleUpdatelField}
              placeholder="****"
              required
            />
          </FormGroup>
          <Button>Sign In</Button>
        </Form>
        <Link to="/signup"><Button className="button">CREATE AN ACCOUNT</Button></Link>
      </Container>
    );
  }
}

const mdtp = dispatch => bindActionCreators({ signinAuth }, dispatch);
function mstp(state) {
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
}


export default connect(mstp, mdtp)(withRouter(SignIn));
