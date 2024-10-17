import { Handle, Position } from 'reactflow';

export function EndNode({ data }) {
    const nodeWidth = data.width;
    const nodeHeight = data.height;

    return (
        <>
            <div style={{ width: nodeWidth, height: nodeHeight }}>
                <Handle type="target" position={Position.Left} />

                <div style={{ display: 'flex' }} >
                    <label htmlFor="text" style={{ marginLeft: 10, marginTop: 4, whiteSpace: 'nowrap' }} >{data.label}</label>
                </div>
            </div>
        </>
    );
}
