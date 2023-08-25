import React from 'react';
import Balance from './Balance';
import HomeContent from './HomeContent';
import UpdateDB from './UpdateDB';

function Home() {
  return (
    <>
    <div className="main">
    
        <Balance/>
        <HomeContent />
        <UpdateDB />
        </div>
    </>
  )
}

export default Home
