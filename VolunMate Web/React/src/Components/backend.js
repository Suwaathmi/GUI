import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:5000/data')
      .then(response => {
        setData(response.data); // Set the data from MySQL to the state
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div>
      <h1>Data from MySQL Database</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>  {/* Adjust based on your database structure */}
        ))}
      </ul>
    </div>
  );
}

export default App;
