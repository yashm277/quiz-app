import React from "react";
import "./Error.css";

function Error() {
  return (
    <div>
      <h1>Page not found!</h1>
      <a href="/" >
      <button className="btn"> Redirect to HomePage </button>
      </a>
    </div>
  );
}

export default Error;
