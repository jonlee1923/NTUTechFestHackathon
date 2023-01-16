import React, { useContext } from "react";

import { AuthContext } from "../context/authContext";

const HomePage = () => {
  const { token, logout} = useContext(AuthContext)


  return (
    <div>
      <h3>Home Page</h3>
      <h3>{token}</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePage;
