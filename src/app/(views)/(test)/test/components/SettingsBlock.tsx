import React from "react";

interface ISettingsBlockProps {
  children: React.ReactNode
  icon?: string
  title?: string
  description?: string
}

const SettingsBlock: React.FC<Readonly<ISettingsBlockProps>> = ({ children, icon, title, description }) => {
  return (
    <div className={"w-full h-full bg-bg-transparent-25 rounded-10 flex"}>
      <div className={"w-20 h-full"}>
        { icon }
      </div>
      <div className={"flex flex-col"}>
        <div>
          { title }
        </div>
        <div>
          { description }
        </div>
        <div>
          { children }
        </div>
      </div>
    </div>
  );
};

export default SettingsBlock;