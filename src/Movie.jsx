import { useState } from 'react';
import { Counter } from './Counter';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export function Movie({ movie, id, deleteButton, editButton }) {
    const styles = {
        color: movie.rating >= 8.5 ? "green" : "red",
    };

    const [show, setShow] = useState(true);

    const navigate = useNavigate();

    return (
        <Card>
            <div className='movie-container'>
                <img src={movie.poster} alt={movie.name} className='movie-poster' />
                <CardContent>
                    <div className="movie-specs">
                        <h2 className='movie-name'>{movie.name}
                            <IconButton onClick={() => setShow(!show)} aria-label="Toggle Summary" color='primary'>
                                {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                            <IconButton
                                onClick={() => navigate(`/movie/${id}`)}
                                // onClick={() => navigate('/movie/' + id)}
                                aria-label="Toggle Summary" color='primary'>
                                <InfoIcon />
                            </IconButton>
                        </h2>

                        <p style={styles} className="rating">⭐{movie.rating}</p>
                    </div>
                    {show ? <p className='movie-summary'>{movie.summary}</p> : null}
                </CardContent>
                <CardActions>
                    <Counter />
                    {editButton}
                    {deleteButton}
                </CardActions>
            </div>
        </Card>
    );
}
