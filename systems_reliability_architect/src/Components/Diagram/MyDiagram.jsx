import { useRef, useState, useCallback } from "react";
import ReactFlow, { Background, MiniMap, useNodesState, useEdgesState, useReactFlow, Controls, ReactFlowProvider, addEdge } from 'reactflow'

import Sidebar from './Sidebar';
import { DnDProvider, useDnD } from './DnDContext';

import { BeginNode } from './BeginNode'
import { ISNode } from './ISNode'
import { EndNode } from './EndNode'

import 'reactflow/dist/style.css';

const node_types = {
    begin_node: BeginNode,
    is_node: ISNode,
    end_node: EndNode
};

const initialNodes = [
    {
        id: '0',
        type: 'begin_node',
        data: { label: 'Начальная точка' },
        position: { x: 250, y: 5 },
    },
    {
        id: '1',
        type: 'end_node',
        data: { label: 'Конечная точка' },
        position: { x: 400, y: 5 },
    },
];

let id = 2;
const getId = () => `${id++}`;

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();

    const onConnect = useCallback(
        (params) => {
            console.log(params);
            console.log(nodes);

            // Настроить проверку на отсутствие зацикленности

            setEdges((eds) => addEdge(params, eds));
        },
        [],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            // check if the dropped element is valid
            if (!type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `Элемент №${id - 2}` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type],
    );

    return (
        <div className="dndflow" style={{border: '1px solid red', height: '600px'}}>
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={node_types}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                >
                    <Controls />
                </ReactFlow>
            </div>
            <Sidebar />
        </div>
    );
};

function MyDiagram(props) {
    return (
        <ReactFlowProvider>
            <DnDProvider>
                <DnDFlow />
            </DnDProvider>
        </ReactFlowProvider>
    );
}

export default MyDiagram;