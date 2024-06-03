import { useCallback, useState } from "react";
import { Handle, Position, useNodes, useReactFlow } from "reactflow";
import NodeScaffold from "./NodeScaffold";

const handleStyle = {
  fontSize: "10px",
  padding: "10px",
};
const inputStyle = { width: "20px", height: "10px" };

function UserNode({ data, isConnectable }) {
  const nodes = useNodes();
  const { setNodes } = useReactFlow();
  const [value, setValue] = useState("");
  const [tempValue, setTempValue] = useState(false);
  const [parent, setParent] = useState(null);
  const onChangeValue = useCallback((evt) => {
    setNodes((nds) =>
      nds.map((nd) => {
        if (nd.id == data.id) {
          return {
            ...nd,
            data: {
              ...nd.data,
              value: evt.target.value,
            },
          };
        }
        return nd;
      })
    );
    setValue(evt.target.value);
  }, []);
  const onChangeTemp = () => {
    setNodes((nds) =>
      nds.map((nd) => {
        if (nd.id == data.id) {
          return {
            ...nd,
            data: {
              ...nd.data,
              temp: !tempValue,
            },
          };
        }
        return nd;
      })
    );
    setTempValue(!tempValue);
  };
  function connectionValid(connection, allowed) {
    return allowed.includes(connection.targetHandle);
  }
  function handleParentConnect(connection) {
    setNodes((nds) =>
      nds.map((nd) => {
        if (nd.id == data.id) {
          return {
            ...nd,
            data: {
              ...nd.data,
              parent_node_id: connection.target,
            },
          };
        }
        return nd;
      })
    );
    setParent(connection.target);
  }
  function fetchValue(id) {
    let tempValue = "";
    nodes.forEach((node) => {
      if (node.id == id) {
        console.log(node.data.value);
        tempValue = node.data.value;
        return;
      }
    });
    return tempValue;
  }
  function handleValueConnect(connection) {
    const tempValue = fetchValue(connection.target);
    console.log(tempValue);
    setNodes((nds) =>
      nds.map((nd) => {
        if (nd.id == data.id) {
          return {
            ...nd,
            data: {
              ...nd.data,
              value: tempValue,
            },
          };
        }
        return nd;
      })
    );
    setValue(tempValue);
  }
  return (
    <NodeScaffold
      title={"User"}
      nodeId={data.id}
      colors={{
        bg: "bg-yellow-100",
        header: "bg-yellow-200",
        border: "border-yellow-300",
        text: "text-yellow-900",
      }}
    >
      <div style={handleStyle} className="system-node">
        <Handle
          type="source"
          position={Position.Top}
          id="a"
          isValidConnection={(connection) => connectionValid(connection, ["b"])}
          onConnect={handleParentConnect}
          className="w-2 h-2 bg-white border border-gray-400 rounded-[2px] top-[-12px]"
        />
        <div>
          <div>id: {data.id}</div>
          <div>type: {data.type}</div>
          <div>
            <label htmlFor="value">Value:</label>
            <input
              style={inputStyle}
              id="value"
              name="value"
              value={value}
              onChange={onChangeValue}
              className="nodrag"
            />
            <Handle
              type="target"
              position={Position.Left}
              id="vt"
              isConnectableStart={false}
              className="w-2 h-2 bg-white border border-gray-400 rounded-[2px] left-[-12px]"
            />
            <Handle
              type="source"
              position={Position.Right}
              id="vs"
              isValidConnection={(connection) =>
                connectionValid(connection, ["vt"])
              }
              onConnect={handleValueConnect}
              className="w-2 h-2 bg-white border border-gray-400 rounded-[2px] right-[-12px]"
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
        </div>

        <Handle
          type="target"
          position={Position.Bottom}
          id="b"
          isConnectableStart={false}
          className="w-2 h-2 bg-white border border-gray-400 rounded-[2px] bottom-[-12px]"
        />
      </div>
    </NodeScaffold>
  );
}

export default UserNode;
