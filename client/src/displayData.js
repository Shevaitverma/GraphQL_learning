import React, { useState } from 'react';
import { gql, useLazyQuery, useQuery } from "@apollo/client";

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            username
            age
            nationality
        }
    }
`;

const QUERY_ALL_MOVIE = gql`
    query GetAllMoives {
        movies {
            name
        }
    }
`;

const GET_MOVIES = gql`
    query Movie($name: String!){
        movie(name: $name){
            name
            yearOfPublication
        }
    }
`

function DisplayData() {
    const {error, loading, data} = useQuery(QUERY_ALL_USERS);
    const {data: Moviedata} = useQuery(QUERY_ALL_MOVIE);
    const [fetchMovie, {data:moiveSearchedData, error:movieError}] = useLazyQuery(GET_MOVIES);

    //states for the moive searching..
    const [movieSearched, setMovieSearched] = useState("");

    if(loading){
        return(<h2>data is loading...</h2>)
    }
    if(error){
        console.log(error);
    }
    if(data){
        console.log(data);
    }
    if(Moviedata){
        console.log(Moviedata);
    }
    if(movieError){
        console.log();
    }

    return (
    <div>
        <h1>List of data</h1> 
        {data && 
        data.users.map((user)=>{
            return(
                <div>
                    <h2>Name: {user.name}</h2>
                    <h2>Age: {user.age}</h2>
                    <h2>Username: {user.username}</h2>
                    <h2>Nationality: {user.nationality}</h2>
                </div>
            );
        })}

        {Moviedata && 
        Moviedata.movies.map((movie)=>{
            return <h1>Movie Name: {movie.name}</h1>
        })}

        <div>
            <input 
                type='text' 
                placeholder='Interstellar...' 
                onChange={(event)=>{
                    setMovieSearched(event.target.value);
                }} />
            <button onClick={()=>{
                fetchMovie({
                    variables:{
                        name: movieSearched,
                    },
                })
            }}>
                Fetch Data
            </button>
            <div>
                {moiveSearchedData && (
                    <div>
                        {" "}
                        <h1>Moive Name: {moiveSearchedData.movie.name}</h1>
                        {" "}
                        <h1>Year Of Publication: {moiveSearchedData.movie.yearOfPublication}</h1>
                    </div>
                )}
                {movieError && <h1>There was an error in fetching</h1>}
            </div>
        </div>

    </div>
    )
}

export default DisplayData