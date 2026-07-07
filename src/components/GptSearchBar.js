import { useDispatch, useSelector } from "react-redux"
import lang from "../utils/languageConstants"
import { useRef } from "react"
import openai from "../utils/openai"
import { API_OPTIONS } from "../utils/constant"
import { addGptMovies } from "../utils/gptSlice"

const GptSearchBar = () => {

  const dispatch = useDispatch();

  const langkey = useSelector((store) => store.config.lang)

  const searchText = useRef(null)

  const searchMovieTmdb = async(movie) => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+
                        movie + 
                        "&include_adult=false&language=en-US&page=1" , API_OPTIONS)
    const json = await data.json()

    return json.results;
  }

  const handleGptSearchClick = async () => {

    const gptQuery = "Act as a movie reccomendation system and suggest some movies for the query: " +
    searchText.current.value + 
    ". Only give me name of five movies, comma separated like the example given ahead. Example - golmal, koi mil gya, kuch kuch hota hai, vivah."

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

     console.log(gptResults?.choices?.[0]?.message?.content)

     const gptMovies = gptResults?.choices?.[0]?.message?.content.split(",")

     const promiseArray = gptMovies.map((movie) => searchMovieTmdb(movie));

     const tmdbResults = await Promise.all(promiseArray)
     console.log(tmdbResults)

     dispatch(addGptMovies({movieName: gptMovies , movieResult: tmdbResults}))
  }

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center">
        <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
            <input
            ref={searchText}
             type="text"
             className="p-4 m-4 col-span-9"
             placeholder={lang[langkey].gptSearchPlaceHolder}
            />
            <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}>
                {lang[langkey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar