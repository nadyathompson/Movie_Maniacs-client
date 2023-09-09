import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";

export const MovieView = ({ user, token, setUser, movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    console.log(user);
    if (user.favoriteMovies && user.favoriteMovies.includes(movieId)) {
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
    <Card className="">
      {/* <Card.Img className="px-3 pt-3" src={movie.ImagePath} /> */}
      <Card.Body>
        <Card.Title className="">{movie.Title}</Card.Title>
        <Card.Text className="">Directed By: {movie.Director.Name}</Card.Text>
        <Card.Text className="">Description: {movie.Description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        {" "}
        {!favorite ? (
          <Button onClick={addFavorite}>Add to Favorites</Button>
        ) : (
          <Button onClick={deleteFavorite}>Remove from Favorites</Button>
        )}
      </Card.Footer>
      <Link to={"/"}>
        <Button>Back</Button>
      </Link>
    </Card>
  );
};
