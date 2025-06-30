import React from "react";
import MainLayout from "./components/MainLayout";
import TaskMain from "./components/TaskMain";

export default function App(){
  return (
  <div>
    <MainLayout>
      <TaskMain />
    </MainLayout>
  </div>
  );
}