import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";

export const MovieCard = ({movie, onMovieClick}) => {
    return (
        <Card
          onClick={() => {
            onMovieClick(movie);
          }}
          style={{ cursor: "pointer" }}
        >
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Title>{movie.Title}</Card.Title>
      <Card.Body> {movie.Description} </Card.Body>
      <Button
        onClick={() => {
          onMovieClick(movie);
        }}
      > See More </Button>
      </Card> 
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
      //Genre: PropTypes.arrayOf(PropTypes.string).isRequired,
      Featured: PropTypes.bool.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
  };