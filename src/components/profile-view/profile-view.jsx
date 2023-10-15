import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { ModalHeader } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, setUser, token, onLoggedOut }) => {
  const [Username, setUsername] = useState(user.Username);
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState(user.Email);
  const [Birthday, setBirthday] = useState(user.Birthday);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const favoriteMovies = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie._id);
  });

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

  const deleteUser = () => {
    const url = `https://movie-maniacs.herokuapp.com/users/${user.Username}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("User deleted");
        onLoggedOut();
      } else {
        alert("Error :( ");
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
        <Row>
          {favoriteMovies.map((movie) => (
            <Col xs={12} sm={6} md={4} lg={3} key={movie._id}>
              <MovieCard
                movie={movie}
                user={user}
                setUser={setUser}
                token={token}
              />
            </Col>
          ))}
        </Row>
      </Row>
      <Row style={{ padding: 10, marginTop: 40, marginBottom: 20 }}>
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
          <Button style={{ marginTop: 10, marginBottom: 10 }} type="submit">
            Update
          </Button>
        </Form>
      </Row>
      <Button
        style={{ marginBottom: 20 }}
        variant="primary"
        onClick={handleShowModal}
      >
        Delete my account
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account permanantly?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteUser}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
