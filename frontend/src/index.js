import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import Routes from "./config/Routes";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
