import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import NodeScaffold from "./NodeScaffold";

const handleStyle = {
  fontSize: "10px",
  padding: "10px",
};

const inputStyle = { width: "20px", height: "10px" };

function AssistantNode({ data, isConnectable }) {
  const [value, setValue] = useState("");
  const [tempValue, setTempValue] = useState(false);
  const [functionValue, setFunctionValue] = useState(false);
  const [functionKeyValue, setFunctionKeyValue] = useState(false);
  const onChangeValue = useCallback((evt) => {
    setValue(evt.target.value);
  }, []);
  const onChangeTemp = () => {
    setTempValue(!tempValue);
  };
  const onChangeFunction = useCallback((evt) => {
    setFunctionValue(evt.target.value);
  }, []);
  const onChangeFunctionKey = useCallback((evt) => {
    setFunctionKeyValue(evt.target.value);
  }, []);
  return (
    <NodeScaffold
      title={"Assistant"}
      nodeId={data.id}
      colors={{
        bg: "bg-gray-100",
        header: "bg-gray-200",
        border: "border-gray-300",
        text: "text-gray-900",
      }}
    >
      <div style={handleStyle} className="assistant-node">
        <div>
          <label htmlFor="value">Value:</label>
          <input
            style={inputStyle}
            id="value"
            name="value"
            onChange={onChangeValue}
            className="nodrag"
          />
        </div>
        <div>
          <label htmlFor="temp">Temp</label>
          <input
            style={inputStyle}
            type="checkbox"
            id="temp"
            name="temp"
            onChange={onChangeTemp}
            checked={tempValue}
          />
        </div>
        <div>
          <label htmlFor="function">Function:</label>
          <input
            style={inputStyle}
            id="function"
            name="function"
            onChange={onChangeFunction}
            className="nodrag"
          />
        </div>
        <div>
          <label htmlFor="functionKey">Function Key:</label>
          <input
            style={inputStyle}
            id="functionKey"
            name="functionKey"
            onChange={onChangeFunctionKey}
            className="nodrag"
          />
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Top}
        className="w-2 h-2 bg-white border border-gray-400 rounded-[2px] top-[-12px]"
      />
      <Handle
        type="source"
        position={Position.Left}
        className="w-2 h-2 bg-white border border-gray-400 rounded-[2px] left-[-12px]"
      />
      <Handle
        type="target"
        position={Position.Right}
        className="w-2 h-2 bg-white border border-gray-400 rounded-[2px] right-[-12px]"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        className="w-2 h-2 bg-white border border-gray-400 rounded-[2px] bottom-[-12px]"
      />
    </NodeScaffold>
  );
}

export default AssistantNode;
