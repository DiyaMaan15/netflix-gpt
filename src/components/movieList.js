import MovieCard from "./MovieCard"

const MovieList = ({title , movies}) => {
    console.log('Movies:', movies); 
  if (!movies || movies.length === 0) {
    return <div>No movies available</div>;
  }

  console.log('First movie poster_path:', movies[0].poster_path)
    return (  
        <div className="px-6">  
            <h1 className="text-lg md:text-3xl py-4 text-white">
                {title}
            </h1>
            <div className="flex overflow-x-scroll">
                <div className="flex">
                    {movies.map((movie) => (
                       movies[0].poster_path && <MovieCard key={movie.id} posterPath={movie.poster_path} />
                    ))}
                </div>           
            </div>
        </div>
    )
}

export default MovieList