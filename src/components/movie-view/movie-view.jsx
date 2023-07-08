import Button from "react-bootstrap/Button";

export const MovieView = ({movie, onBackClick}) => {
    return(
        <div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>            
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>

            <Button onClick={onBackClick}>Back</Button>
        </div>
    );
};