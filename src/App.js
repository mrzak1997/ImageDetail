import { Component } from "react";
import WeatherContext from "./Contexts/WeatherContext.jsx";
import SearchBox from "./Components/searchBox.jsx";
import MainBox from "./Components/mainBox.jsx";
class App extends Component {
  static contextType = WeatherContext;
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="main col-9 col-lg-9 col-md-9">
            <WeatherContext.Provider value="">
              <SearchBox />
              <MainBox />
            </WeatherContext.Provider>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
