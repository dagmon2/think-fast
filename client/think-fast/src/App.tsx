import React from "react";

import { UserProvider } from "./context/user";
import AppRouter from "./AppRouter";

const App = () => {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
};

export default App;
