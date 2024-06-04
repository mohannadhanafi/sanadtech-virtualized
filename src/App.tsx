import UserList from "./components/UserList";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="header">
        <h1 className="logo">SanadTech App</h1>
      </div>
      <div className="container">
        <UserList />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
