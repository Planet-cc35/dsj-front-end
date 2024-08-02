import React from 'react';
import Login from '../components/Login';
import NewCard from '../components/NewCard'
import EditCard from '../components/EditCard';

function App() {
  return (
    <>
    <div className='d-flex m-3'><h1>Do</h1>kusho<h1>Jo</h1></div>
    <EditCard id={5} cardTitle="aloha" cardBody="バババババばばっっばああああああアババババ婆アバっっばばばっっばばばばばばばああああああ" cardAudio={null}></EditCard>
      <Login />
      <NewCard/>
    </>
  );
}

export default App;

