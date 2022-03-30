import React from "react";
import LoginButton from "../../components/LoginButton/LoginButton";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

const HomePage = () => {
  return (
    <section>
      <h1>Welcome to Lost&FOUND!</h1>
      <p>Your go to source for all things dev related.</p>
      <LoginButton />
      <LogoutButton />
    </section>
  );
};

export default HomePage;