function transform_structure_from_mydiagram_to_graph(nodes, edges) {
    let nodes_data = {};
    let transition_graph = {};

    // Преобразовать узлы и отношения для графика
    for (const node_index in nodes) {
        const node = nodes[node_index];
        const node_id = node["id"];

        if (node_id == 0 || node_id == 1) {
            nodes_data[node_id] = {
                "Тип закона распределения": 0
            };
        }
        else {
            nodes_data[node_id] = node["data"]["parameters"];
        }
    }

    for (const edge_index in edges) {
        const edge = edges[edge_index];
        const source = edge["source"];
        const target = edge["target"];

        if (!(source in transition_graph)) {
            transition_graph[source] = [];
        }

        transition_graph[source].push(target);
    }

    return [nodes_data, transition_graph];
}

export default transform_structure_from_mydiagram_to_graph;