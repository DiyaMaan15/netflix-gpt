import { useSelector } from "react-redux"
import MovieList from "./movieList"

const GptMovieSuggestion = () => {

  const {movieResult , movieName} = useSelector((store) => store.gpt)
  if(!movieName) return null

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-80">
      <div>
        {movieName.map((movieName , index) => <MovieList key={movieName} title={movieName} movies={movieResult[index]} />)}
      </div>
    </div>
  )
}

export default GptMovieSuggestion