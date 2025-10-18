import './App.css';
import './components/GeometricBg/GeometricBg.css';
import React from 'react';
import Bookshelf from './components/Bookshelf';
import GeometricBg from './components/GeometricBg/GeometricBg.jsx';


const App = () => {
   return (
      <>
            <GeometricBg />
            <div className="title">
               <h1>MY BOOKSHELF</h1>
               <Bookshelf />
            </div>
      </>
   );
};

 export default App;