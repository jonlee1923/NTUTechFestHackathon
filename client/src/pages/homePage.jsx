import React, { useContext } from "react";

import { AuthContext } from "../context/authContext";

const HomePage = () => {
  const auth = useContext(AuthContext)
  return (
    <div>
      <h3>Home Page</h3>
      <h3>{auth.token}</h3>
    </div>
  );
};

export default HomePage;
