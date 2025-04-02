import { useSearchParams } from "next/navigation"
import { useEffect } from "react";

const SearchPage = () => {
    const SearchParams = useSearchParams();
    const genre = SearchParams.get("genre")

    const { genres } = useGenres();

    const [movies, setMovies] = useState<Movie[]>([]);
    
    useEffect(() => {
        const getMovies = async () => {

            const { data } = await axios.get(``)
        }
    })
}