import { Row, Col } from "react-bootstrap";
//import { Form } from "react-bootstrap";
//import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
//import { setUser } from "../main-view/main-view";

export const ProfileView = ({ storedUser, user, token, favoriteMovies }) => {
  const [Username, setUsername] = useState(user.Username);
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState(user.Email);
  const [Birthday, setBirthday] = useState(user.Birthday);
  const [pUser, setpUser] = useState();
  const [updatedUser, setUpdatedUser] = useState();

  //let pUser = user;
  //let setpUser = useState();

  useEffect(() => {
    console.log("user", user);
    console.log("updated user", updatedUser);
  });

  useEffect(() => {
    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
    };

    const url = `https://movie-maniacs.herokuapp.com/users/${user.Username}`;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Update failed.");
        }
      })
      .then((data) => {
        setpUser(data.user);
        setUpdatedUser(data.user);
      });
  });

  return (
    <>
      <Row>
        <Col> User: </Col>
        <Col>{pUser.Username}</Col>
      </Row>
      <Row>
        <Col> Email: </Col>
        <Col>{pUser.Email}</Col>
      </Row>
      <Row>
        <Col> Birthday: </Col>
        <Col>{pUser.Birthday}</Col>
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
      <br />
      <Row>
        <p>Update your information here:</p>
        <Row>
          <Col> User: </Col>
          <input type="text" value={pUser.Username} />
        </Row>
        <Row>
          <Col> Email: </Col>
          <input
            type="text"
            value={pUser.Email}
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
          <input type="text" value={pUser.Birthday} />
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
      </Row>
    </>
  );
};
