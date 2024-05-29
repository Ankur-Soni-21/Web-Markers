import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-dvh overflow-hidden flex flex-row">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
