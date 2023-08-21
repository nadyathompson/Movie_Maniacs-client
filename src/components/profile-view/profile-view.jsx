import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";

import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, setUser, token, favoriteMovies }) => {
  const [Username, setUsername] = useState(user.Username);
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState(user.Email);
  const [Birthday, setBirthday] = useState(user.Birthday);

  console.log("data", { user });

  const updateUser = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Email: Email,
      Birthday: Birthday,
    };

    if (Password) {
      data.Password = Password;
    }

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
          console.log("user", user);
          return response.json();
        } else {
          alert("Error :( ");
        }
      })
      .then((data) => {
        if (user) {
          alert("Update successful!");
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        } else {
          alert("Update failed.");
        }
      });
  };

  return (
    <>
      <Row>
        <Col> User: </Col>
        <Col>{user?.Username}</Col>
      </Row>
      <Row>
        <Col> Email: </Col>
        <Col>{user?.Email}</Col>
      </Row>
      <Row>
        <Col> Birthday: </Col>
        <Col>{user?.Birthday}</Col>
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
        <Form onSubmit={updateUser}>
          <Form.Group controlId="updateUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="updatePassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </Form.Group>
          <Form.Group controlId="updateEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="updateBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={Birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>

        {/* <Row>
          <Col> Email: </Col>
          <input
            type="text"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Row>
        <Row>
          <Col> Birthday: </Col>
          <input
            type="text"
            value={Birthday}
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
          />
        </Row> */}

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
