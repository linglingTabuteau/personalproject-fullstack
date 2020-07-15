import React, { Component } from 'react';
import './SearchBar.scss';
import {
  Input, Button, Form, Row,
} from 'reactstrap';
import { withRouter } from 'react-router';
import queryString from 'query-string';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  pageResult() {
    const { history } = this.props;
    console.log('history', history);
    const query = queryString.stringify(this.state);
    console.log('query:', query);
    history.push(`/result?${query}`);
  }

  render() {
    const { keyword } = this.state;
    return (
      <div className="SearchBar">
        <Form onSubmit={() => this.pageResult()}>
          <Row className="center-searchbar">
            <Input
              className="search1"
              placeholder="Enter a name of film"
              style={{ width: '25vw' }}
              value={keyword}
              onChange={this.onChange}
              name="keyword"
            />
            <Button className="search-button btn-submit">Search</Button>
          </Row>
        </Form>
      </div>
    );
  }
}

export default withRouter(SearchBar);
