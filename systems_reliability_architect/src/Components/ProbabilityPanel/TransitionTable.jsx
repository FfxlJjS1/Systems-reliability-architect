import React from 'react';
import { NodesEdges } from "../Diagram/MyDiagram";
import { transform_structure_from_mydiagram_to_graph } from './DiagramTransformator';

const TransitionTable = ({ nodes_data, transition_graph }) => {
    // Определяем максимальное количество целей
    const maxTargets = Object.values(transition_graph).reduce(
        (max, targets) => Math.max(max, targets.length),
        0
    );

    return (
        <div style={styles.scrollContainer}>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Источник</th>
                        {Array.from({ length: maxTargets }).map((_, index) => (
                            <th key={index}>Цель {index + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(transition_graph).map((source) => (
                        <tr key={source}>
                            <td style={styles.cell}>{nodes_data[source]["label"]}</td>
                            {Array.from({ length: maxTargets }).map((_, index) => (
                                <td key={index} style={styles.cell}>
                                    {transition_graph[source][index]
                                        ? nodes_data[transition_graph[source][index]]["label"]
                                        : "-"}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Стили CSS
const styles = {
    scrollContainer: {
        maxHeight: '100%', // Максимальная высота контейнера
        overflowY: 'auto', // Включаем вертикальную прокрутку
        border: '1px solid #ddd', // Границы контейнера
        borderRadius: '4px', // Скругление углов контейнера
        flex: '1', // Растягиваем контейнер на всю доступную высоту
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse', // Убираем отступы между ячейками
        border: '1px solid #ddd', // Границы таблицы
    },
    headerCell: {
        border: '1px solid #ddd', // Границы ячеек заголовка
        padding: '8px', // Внутренний отступ
        backgroundColor: '#f2f2f2', // Цвет фона заголовка
        textAlign: 'center', // Выравнивание текста по центру
        position: 'sticky', // Фиксируем заголовок при прокрутке
        top: 0, // Фиксируем заголовок сверху
    },
    cell: {
        border: '1px solid #ddd', // Границы ячеек
        padding: '8px', // Внутренний отступ
        textAlign: 'center', // Выравнивание текста по центру
    },
};

const TransitionTableTab = () => {
    const [nodes_data, transition_graph] = transform_structure_from_mydiagram_to_graph(NodesEdges.nodes, NodesEdges.edges);

    return (
        <div>
            <TransitionTable nodes_data={nodes_data} transition_graph={transition_graph} />
        </div>
    );
}

export default TransitionTableTab;