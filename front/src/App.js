import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  useEffect(() =>{
    axios.get('/axios')
      .then(res => {
        console.log("受け取った------", res)
        setMessage(res.data)
      })
  },[])
  console.log("message this is", message)
  
  return (
    <div className="App">
      <h1>フロントエンド</h1>
      <p>{ message[0] } </p>
      <p>{ message[1] } </p>
    </div>
  );
}

export default App;