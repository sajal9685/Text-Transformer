import "./App.css";
import Navbar from "./component/Navbar";
import TextForm from "./component/TextForm";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <TextForm />
      </div>
    </>
  );
}

export default App;
