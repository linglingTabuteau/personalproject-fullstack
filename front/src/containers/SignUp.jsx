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
import './SignUp.scss';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'test@test.com',
      password: 'lingling',
      passwordconfirm: 'lingling',
      name: 'lingling',
      lastname: 'Tabuteau',
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
    e.preventDefault();
    fetch(
      'http://localhost:5000/api/auth/signup',
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        // attention: on précise ci-dessous les infos qu'on voudrait envoyer dans la database car dans le state, il y a des keys ne existent pas dans la database.
        // JSON.stringify(form json);
        body: JSON.stringify(this.state),
      },
    );
    // dans la partie back(API): il retourne json et puis on utilise ci-dessous res.json()
    // .then(res => res.text());
  }

  render() {
    const {
      email, password, passwordconfirm, name, lastname,
    } = this.state;
    return (
      <Container className="SignUp">
        <h2>Sign Up</h2>
        <Form className="formgroup" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="Email"
              value={email}
              onChange={this.handleUpdatelField}
              placeholder="enter your email"
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
              placeholder="enter your password"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password Confirm</Label>
            <Input
              type="password"
              name="passwordconfirm"
              id="Passwordconfirm"
              value={passwordconfirm}
              onChange={this.handleUpdatelField}
              placeholder="confirm your password"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="Name"
              value={name}
              onChange={this.handleUpdatelField}
              placeholder="Enter your name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastname">Name</Label>
            <Input
              type="text"
              name="lastname"
              id="LastName"
              value={lastname}
              onChange={this.handleUpdatelField}
              placeholder="Enter your lastname"
              required
            />
          </FormGroup>
          <Button>Sign Up</Button>
        </Form>
        <Link to="/signin"><Button className="button">Sign In</Button></Link>
      </Container>
    );
  }
}

export default SignUp;
