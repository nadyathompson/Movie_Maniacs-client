import { Row, Col } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({storedUser, user, favoriteMovies}) => {
  console.log(storedUser)
  return(
    <>
    
      <Row>
        <Col> User: </Col>
        <Col>{storedUser.Username}</Col>
      </Row> 
      <Row>
        <Col> Email: </Col>
        <Col>{storedUser.Email}</Col>
      </Row>
      <Row>
        <Col> Birthday: </Col>
        <Col>{storedUser.Birthday}</Col>
      </Row>
      <Row>
        <Col> Favorite Movies: </Col>
        <Col>{favoriteMovies.map((movie) => (
          <Col>
            <MovieCard movies={movies}/>
          </Col>
        ))}
        </Col>
      </Row>
    </>
  )
}