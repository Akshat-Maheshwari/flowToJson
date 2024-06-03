import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import SystemNode from "../../component/SystemNode";
import UserNode from "../../component/UserNode";
import AssistantNode from "../../component/AssistantNode";

const nodeTypes = {
  system: SystemNode,
  user: UserNode,
  assistant: AssistantNode,
  condition: SystemNode,
};

const NodesList = [
  { label: "Assistant", value: "assistant" },
  { label: "System", value: "system" },
  { label: "Condition", value: "condtion" },
  { label: "User", value: "user" },
];

let id = { system: 0, user: 0, assistant: 0, condition: 0 };
const getId = (type) => {
  return `${type}-${id[type]++}`;
};

const NodeItem = ({ onDragStart, label, icon, value }) => {
  return (
    <div
      className="flex items-center p-2 mt-2 text-sm font-semibold hover:text-white rounded-md"
      id={value}
      node-value={value}
      draggable
      onDragStart={onDragStart}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span className="ml-2">{label}</span>
    </div>
  );
};

const NodeSidebar = () => {
  const onDragStart = (event) => {
    const node = event.target.getAttribute("node-value");
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="h-screen w-64 bg-[#5E5ADB] text-white flex flex-col">
      <div className="p-2 mt-2"> Building Blocks</div>
      {NodesList.map(({ label, value }) => (
        <NodeItem onDragStart={onDragStart} label={label} value={value} />
      ))}
    </div>
  );
};

const Builder = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const id = getId(type);
      const newNode = {
        id,
        type,
        position,
        data: {
          id,
          type,
          value: "",
          value_node_id: null,
          parent_node_id: null,
          if_condition_mapping: {},
          temp: false,
          function: {},
          function_key: null,
        },
      };

      setNodes((nds) => {
        return nds.concat(newNode);
      });
    },
    [reactFlowInstance]
  );
  const updateNodes = (id, newData) => {
    setNodes((nds) => {
      return nds.map((nd) => {
        if (nd.id == id) nd.data = newData;
        return nd;
      });
    });
  };
  console.log(nodes);

  return (
    <div className="flex">
      <ReactFlowProvider>
        <NodeSidebar />
        <div className="reactflow-wrapper flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Builder;
