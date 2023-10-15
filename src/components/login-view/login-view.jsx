import { useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const validation = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username required.");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be 2 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password required.");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be 6 characters long");
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validation();
    const url = `https://movie-maniacs.herokuapp.com/login?Username=${username}&Password=${password}`;
    if (isReq) {
      axios
        .post(url)
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data.user, data.token);
        })
        .catch((e) => {
          console.log("no such user");
        });
    }
  };

  // login form with submit button
  return (
    // tells the login API to validate user and password
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
      <Row>
        <Col>
          Not a user? <Link to="/signup">Sign up here.</Link>
        </Col>
      </Row>
    </form>
  );
}
