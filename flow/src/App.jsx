import React, { useState, useRef, useCallback} from 'react';
import ReactFlow, {
  MiniMap,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

import './index.css';
import systemNode from './component/systemNode';
import userNode from './component/userNode';
import assistantNode from './component/assistantNode';

const nodeTypes = { system: systemNode,
  user:userNode,
  assistant:assistantNode,
  cond:systemNode,
 };

let id = {system:0, user:0, assistant:0, cond:0};
const getId = (type) => {
  return `${type}${id[type]++}`
};

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const id=getId(type)
      const newNode = {
        id,
        type,
        position,
        data: { 
          id, 
          type, 
          value:"",
          value_node_id:null,
          parent_node_id:null,
          if_condition_mapping:{},
          temp:false,
          function:{},
          function_key:null
        },
      };

      setNodes((nds) => {
        return nds.concat(newNode)
      });
    },
    [reactFlowInstance],
  );
  const updateNodes= (id, newData)=>{
    setNodes((nds)=>{
      return nds.map((nd)=>{
        if(nd.id==id) nd.data=newData;
        return nd
      })
    })
  }
  console.log(nodes)
  return (
    <div style={{ width: '80vw', height: '80vh' }} className="dndflow">
      
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
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
            {/* <Background variant="dots" gap={12} size={1} /> */}
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;

function Sidebar(){
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode " onDragStart={(event) => onDragStart(event, 'system')} draggable>
        System
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'user')} draggable>
        User
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'assistant')} draggable>
        Assistant
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'cond')} draggable>
        Condition
      </div>
    </aside>
  );
}