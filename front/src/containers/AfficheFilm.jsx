import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container, Row,
} from 'reactstrap';
import '../components/CardFilm.scss';
import { dataResults } from '../actions/search';
import './AfficheFilm.scss';
import CardFilm from '../components/CardFilm';

class AfficheFilm extends Component {
  componentDidMount() {
    const { dataResults } = this.props;
    dataResults('http://localhost:5000/api/films');
  }

  render() {
    const { listFilms } = this.props;
    return (
      <div>
        <Container fluid className="AfficheFilm">
          <Row className="center-card">
            {
              listFilms.results.map(item => (
                <CardFilm
                  name={item.name}
                  onTheater={item.on_theater}
                  imageUrl={item.image_url}
                  url={item.url}
                  videoUrl={item.video_url}
                  key={item.name}
                />
              ))
            }
          </Row>
        </Container>
      </div>
    );
  }
}

function mstp(state) {
  return {
    listFilms: state.listFilms,
  };
}
function mdtp(dispatch) {
  return bindActionCreators({
    dataResults,
  }, dispatch);
}

export default connect(mstp, mdtp)(AfficheFilm);
