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
        ImageURL: 'https://images-0.rakuten.tv/storage/global-movie/translation/artwork/86adb0df-9ac3-4c53-acfb-16cb9681a8af-john-wick-1611474494-width317-quality60.jpeg',
        Year: '2014'
    },
    {
        id: 2,
        Title: 'The Nightmare Before Christmas',
        Description: 'Jack Skellington, the King of Halloween Town, stumbles upon Christmas Town and schemes to take over the holiday.',
        Genre: 'Animated',
        Director: 'Henry Selick',
        ImageURL: 'https://www.cinema.de/sites/default/files/styles/cin_portrait_250/public/sync/cms3.cinema.de/imgdb/import/dreams2/1000/924/3/1000924383.jpg?h=2b50d7f8&itok=_5OyvzkG',
        Year: '1993'
    },
    {
        id: 3,
        Title: 'Legally Blonde',
        Description: 'Elle Woods, a fashionable sorority queen, is dumped by her boyfriend. She decides to follow him to law school. While she is there, she figures out that there is more to her than just looks.',
        Genre: 'Romantic Comedy',
        Director: 'Jonathan Luketic',
        ImageURL: 'https://s3.amazonaws.com/static.rogerebert.com/uploads/movie/movie_poster/legally-blonde-2001/large_1gAnkZNAd3HqgWL7aqSOQFwt7D1.jpg',
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
