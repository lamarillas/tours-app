import React, { useEffect, useState } from "react"
import Tours from "./components/Tours"
import Loading from "./components/Loading";

const url = 'https://course-api.com/react-tours-project';

function App() {

  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter( t => t.id !== id);
    setTours(newTours);
  }

  const fetchTours = async () => {

    setLoading(true);
    try {
      
      const result = await fetch(url);
      const tours = await result.json();
      // console.log(tours);
      setTours(tours);
      
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchTours();
  }, []);




  if(loading) {
    return <main>
      <Loading />
    </main>
  } 
    
  if(tours.length === 0) {
    return <main>
      <div className="title">
        <h2>no tours left</h2>
        <button className="btn" onClick={fetchTours}>Reload</button>
      </div>
    </main>
  }

  return <main>
    <Tours tours={tours} removeTour={removeTour}  />
  </main> 
}

export default App
