import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-1fcec-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
      // console.log("Title : "+movie.title);
      // console.log("Opening Text : "+movie.openingText);
      // console.log("Release Date : "+movie.releaseDate);

    const response = await fetch('https://react-http-1fcec-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;

// import React, { useState, useEffect, useCallback } from 'react';

// import MoviesList from './components/MoviesList';
// import AddMovie from './components/AddMovie';
// import './App.css';

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchMoviesHandler = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('https://react-http-1fcec-default-rtdb.firebaseio.com/movies/json');
//       if (!response.ok) {
//         throw new Error('Something went wrong!');
//       }

//       const data = await response.json();

//       const transformedMovies = data.results.map((movieData) => {
//         return {
//           id: movieData.episode_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseDate: movieData.release_date,
//         };
//       });
//       setMovies(transformedMovies);
//     } catch (error) {
//       setError(error.message);
//     }
//     setIsLoading(false);
//   }, []);

//   useEffect(() => {
//     fetchMoviesHandler();
//   }, [fetchMoviesHandler]);

//   async function addMovieHandler(movie) {

//    const response = await fetch("https://react-http-1fcec-default-rtdb.firebaseio.com/movies/json",{
//       method: "POST",
//       body: JSON.stringify(movie),
//       headers: {
//         "Constant_Type" : "application/json"
//       }
//     });
//     const data = await response.json();
//     console.log(data);
//   }

//   let content = <p>Found no movies.</p>;

//   if (movies.length > 0) {
//     content = <MoviesList movies={movies} />;
//   }

//   if (error) {
//     content = <p>{error}</p>;
//   }

//   if (isLoading) {
//     content = <p>Loading...</p>;
//   }

//   return (
//     <React.Fragment>
//       <section>
//         <AddMovie onAddMovie={addMovieHandler} />
//       </section>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>{content}</section>
//     </React.Fragment>
//   );
// }

// export default App;




// import React, { useState, useCallback, useEffect } from 'react';
// import MoviesList from './components/MoviesList';
// import './App.css';

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

  
//   async function fetchMoviesHandler(){
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('https://swapi.dev/api/films/');
//       if (!response.ok) {
//         throw new Error('Something went wrong!');
//       }

//       const data = await response.json();

//       const transformedMovies = data.results.map((movieData) => {
//         return {
//           id: movieData.episode_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseDate: movieData.release_date,
//         };
//       });
//       setMovies(transformedMovies);
//     } catch (error) {
//       setError(error.message);
//     }
//     setIsLoading(false);
//   };

//   let content = <p>Found no movies.</p>;

//   if (movies.length > 0) {
//     content = <MoviesList movies={movies} />;
//   }

//   if (error) {
//     content = <p>{error}</p>;
//   }

//   if (isLoading) {
//     content = <p>Loading...</p>;
//   }


   
//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>{content}</section>
//     </React.Fragment>
//   );
// }

// export default App;


// // import React, {useState} from 'react';

// // import MoviesList from './components/MoviesList';
// // import './App.css';

// // function App() {

// //     const [movies, setMovies] = useState([]);
// //     const [isLoading, setIsLoading] = useState(false);

// //    async function fetchMoviesHandler(){
// //     setIsLoading(true);
// //      const response = await fetch("https://swapi.dev/api/film")
// //        const data = await response.json();
  
// //          const transformedMovies = data.results.map( movieData => {
// //             return {
// //               id : movieData.episode_id,
// //               title : movieData.title,
// //               openingText : movieData.opening_crawl,
// //               releaseDate : movieData.release_date
// //             };
// //           });
// //           setMovies(transformedMovies)
// //           setIsLoading(false);
// //     }

// //   return (
// //     <React.Fragment>
// //       <section>
// //         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
// //       </section>
// //       <section>
// //       {/* <MoviesList movies={movies} /> */}
// //       {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
// //       {!isLoading && movies.length === 0 && <p>No Movies Found</p>}
// //       {isLoading && <p>Loading...</p>}
// //       </section>
// //     </React.Fragment>
// //   );
// // }

// // export default App;



// // // const dummyMovies = [
// // //   {
// // //     id: 1,
// // //     title: 'Some Dummy Movie',
// // //     openingText: 'This is the opening text of the movie',
// // //     releaseDate: '2021-05-18',
// // //   },
// // //   {
// // //     id: 2,
// // //     title: 'Some Dummy Movie 2',
// // //     openingText: 'This is the second opening text of the movie',
// // //     releaseDate: '2021-05-19',
// // //   },
// // // ];