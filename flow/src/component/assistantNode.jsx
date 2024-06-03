import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = {border:"1px solid black", fontSize:"10px", padding:"10px" };
const inputStyle={width:"20px", height:"10px"}

function assistantNode({ data, isConnectable }) {
  const [value, setValue] = useState("")
  const [tempValue, setTempValue] = useState(false)
  const [functionValue, setFunctionValue] = useState(false)
  const [functionKeyValue, setFunctionKeyValue] = useState(false)
  const onChangeValue = useCallback((evt) => {
    setValue(evt.target.value);
  }, []);
  const onChangeTemp = ()=>{
    setTempValue(!tempValue);
  };
  const onChangeFunction = useCallback((evt) => {
    setFunctionValue(evt.target.value);
  }, []);
  const onChangeFunctionKey = useCallback((evt) => {
    setFunctionKeyValue(evt.target.value);
  }, []);
  return (
    <div style={handleStyle} className="assistant-node">
      <Handle type="source" position={Position.Top} />
      <div>
        <div>id: {data.id}</div>
        <div>type: {data.type}</div>
        <div>
            <label htmlFor="value">Value:</label>
            <input style={inputStyle} id="value" name="value" onChange={onChangeValue} className="nodrag" />
            <Handle type="source" position={Position.Left} />
            <Handle type="target" position={Position.Right} />
        </div>
        <div>
            <label htmlFor="temp">Temp</label>
            <input style={inputStyle} type="checkbox" id="temp" name="temp" onChange={onChangeTemp} checked={tempValue} />  
        </div>
        <div>
            <label htmlFor="function">Function:</label>
            <input style={inputStyle} id="function" name="function" onChange={onChangeFunction} className="nodrag" />
        </div>
        <div>
            <label htmlFor="functionKey">Function Key:</label>
            <input style={inputStyle} id="functionKey" name="functionKey" onChange={onChangeFunctionKey} className="nodrag" />
        </div>
      </div>
      
      <Handle type="target" position={Position.Bottom} />
    </div>
  );
}

export default assistantNode;
