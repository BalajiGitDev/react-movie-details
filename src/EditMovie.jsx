import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from "yup";

const movieValidationSchema = yup.object({
    name: yup
        .string()
        .required("Enter the movie Name"),
    poster: yup
        .string()
        .required("Enter an valid movie poster URL")
        .min(4, "URL should be longer")
        .url(),
    rating: yup
        .number()
        .required("Enter the rating of the movie")
        .min(0)
        .max(10),
    summary: yup
        .string()
        .required("Enter the summary of the movie")
        .min(20, "Enter a Brief and Detailed Summary"),
    trailer: yup
        .string()
        .required("Enter the valid trailer for the movie")
        .min(4, "URL should be longer")
        .url(),
});

export function EditMovie() {

    const { id } = useParams();

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`https://667d34b6297972455f640549.mockapi.io/movies/${id}`, {
            method: "GET",
        })
            .then((data) => data.json())
            .then((mv) => setMovie(mv))
    })

    return (
        <div>
            {movie ? <EditMovieForm movie={movie} /> : "Loading..."}
        </div>
    )
}

function EditMovieForm({ movie }) {

    const navigate = useNavigate();

    const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
        useFormik({
            initialValues: {
                name: movie.name,
                poster: movie.poster,
                rating: movie.rating,
                summary: movie.summary,
                trailer: movie.trailer,
            },
            validationSchema: movieValidationSchema,
            onSubmit: (updatedMovie) => {
                editMovie(updatedMovie);
            }
        })

    const editMovie = (updatedMovie) => {
        fetch(`https://667d34b6297972455f640549.mockapi.io/movies/${movie.id}`, {
            method: "PUT",
            body: JSON.stringify(updatedMovie),
            headers: { "Content-type": "application/json" },
        }).then(() => navigate('/movie'));
    };

    return (
        <form onSubmit={handleSubmit} className='add-movie-form'>
            <TextField
                label="Name"
                variant="outlined"
                value={values.name}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                helperText={touched.name && errors.name ? errors.name : null} />
            <TextField
                label="Poster"
                variant="outlined"
                value={values.poster}
                name="poster"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.poster && errors.poster}
                helperText={touched.poster && errors.poster ? errors.poster : null} />
            <TextField
                label="Rating"
                variant="outlined"
                value={values.rating}
                name="rating"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.rating && errors.rating}
                helperText={touched.rating && errors.rating ? errors.rating : null} />
            <TextField
                label="Summary"
                variant="outlined"
                value={values.summary}
                name="summary"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.summary && errors.summary}
                helperText={touched.summary && errors.summary ? errors.summary : null} />
            <TextField
                label="Trailer"
                variant="outlined"
                value={values.trailer}
                name="trailer"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.trailer && errors.trailer}
                helperText={touched.trailer && errors.trailer ? errors.trailer : null} />
            <Button color='success'
                type='submit' variant="contained">Save Changes</Button>
        </form>
    );
}
