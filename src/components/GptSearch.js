import { BG_IMG_URL } from "../utils/constant"
import GptMovieSuggestion from "./GptMovieSuggestion"
import GptSearchBar from "./GptSearchBar"

const GptSearch = () => {
  return (
    <>
    <div className='fixed -z-10'>
            <img className="opacity-80 h-screen object-cover md:h-auto"
             src={BG_IMG_URL}
                  alt='img'/>
        </div>
    <div className="">
        <GptSearchBar />
        <GptMovieSuggestion />
    </div>
    </>
  )
}

export default GptSearch