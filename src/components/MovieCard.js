import { IMG_URL } from "../utils/constant"
import OpenMovieCard from "./OpenMovieCard";
import { useState } from "react";

const MovieCard = ({posterPath}) => {

    const [isOpen , setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(true)
    }

    if(!posterPath) return null;
    return(
        <div className="w-36 md:w-48 pr-4" onClick={handleClick}>
            <img alt="movie card" src={IMG_URL + posterPath}></img>
            {isOpen && <OpenMovieCard />}
        </div>
    )
}

export default MovieCard