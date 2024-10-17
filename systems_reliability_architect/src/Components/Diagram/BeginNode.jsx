import { Handle, Position } from 'reactflow';

export function BeginNode({ data }) {
    const nodeWidth = data.width;
    const nodeHeight = data.height;

    return (
        <>
            <div style={{ width: nodeWidth, height: nodeHeight }}>
                <Handle type="source" position={Position.Right} />

                <div style={{ display: 'flex' }} >
                    <label htmlFor="text" style={{ marginLeft: 10, marginTop: 4, whiteSpace: 'nowrap' }} >{data.label}</label>
                </div>
            </div>
        </>
    );
}
