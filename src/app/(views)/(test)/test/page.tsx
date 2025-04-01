import React from "react";
import SettingsBlock from "./components/SettingsBlock";

const TestsView = () => {
  return (
    <div className={"flex flex-col w-full h-full"}>
      <SettingsBlock>
        first block
      </SettingsBlock>
      <div>
        tut testy
      </div>
    </div>
  );
};

export default TestsView;