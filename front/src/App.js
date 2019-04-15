import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './components/Home';
import Footer from './Footer';
import SearchBar from './containers/SearchBar';
import AddFilm from './components/AddFilm';
import SearchResults from './components/SearchResults';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import MyProfile from './containers/MyProfile';
import requireAuth from './hoc/requireAuth';
import requireNotAuth from './hoc/requireNotAuth';
import PrivateRoute from './PrivateRouteAdmin';
import AfficheFilm from './containers/AfficheFilm';
import ModifyFilm from './components/ModifyFilm';
import Admin from './components/Admin';
import Video from './components/Video';

const App = () => (
  <div className="App">
    <NavBar />
    {/* we give a fixed size to menu in order to keep Footer at the bottom of page */}
    <div className="menu">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/searchbar" component={SearchBar} />
        <Route path="/result" component={SearchResults} />
        <Route path="/affichefilm" component={AfficheFilm} />
        <Route path="/video" component={Video} />
        <Route exact path="/myprofile" component={requireAuth(MyProfile)} />
        <Route exact path="/signin" component={requireNotAuth(SignIn)} />
        <Route exact path="/signup" component={requireNotAuth(SignUp)} />
        <PrivateRoute path="/admin/addfilm" component={AddFilm} />
        <PrivateRoute path="/admin/modifyfilm" component={ModifyFilm} />
        <PrivateRoute path="/admin" component={Admin} />
      </Switch>
    </div>
    <Footer />
  </div>
);

export default App;
