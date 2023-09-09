import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Row, Col, Button } from "react-bootstrap";

import "./movie-card.scss";

export const MovieCard = ({ movie, user, token, setUser }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
      setFavorite(true);
    }
  }, []);

  addFavorite = () => {
    const url = `https://movie-maniacs.herokuapp.com/users/${user.Username}/movies/${movie._id}`;
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((res) => {
        setFavorite(true);
        setUser(res);
        localStorage.setItem("userObject", JSON.stringify(res));
        alert("Movie added to favorites!");
      });
  };

  deleteFavorite = () => {
    const url = `https://movie-maniacs.herokuapp.com/users/${user.Username}/movies/${movie._id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((res) => {
        setFavorite(false);
        setUser(res);
        localStorage.setItem("userObject", JSON.stringify(res));
        alert("Movie removed from favorites.");
      });
  };

  return (
    <Link to={`/movies/${movie._id}`} className="movie-card">
      <Card className="">
        <Card.Img className="px-3 pt-3" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="">{movie.Title}</Card.Title>
          <Card.Text className="">{movie.Genre.Name}</Card.Text>
          <Card.Text className="">Directed By: {movie.Director.Name}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {" "}
          {!favorite ? (
            <Button onClick={addFavorite}>Add to Favorites</Button>
          ) : (
            <Button onClick={deleteFavorite}>Remove from Favorites</Button>
          )}
        </Card.Footer>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.object.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.object.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
};
