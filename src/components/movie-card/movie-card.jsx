import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import "./movie-card.scss";

export const MovieCard = ({movie}) => {
    return (
        <Link to={`/movies/${movie._id}`} className="movie-card">
            <Card className="">
                <Card.Img className="px-3 pt-3" src={movie.ImagePath}/>
                <Card.Body>
                    <Card.Title className="">{movie.Title}</Card.Title>
                    <Card.Text className="">{movie.Genre.Name}</Card.Text>
                    <Card.Text className="">Directed By: {movie.Director.Name}</Card.Text>
                </Card.Body>
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