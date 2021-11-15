import "./App.css";
import Menu from "../src/components/menu";

const App = () => {
  return (
    <div className="App">
      <img src={"/images/logo.png"} alt="Logo" height="300px" />
      <div className="wrapper">
        <div className="dropdown">
          <Menu />
        </div>

        <div className="dropdown">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default App;
