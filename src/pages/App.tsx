import React from "react";
import Head from "next/head";
import TaskManagerFM from "./posts/TaskMangerFM";
import HomePage from "./posts/HomePage";

function App() {
  return (
    <div className="App">
      <Head>
        <link rel="icon" href="/favicon-ds.png" />
      </Head>
      <TaskManagerFM/>
      {/* <HomePage/> */}
    </div>
  );
}

export default App;


