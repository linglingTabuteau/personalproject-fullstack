import React, { Component } from 'react';
import {
  Container, Card, CardImg, CardText, CardBody, Col,
  CardTitle, Button,
} from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signinAuth } from '../actions/signin';
import './MyProfile.scss';


class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
    };
  }

  componentDidMount() {
    const { token } = this.props;
    fetch('http://localhost:5000/api/profile',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return new Error(res.statusText);
      })
      .then((res) => {
        this.setState({ profile: res });
      })
      .catch();
  }

  render() {
    const { user } = this.props;
    const { profile } = this.state;
    return (
      <Container className="MyProfile">
        <h2>{`Welcome ${profile.name} ${profile.lastname} to MEMORY GHIBLI`}</h2>
        <p>Sharing special memories & experiences with you</p>
        <Card className="CardFilm">
          <Col className="photo-size">
            <CardImg top width="100%" src="/medias/welcome.png" alt="Card image cap" />
          </Col>
          <CardBody>
            <CardTitle>{`WELCOME ${user.name} ${user.lastname}`}</CardTitle>
            {/* <CardText>{onTheater}</CardText> */}
            <a href="https://www.youtube.com/watch?v=ByXuk9QqQkk&t=62s" target="_blank" rel="noopener noreferrer"><Button>My Favourite One</Button></a>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

const mstp = (state) => {
  console.log('reducers-state:', state);
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
};
const mdtp = dispatch => bindActionCreators({ signinAuth }, dispatch);


export default connect(mstp, mdtp)(withRouter(MyProfile));
