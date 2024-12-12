import React, { useState } from "react";
import { transform_structure_from_mydiagram_to_graph } from './DiagramTransformator';

import { NodesEdges } from "../Diagram/MyDiagram";

const ElementEditor = ({ nodes_data, transition_graph }) => {
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [selectedNodeData, setSelectedNodeData] = useState(null);
    const [timeInput, setTimeInput] = useState('');

    // Обработчик выбора узла
    const handleNodeSelect = (event) => {
        const nodeId = event.target.value;
        setSelectedNodeId(nodeId);
        setSelectedNodeData(nodes_data[nodeId]);
    };

    // Таблица соединений
    const renderConnectionMatrix = () => {
        if (!selectedNodeId) return null;

        const connections = transition_graph[selectedNodeId] || [];
        const connectedNodes = [...new Set([...connections, '0', '1'])]; // Включаем начальный и конечный узлы

        return (
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.headerCell}>Цель</th>
                        <th style={styles.headerCell}>Соединение</th>
                    </tr>
                </thead>
                <tbody>
                    {connectedNodes.map((nodeId) => (
                        <tr key={nodeId}>
                            <td style={styles.cell}>{nodes_data[nodeId].label}</td>
                            <td style={styles.cell}>
                                {connections.includes(nodeId) ? 'Да' : 'Нет'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div style={styles.container}>
            <h3>Редактирование элемента</h3>
            <div style={styles.formGroup}>
                <label>Выберите элемент:</label>
                <select onChange={handleNodeSelect} value={selectedNodeId || ''}>
                    <option value="">Выберите элемент</option>
                    {Object.keys(nodes_data).map((nodeId) => (
                        <option key={nodeId} value={nodeId}>
                            {nodes_data[nodeId].label}
                        </option>
                    ))}
                </select>
            </div>

            {selectedNodeData && (
                <div>
                    <div style={styles.formGroup}>
                        <label>Имя элемента:</label>
                        <input
                            type="text"
                            value={selectedNodeData.label}
                            onChange={(e) =>
                                setSelectedNodeData({
                                    ...selectedNodeData,
                                    label: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Тип распределения:</label>
                        <input
                            type="text"
                            value={selectedNodeData.distributionType || ''}
                            readOnly // Тип распределения только для чтения
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Параметры распределения:</label>
                        <input
                            type="text"
                            value={selectedNodeData.distributionParams || ''}
                            readOnly // Параметры распределения только для чтения
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Время:</label>
                        <input
                            type="number"
                            value={timeInput}
                            onChange={(e) => setTimeInput(e.target.value)}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <h4>Таблица соединений:</h4>
                        {renderConnectionMatrix()}
                    </div>
                </div>
            )}
        </div>
    );
};

// Стили CSS
const styles = {
    container: {
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
    },
    formGroup: {
        marginBottom: '15px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
    },
    headerCell: {
        border: '1px solid #ddd',
        padding: '8px',
        backgroundColor: '#f2f2f2',
        textAlign: 'center',
    },
    cell: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center',
    },
};

const CurrentProbabilityValuesTab = () => {
    const [nodes_data, transition_graph] = transform_structure_from_mydiagram_to_graph(NodesEdges.nodes, NodesEdges.edges);
    
    return (
        <div>
            <ElementEditor nodes_data={nodes_data} transition_graph={transition_graph} />
        </div>
    );
}

export default CurrentProbabilityValuesTab;