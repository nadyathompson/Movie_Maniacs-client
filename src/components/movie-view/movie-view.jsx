export const MovieView = ({movie, onBackClick}) => {
    return(
        <div>
            <div>
                <img src={movie.ImageURL} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Year: </span>
                <span>{movie.year}</span>
            </div>            
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>

            <button onClick={onBackClick}>Back</button>
        </div>
    );
};