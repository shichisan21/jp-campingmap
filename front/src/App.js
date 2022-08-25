import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

// MUIパーツ読み込み
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App() {
  const [message, setMessage] = useState('');
  useEffect(() =>{
    axios.get('/axios')
      .then(res => {
        setMessage(res.data)
      })
  },[])
  console.log("message raw data", message)
  
  return (
    <div className="App">
      <div className='topContainer'>
        <h1>都道府県別キャンプ場リスト Yahoo!ローカルサーチ版</h1>
        <p>※ジャンルコードが「キャンプ場」の地点情報を都道府県別に抽出しています。</p>
        {message
          ?
            <TableContainer component={Paper}>
              <Table sx={{ maxWidth: 800 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell align="right">名前</TableCell>
                    <TableCell>住所</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {message && message.map((element, index) =>{
                    return (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{index+1 + ''}</TableCell>
                        <TableCell align="right">{element.name}</TableCell>
                        <TableCell>{element.addr}</TableCell>
                      </TableRow>
                    )}
                  )}
                </TableBody>
              </Table>
            </TableContainer>    

          : <p>Loading...</p>
        }
      </div>
    </div>
  );
}

export default App;