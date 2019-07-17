import React, { Component } from 'react';
import './App.css';
import Main from "./containers/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {

  render() {
    return (
        <div className="app">
          <Header/>
          <Main />
          <Footer/>
        </div>
    );
  }

}

export default App;
