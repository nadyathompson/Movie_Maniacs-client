import axios from "axios";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; 
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavBar } from "../navbar/navbar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  
  const storedUser = localStorage.getItem("user") || null;
  const storedToken = localStorage.getItem("token") || null;
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  //const [selectedMovie, setSelectedMovie] = useState(null);
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
  <BrowserRouter>
    <Row className='justify-content-md-center'>
      <Routes>

        <Route
          path="/"
          element={
            <>
            {!user ? (
              <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
              <Col>This list is empty!</Col>
            ) : (
              <>
              {movies.map((movie) => (
                <Col className="mb-5" key={movie._id} md={4}>
                  <MovieCard movie={movie} 
                  />
                </Col>
              ))}
              </>
            )}
            </>
          }
        />

        <Route
          path="/movies/:movieId"
          element={
            <>
            {!user ? (
              <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
              <Col>This list is empty!</Col>
            ) : (
              <Col md={4} style={{ border: "1px solid black" }}>
                <MovieView
                  movies={movies}
                  user={user}
                  setUser={setUser}
                  token={token}
                />
              </Col>
            )}
            </>
          }
        />


        <Route
          path="/login"
          element={
            <>
             {user ? (
              <Navigate to="/"/>
             ) : (
              <Col md={4}>
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}/>
              </Col>
             )} 
            </>
          }
        />

        <Route
          path="/signup"
          element={
            <>
            { user ? (
              <Navigate to="/" />
            ) : (
              <Col md={4}>
                  <SignupView />
              </Col>
            )}
            </>
          }
        />


      </Routes>
    </Row>
  </BrowserRouter>
  );
};