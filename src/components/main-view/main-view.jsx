//what is wrong with my code
//updated 8.2.23
//nothing :)

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
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  let favoriteMovies = movies.filter((m) =>
    user?.FavoriteMovies.includes(m._id)
  );

  console.log(user);

  console.log(sessionStorage);
  useEffect(() => {
    // set loading before sending API request
    setLoading(true);
    console.log(token);
    axios
      .get("https://movie-maniacs.herokuapp.com/movies", {
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
  }, [token]);

  return (
    <BrowserRouter>
      <Row>
        <Col>
          <NavBar
            user={user}
            token={token}
            onLoggedOut={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          ></NavBar>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
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
                        <MovieCard movie={movie} />
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
                  <Navigate to="/" />
                ) : (
                  <Col md={4}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={4}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/users"
            element={
              <>
                {user ? (
                  <ProfileView
                    storedUser={storedUser}
                    user={user}
                    favoriteMovies={favoriteMovies}
                  />
                ) : (
                  <Col md={4}>
                    <Navigate to="/login" />
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
