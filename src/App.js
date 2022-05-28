import React,{Component} from 'react';
import Navs from './Components/NavBar/Navs';
import Products from './pages/Products';
import {Routes,Route } from 'react-router-dom'
import ProductOptions from './pages/ProductOptions';
import Bag from './Components/NavBar/Bag';
 

class App extends Component {
  render(){
    return (
    
        
      <div className='container'> 
      <Navs/>
    <Routes>
        <Route exact path='/' element={<Products/>}/>
        <Route path='/bag' element={<Bag/>}/>
        <Route  path='/product/:id' element={<ProductOptions/>}/>

        
     
        </Routes>
      </div>
     
    );
  }

  }
 

export default App;
