import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardFilm from './CardFilm';
import { dataResults } from '../actions/search';
import initState from '../actions/index';
import './SearchResults.scss';

class SearchResults extends Component {
  componentDidMount() {
    const { initState, resultFilms, location } = this.props;
    // {location.search} send the information of req.query.keyword throught url to the back
    // back waits for a parameter req.query.keyword
    console.log('location', location);
    initState();
    resultFilms(`http://localhost:5000/api/results${location.search}`);
  }

  render() {
    const { searchResults: { results } } = this.props;
    return (
      <Container className="SearchResults">
        <Row>
          {
            results.map(item => (
              <CardFilm
                name={item.name}
                onTheater={item.on_theater}
                imageUrl={item.image_url}
                url={item.url}
              />
            ))
          }
        </Row>
      </Container>
    );
  }
}


function mstp(state) {
  return {
    searchResults: state.listFilms,
  };
}

function mdtp(dispatch) {
  return bindActionCreators({
    resultFilms: dataResults, initState,
  },
  dispatch);
}

export default withRouter(
  connect(
    mstp,
    mdtp,
  )(SearchResults),
);
