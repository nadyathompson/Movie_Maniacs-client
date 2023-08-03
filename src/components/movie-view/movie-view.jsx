import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const MovieView = ({user, storedUser, movies}) => {
    const {movieId} = useParams();
    const movie = movies.find((m) => m._id === movieId);
    console.log(movies)
    console.log(storedUser)
    console.log(user)
    // console.log(token)

    return(
        <div>
            <div>
                <span>Title:</span>
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

            <Link to={"/"}>
                <Button>Back</Button>
            </Link>
        </div>
    );
};