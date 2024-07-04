import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

export function MovieDetails() {
    const { id } = useParams();

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetch(`https://667d34b6297972455f640549.mockapi.io/movies/${id}`, {
            method: "GET",
        })
            .then((data) => data.json())
            .then((mv) => setMovie(mv))
    })

    const styles = { color: movie.rating >= 8.5 ? "green" : "red" };

    const back = useNavigate();

    return (
        <div>
            <iframe width="100%"
                height="800px"
                src={movie.trailer}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen>
            </iframe>
            <div className="movie-detail-container">
                <div className='movie-specs'>
                    <h2 className='movie-name'>{movie.name}</h2>
                    <p style={styles} className="rating">⭐{movie.rating}</p>
                </div>
                <p className="movie-summary">{movie.summary}</p>
                <br />
                <Button
                    onClick={() => back(-1)}
                    startIcon={<ArrowBackIcon />}
                    variant="contained">Back</Button>
            </div>
        </div>
    );
}
