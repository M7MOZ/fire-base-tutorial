import { useState } from "react";
import Login from "./components/login";
import { db, auth, storage } from "./config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { ref, uploadBytes } from "firebase/storage";
function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(0);
  const [actor, setActor] = useState("");
  const [actors, setActors] = useState([]);
  const [hasOscar, setHasOscar] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");
  const getMovies = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filterdData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovies(filterdData);
    } catch (error) {
      console.error(error);
    }
  };
  const addActor = () => {
    setActors([...actors, actor]);
    setActor("");
  };
  const onUpdateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {
      title: title,
      
    });
  }
  const onDeleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };
  const onAddMovie = async (e) => {
    e.preventDefault;
    try {
      await addDoc(moviesCollectionRef, {
        title: title,
        year: year,
        actors: actors,
        hasOscar: hasOscar,
        uid: auth?.currentUser?.uid,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const onUploadFile = async () => {
    const storageRef = ref(storage, "7oza/" + fileUpload.name);
    await uploadBytes(storageRef, fileUpload);
  }
  useEffect(() => {
    getMovies();
  }, [onDeleteMovie, onAddMovie]);
  return (
    <div>
      <Login />
      <div>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="release year"
          onChange={(e) => setYear(e.target.value)}
        />
        <div>
          <input
            type="text"
            placeholder="actors"
            value={actor}
            onChange={(e) => setActor(e.target.value)}
          />
          <button onClick={addActor}>add actor</button>
        </div>
        <input
          type="checkbox"
          value={hasOscar}
          onChange={(e) => setHasOscar(e.target.checked)}
        />
        <label>Has Oscar</label>
        <button onClick={onAddMovie}>add movie</button>
        <input type="file" onChange={(e) => setFileUpload(e.target.files)} />
        <button onClick={onUploadFile}>upload file</button>
      </div>
      <div style={{ display: "flex", gap: "30px" }}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2 style={{ color: `${movie.hasOscar ? "green" : "black"}` }}>
              {movie.title}
            </h2>
            <p>{movie.year}</p>
            {movie.actors.map((actor, i) => (
              <p key={i}>{actor}</p>
            ))}
            <button onClick={() => onDeleteMovie(movie.id)}>delete movie</button>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
            <button onClick={() => onUpdateMovie(movie.id)}>update title</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
