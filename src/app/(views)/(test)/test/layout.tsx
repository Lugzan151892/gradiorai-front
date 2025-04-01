import AppHeader from "@/components/header/AppHeader";
import React from "react";

const TestsLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({children}) => {
  return (
    <div className={"min-w-full min-h-full flex flex-col"}>
      <AppHeader />
      <div className={"max-w-5xl mx-auto w-full h-full"}>
        {children}
      </div>
    </div>
  );
};

export default TestsLayout;