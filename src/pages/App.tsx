import React from "react";
import Head from "next/head";
import TaskManagerFM from "./posts/TaskMangerFM";

function App() {
  return (
    <div className="App">
      <Head>
        <link rel="icon" href="/favicon-ds.png" />
      </Head>
      <TaskManagerFM/>
    </div>
  );
}

export default App;


