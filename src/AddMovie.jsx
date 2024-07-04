import { useNavigate } from 'react-router-dom';
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

export function AddMovie() {

    const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
        useFormik({
            initialValues: {
                name: "",
                poster: "",
                rating: "",
                summary: "",
                trailer: "",
            },
            validationSchema: movieValidationSchema,
            onSubmit: (newMovie) => {
                addMovie(newMovie);
            }
        })

    const addMovie = (newMovie) => {
        fetch("https://667d34b6297972455f640549.mockapi.io/movies", {
            method: "POST",
            body: JSON.stringify(newMovie),
            headers: { "Content-type": "application/json" },
        }).then(() => navigate('/movie'));
    };

    const navigate = useNavigate();

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
            <Button
                type='submit' variant="contained">Add Movie</Button>
        </form>
    );
}
