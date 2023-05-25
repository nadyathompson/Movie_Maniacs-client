/*import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState ([
        {
            id: 1,
            Title: 'John Wick',
            Description: 'A legendary hitman is forced out of retirement to seek revenge against the men who killed his puppy, a final gift from his recently deceased wife.',
            Genre: 'Action',
            Director: 'Chad Staelski',
            ImageURL: 'johnwick.png',
            Year: '2014'
        },
        {
            id: 2,
            Title: 'The Nightmare Before Christmas',
            Description: 'Jack Skellington, the King of Halloween Town, stumbles upon Christmas Town and schemes to take over the holiday.',
            Genre: 'Animated',
            Director: 'Henry Selick',
            ImageURL: 'thenightmarebeforechristmas.png',
            Year: '1993'
        },
        {
            id: 3,
            Title: 'Legally Blonde',
            Description: 'Elle Woods, a fashionable sorority queen, is dumped by her boyfriend. She decides to follow him to law school. While she is there, she figures out that there is more to her than just looks.',
            Genre: 'Romantic Comedy',
            Director: 'Jonathan Luketic',
            ImageURL: 'legallyblonde.png',
            Year: '2001'
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};*/
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
        id: 1,
        Title: 'John Wick',
        Description: 'A legendary hitman is forced out of retirement to seek revenge against the men who killed his puppy, a final gift from his recently deceased wife.',
        Genre: 'Action',
        Director: 'Chad Staelski',
        ImageURL: 'johnwick.png',
        Year: '2014'
    },
    {
        id: 2,
        Title: 'The Nightmare Before Christmas',
        Description: 'Jack Skellington, the King of Halloween Town, stumbles upon Christmas Town and schemes to take over the holiday.',
        Genre: 'Animated',
        Director: 'Henry Selick',
        ImageURL: 'thenightmarebeforechristmas.png',
        Year: '1993'
    },
    {
        id: 3,
        Title: 'Legally Blonde',
        Description: 'Elle Woods, a fashionable sorority queen, is dumped by her boyfriend. She decides to follow him to law school. While she is there, she figures out that there is more to her than just looks.',
        Genre: 'Romantic Comedy',
        Director: 'Jonathan Luketic',
        ImageURL: 'legallyblonde.png',
        Year: '2001'
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
