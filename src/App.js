import logo from './logo.svg';
import './App.css';
import Menu from './Components/MenuComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
import { DISHES } from './shared/dishes';
import { Component } from 'react';
import Footer from './Components/FooterComponent';
import Header from './Components/HeaderComponent';
import { BrowserRouter } from 'react-router-dom';
import Main from './Components/MainComponent';

class App extends Component {

  render(){
    return (
      <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
