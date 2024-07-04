import { Movie } from './Movie';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function MovieList() {
    const [movieList, setMovieList] = useState([]);

    const getMovies = () => {
        fetch('https://667d34b6297972455f640549.mockapi.io/movies', {
            method: "GET",
        })
            .then((data) => data.json())
            .then((mvs) => setMovieList(mvs));
    };


    useEffect(() => getMovies(), []);

    const deleteMovie = (id) => {
        fetch(`https://667d34b6297972455f640549.mockapi.io/movies/${id}`, {
            method: "DELETE",
        })
            .then((data) => getMovies());
    };

    const navigate = useNavigate();


    return (
        // <div className='movie-list'>
        //     {movieList.map((mv, index) => (
        //         <Movie key={index} movie={mv} />))}
        // </div>
        <div>
            <div className='movie-list'>
                {movieList.map((mv) => (
                    <div key={mv.id}>
                        <Movie movie={mv} id={mv.id}
                            deleteButton={<IconButton
                                color='error'
                                sx={{ marginLeft: "auto" }}
                                onClick={() => deleteMovie(mv.id)}
                                aria-label="delete">
                                <DeleteIcon />
                            </IconButton>}
                            editButton={<IconButton
                                color='primary'
                                style={{ marginLeft: "auto" }}
                                onClick={() => navigate(`/movie/edit/${mv.id}`)}
                                aria-label="delete">
                                <EditIcon />
                            </IconButton>} />
                    </div>
                ))}
            </div>
        </div>
    );
}