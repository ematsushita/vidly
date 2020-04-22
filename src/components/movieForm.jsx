import React from 'react';


const MovieForm = ({ match, history}) => {
  return ( 
    <>
      <h1>Movie Form {match.params.id}</h1>
      <button onClick={() => history.push("/movies")}className="btn btn-primary">Save</button>
    </>
   );
}
 
export default MovieForm;