import PropTypes from "prop-types";

export const MovieCard = ({movie, onMovieClick}) => {
    return (
        <div onClick={() => {
            onMovieClick(movie);
            }}>
            {movie.Title}
        </div>
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