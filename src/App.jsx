import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Link, Navigate, } from "react-router-dom";
import './App.css'
import { MovieList } from './MovieList';
import { AddMovie } from './AddMovie';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { MovieDetails } from './MovieDetails';
import { NotFound } from './NotFound';
import { EditMovie } from './EditMovie';

function App() {

  const navigate = useNavigate();

  const [mode, setMode] = useState('light')

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper style={{ minHeight: '100vh', borderRadius: '0%' }} elevation={4}>
        <div className='App'>
          <AppBar position="static">
            <Toolbar>
              <Button onClick={() => navigate("/movie")} color="inherit">Movies</Button>
              <Button onClick={() => navigate("/movie/add")} color="inherit">Add Movies</Button>
              <Button
                sx={{ marginLeft: "auto" }}
                startIcon={mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                onClick={() => setMode(mode == 'light' ? 'dark' : 'light')}
                color="inherit">{mode == 'light' ? 'dark' : 'light'}mode</Button>
            </Toolbar>
          </AppBar>


          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/films" element={<Navigate replace to="/movie" />} />
            <Route path="/movie"
              element={<MovieList />} />
            <Route
              path="/movie/add"
              element={<AddMovie />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/movie/edit/:id" element={<EditMovie />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <br />
        </div>
      </Paper>
    </ThemeProvider >
  );
}
export default App;