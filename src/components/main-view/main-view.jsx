import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      //step: 'login',
      step: 'signup',
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (accessToken && user) {
      this.setState({
        step: 'app',
        user,
      });
      this.getMovies(accessToken);
    } else {
      this.setState({
        step: 'login',
      });
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      step: 'app',
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
      step: 'login',
    });
  }

  getMovies(token) {
    axios
      .get('https://movie-maniacs.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  toSignup() {
    this.setState({
      step: 'signup',
    });
  }

  toLogin() {
    this.setState({
      step: 'login',
    });
  }

  onSignup(newUser) {
    this.setState({
      step: 'app',
      user: newUser,
    });
  }

render() {
  const { movies, selectedMovie, user, step } = this.state;
  if (step === 'login')
    return (
      <LoginView
        onLoggedIn={(authData) => this.onLoggedIn(authData)}
        toSignup={() => this.toSignup()}
      />
    );
  if (step === 'signup')
    return (
      <SignupView
        onSignup={(signup) => this.onSignup(signup)}
        toLogin={() => this.toLogin()}
      />
    );
  if (!user) {
    return null;
  }
  if (movies.length === 0)
    return <div className="main-view">The list is empty!</div>;

    return (
      // conditional rendering for loading statment
      /*loading ? (
        <p>Loading...</p>
      ) : !movies || !movies.length ? (
        <p>No movies found</p>
      ) : (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
        */
      <div>
        <button onClick={() => { 
          this.onLoggedOut(); 
          localStorage.clear();
        }}
      > Logout </button>
  
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(movie) => {
              this.setSelectedMovie(movie);
              console.log(selectedMovie)
            }}
          />
        ))}

      </div>
    );
  }
}