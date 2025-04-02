import { useEffect, useState, PropsWithChildren } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";

const Access_Token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YWI2NTUxNzRmNThkNWM0MzgzZDJiMzQzZTM1NzMxNCIsIm5iZiI6MTc0MzE1MDY0NC4xMzUsInN1YiI6IjY3ZTY1ZTM0M2U2NWM4ZWE4OGJhM2EwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ys86E8XJOdTpg5ll351TU3CKG9veVwrbjMneJdAxIHg";

type Genre = {
    id: number;
    name: string;
}
type GenreContextType = {
    genres: Genre[]
}


const GenreContext = createContext<GenreContextType>({
    genres: []
})

export const GenreProvider = ({ children }: PropsWithChildren) => {
    const [genres, setGenres] = useState<Genre[]>([])
    useEffect(() => {
        const getGenres = async () => {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?language=en`, 
            {
                headers: {
                    Authorization: `Bearer ${Access_Token}`
                }
            }
            )
            setGenres(data.genres)
        }
        getGenres()
    }, [])
    return (
        <GenreContext.Provider value={{ genres }}>
            {children}</GenreContext.Provider>
    )
}

export const useGenres = () => useContext(GenreContext)

