import axios from "axios";
import { Row, Col } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";
import { useEffect, useState } from "react";

export const ProfileView = ({ storedUser, user, favoriteMovies }) => {
  const [user, setUser] = useState();
  const [updatedUser, setUpdatedUser] = useState();
  console.log(storedUser);

  useEffect(() => {
    console.log("user", user);
    console.log("updated user", updatedUser);
  });

  useEffect(() => {
    /*const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
    };*/

    const url = `https://movie-maniacs.herokuapp.com/users/${user.Username}`;
    axios
      .put(url, {
        body: JSON.stringify(data),
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Update failed.");
        }
      })
      .then((data) => {
        setUser(data.user);
        setUpdatedUser(data.user);
        //console.log(user);
      });
  });

  return (
    <>
      <Row>
        <Col> User: </Col>
        <input type="text" value={storedUser.Username} />
      </Row>
      <Row>
        <Col> Email: </Col>
        <input
          type="text"
          value={updatedUser.Email}
          onChange={(e) => {
            setUpdatedUser({
              ...updatedUser,
              Email: e.target.value,
            });
          }}
        />
      </Row>
      <Row>
        <Col> Birthday: </Col>
        <input type="text" value={storedUser.Birthday} />
      </Row>
      <Row>
        <Col> Favorite Movies: </Col>
        <Col>
          {favoriteMovies.map((movie) => (
            <Col>
              <MovieCard movies={movies} />
            </Col>
          ))}
        </Col>
      </Row>
    </>
  );
};
