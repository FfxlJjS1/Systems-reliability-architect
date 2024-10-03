import { useState } from 'react';
import { Handle, Position, NodeToolbar } from 'reactflow';
import { Container, Col, Row } from "react-bootstrap";

import './customizable.css';

export function CustomizableNode({ data }) {
    return (
        <>
            <NodeToolbar>

            </NodeToolbar>

            <div className="customizable-node" style={{ width: nodeWidth, height: nodeHeight }} onClick={onFocusToChangePanelVisible}>
                {false ? <Handle type="target" position={Position.Right} /> : null}
                {false ? <Handle type="source" position={Position.Left} /> : null}
                {false ? <Handle type="source" position={Position.Bottom} /> : null}
                {false ? <Handle type="target" position={Position.Top} /> : null}
                <div style={{ display: 'flex' }} >
                    <img src={logo} alt="" width="30" height="30" />
                    <label htmlFor="text" style={{ marginLeft: 10, marginTop: 4, whiteSpace: 'nowrap' }} >{data.label}</label>
                </div>
            </div>
        </>
    )
}