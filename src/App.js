import React, { Component } from 'react';
import './App.css';
import xhr from 'xhr';

class App extends Component {
  constructor(){
    super()
    this.state = {
      location:'',
      data: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getLocation = this.getLocation.bind(this)
  }
  handleSubmit(e){
    e.preventDefault()
    console.log('Location:', this.state.location)
    var location = encodeURIComponent(this.state.location);
    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=36428df9f6157dbe5dddf430717850ac&units=metric';

    var url = urlPrefix + location + urlSuffix;

    var self = this;

  xhr({
      url: url
    }, function (err, data) {
      console.log('ccc')
      self.setState({
        data: JSON.parse(data.body)
      });
    });
  }
  getLocation(e){
    this.setState({location: e.target.value})
  }
  render() {
    var currentTemp = '....';
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
      <div className="App">
        <h1>Weather App</h1>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="">I want to know about the weather for:
         <input type="text" value={this.state.location} placeholder={'City, Country'} onChange={this.getLocation}/>
         </label>
        </form>

        <p className="temp-wrapper">
          <span className="temp">{ currentTemp }</span>
          <span className="temp-symbol">°C</span>
        </p>
      </div>
    );
  }
}

export default App;
