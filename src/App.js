import React,{Component} from 'react';
import './App.css';
import NavBar from './components/navbar';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Movie from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Logout from './components/logout';
import auth from './services/authService';
import ProtectedRoute from './components/protectedRoute';



class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user })
  }

  render() {
    const { user } = this.state;
    return (
    <>
      <ToastContainer />
      <NavBar user={user}/>
      <main className="container">
        <Switch>
          <Route path="/login" component={ LoginForm }></Route>
          <Route path="/logout" component={ Logout }></Route>
          <Route path="/register" component={ RegisterForm }></Route>
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route path="/movies" render={props => <Movie {...props} user={user}/>}></Route>
          <Route path="/customers" component={ Customers }></Route>
          <Route path="/rentals" component={ Rentals }></Route>
          <Route path="/not-found" component={ NotFound }></Route>
          <Redirect from="/" exact to="/movies"></Redirect>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </main>
    </>
    );
  }
}

export default App;
