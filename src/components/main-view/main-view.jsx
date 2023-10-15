import axios from "axios";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavBar } from "../navbar/navbar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Button, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moviesCopy, setMoviesCopy] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      let filteredMovies = movies?.filter((item) => {
        return item.Title.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setMovies(filteredMovies);
    } else {
      setMovies(moviesCopy);
    }
  }, [searchQuery]);

  useEffect(() => {
    // set loading before sending API request
    setLoading(true);
    axios
      .get("https://movie-maniacs.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        setMovies(response.data);
        setMoviesCopy(response.data);
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
            setSearchQuery={setSearchQuery}
            onLoggedOut={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          ></NavBar>
        </Col>
      </Row>

      <Row className="justify-content-md-left">
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
                    <Row>
                      <Col>
                        <input
                          type="search"
                          style={{
                            padding: 10,
                            marginTop: 20,
                            marginBottom: 10,
                            width: "25%",
                            alignItems: "left",
                            justifyContent: "left",
                          }}
                          placeholder="Search movies"
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </Col>
                    </Row>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie._id} md={4}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          token={token}
                          setUser={setUser}
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
                    <SignupView
                      submitCallBack={() =>
                        console.log("set a register or whatever var")
                      }
                    />
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
                    movies={movies}
                    setUser={setUser}
                    token={token}
                    onLoggedOut={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
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
