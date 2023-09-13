const {UserList, MovieList} = require("../data");
const _ = require("lodash");

const resolvers = {
    Query:{
        // using normal function..
        // user resolvers
        users() {
            return UserList;
        },
        //using arrow function..
        user: (parent, args) => {
            const id = args.id;
            const user = _.find(UserList, { id: Number(id) });
            return user;
        },
        // moive resolvers
        movies: () =>{
            return MovieList;
        },
        movie: (parent, args) =>{
            const name = args.name;
            const movie = _.find(MovieList, { name });
            return movie;
        }
    },
    User: {
        favoriteMovies: () =>{
            return _.filter(MovieList, 
                (movie)=> 
                movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010)
        }
    }
};

module.exports = {resolvers};