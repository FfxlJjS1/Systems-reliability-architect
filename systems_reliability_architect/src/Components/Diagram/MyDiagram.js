import { useState, useCallback } from "react";
import ReactFlow, { Background, MiniMap, Controls } from 'reactflow'

import { CustomizableNode } from './CustomizableNode'

import 'reactflow/dist/style.css';

function MyDiagram(props) {
    let nodes = [];
    let edges = [];

    // 

    return (
        <div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                >
                    <Background color="#fff" variant="dots"/>
                    <MiniMap
                        style={{ Background: "#fff" }}
                        nodeColor="#038e64"
                        nodeStrokeWidth={3}
                        pannable zoomable />
                    <Controls/>
                </ReactFlow>
        </div>
    );
}