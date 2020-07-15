import React, { Component } from 'react';
import {
  Container, Row, Button, Col,  Card, CardImg, CardBody, CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import AfficheFilm from '../containers/AfficheFilm';
import './Admin.scss';

class Admin extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <Container fluid className="Admin">
        <Row className="button">
          <Button tag={Link} to="/admin/addfilm">Add one Film</Button>
          <Button tag={Link} to="/admin/modifyfilm">Modify one Film</Button>
          {/* <Button tag={Link} to="/admin/addfilm">Delete one Film</Button> */}
        </Row>
        <div className="cards">
          <AfficheFilm />
        </div>
      </Container>
    );
  }
}

const mstp = state => ({

});

const mdtp = dispatch => {

}

export default Admin;