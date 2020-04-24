import React from 'react';
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



function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/login" component={ LoginForm }></Route>
          <Route path="/register" component={ RegisterForm }></Route>
          <Route path="/movies/:id" component={ MovieForm }></Route>
          <Route path="/movies/new" component={ MovieForm }></Route>
          <Route path="/movies" component={ Movie }></Route>
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

export default App;
