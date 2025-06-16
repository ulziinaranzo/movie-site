"use client";
import { useEffect, useState, PropsWithChildren, createContext } from "react";
import { useContext } from "react";
import axios from "axios";

type Genre = {
  id: number;
  name: string;
};

type GenreContextType = {
  genres: Genre[];
};

const GenreContext = createContext<GenreContextType>({
  genres: [],
});

export const GenreProvider = ({ children }: PropsWithChildren<{}>) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${process.env.Access_Token}`,
          },
        }
      );
      setGenres(data.genres);
    };
    getGenres();
  }, []);

  return (
    <GenreContext.Provider value={{ genres }}>{children}</GenreContext.Provider>
  );
};

export const useGenres = () => useContext(GenreContext);
