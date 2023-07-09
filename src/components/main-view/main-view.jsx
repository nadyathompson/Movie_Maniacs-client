import axios from "axios";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; 
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  
  const storedUser = localStorage.getItem("user") || null;
  const storedToken = localStorage.getItem("token") || null;
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(sessionStorage);
  useEffect(() => {
    // set loading before sending API request
    setLoading(true);
    console.log(token)
      axios
        .get('https://movie-maniacs.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // Assign the result to the state
          setMovies(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
  }, [token]) 

return (
  <Row className='justify-content-md-center'>
    {!user ? (
      <Col md={4}>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </Col>
    ) : selectedMovie ? (
      <Col md={8}>
        <MovieView 
          movie={selectedMovie} 
          onBackClick={() => setSelectedMovie(null)} 
        />
      </Col>
    ) : movies.length === 0 ? (
      <div>The list is empty!</div>
    ) : (
      <>
        {movies.map((movie) => (
          <Col 
            key={movie.id} 
            md={3}
            className='mb-4'>
            <MovieCard 
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ))}
        <Button 
          onClick={() => { 
            setUser(null); 
            setToken(null); 
            localStorage.clear(); 
            }}>
          Logout
        </Button>
      </>  
  )}
  </Row>
);
};