import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { logout, signinAuth, autoLoginAuth } from './actions/signin';

import './NavBar.scss';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount() {
    // nouveautée ES6 Map [[key, value], [key, value]] pour récupérer les cookies
    const cookies = new Map(document.cookie.split('; ').map(e => e.split('=')));
    const token = cookies.get('token');
    const { autoLoginAuth } = this.props;
    if (token) {
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
        .then((user) => {
          autoLoginAuth(user, token);
        })
        .catch();
    }
  }

  doLogout() {
    const { logout, history } = this.props;
    logout();
    history.push('/');
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const { user } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="NavBar">
        {/* attention: faut enlever light dans Navbar pour changer la color de NavItem */}
        <Navbar color="light" light expand="md" className="nav">
          <NavbarBrand href="/" style={{ color: 'rgb(126, 211, 69)' }}>MEMORY GHIBLI</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/affichefilm"><NavLink to="/affichefilm" style={{ color: 'rgb(126, 211, 69)' }}>List All films</NavLink></Link>
              </NavItem>
              {
                user.email === ''
                  ? (
                    <NavItem>
                      <NavLink tag={Link} to="/signin" style={{ color: 'rgb(126, 211, 69)' }}>Sign In</NavLink>
                    </NavItem>
                  )
                  : (
                    <UncontrolledDropdown>
                      <DropdownToggle className="drop">
                        My Profile
                      </DropdownToggle>
                      <DropdownMenu right className="drop">
                        <DropdownItem className="drop" tag={Link} to="/myprofile">My Profile</DropdownItem>
                        <DropdownItem onClick={this.doLogout} className="drop">Sign Out</DropdownItem>
                        {
                          (user.email === 'lingling.tabuteau@gmail.com')
                            ? (
                              <DropdownItem className="drop" tag={Link} to="/admin">Administrateur</DropdownItem>
                            )
                            : (
                              <DropdownItem />
                            )
                        }
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mdtp = dispatch => bindActionCreators({ signinAuth, autoLoginAuth, logout }, dispatch);
function mstp(state) {
  console.log('reducers-state:', state);
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
}

export default connect(mstp, mdtp)(withRouter(NavBar));
