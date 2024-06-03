import React from "react";

const NodeScaffold = ({ title, nodeId, children, colors }) => {
  return (
    <div
      className={`border rounded-lg shadow flex flex-col w-[200px] ${colors.bg} ${colors.border}`}
    >
      <div
        className={`flex items-center justify-between px-[10px] py-[4px] rounded-t-lg ${colors.header}`}
      >
        <div className="flex items-center">
          <span className={`text-[10px] ${colors.text}`}>{title}</span>
          <span
            className={`border text-[8px] ml-1 rounded p-[2px] ${colors.header} ${colors.border} ${colors.text}`}
          >
            {nodeId}
          </span>
        </div>
        <span className={`text-[10px] cursor-pointer ${colors.text}`}>
          &#x2715;
        </span>
      </div>
      <div className="mt-2 mb-4 flex-grow">{children}</div>
    </div>
  );
};

export default NodeScaffold;
