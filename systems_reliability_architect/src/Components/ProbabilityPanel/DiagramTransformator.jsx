import Queue from '../Queue'

export function transform_structure_from_mydiagram_to_graph(nodes, edges) {
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

export function get_scheme_s_parallel_lines(nodes_data, transition_graph) {
    let parallel_nodes_lines = [] // Параллельные соединения всех возможных вариаций от начала до конца

    let unfinished_nodes_lines = new Queue() // Очередь для незавершенных параллельных линий
    unfinished_nodes_lines.push([{"id": 0, "Тип закона распределения": 0}])

    while (unfinished_nodes_lines.size > 0) {
        let unfinished_nodes_line = unfinished_nodes_lines.pop()

        const last_node_id = unfinished_nodes_line[unfinished_nodes_line.length - 1]["id"]

        const last_node_transitions = transition_graph[last_node_id]

        for (let last_node_id_transition_index in last_node_transitions) {
            let last_node_id_transition = last_node_transitions[last_node_id_transition_index];

            let node = nodes_data[last_node_id_transition];

            node["id"] = last_node_id_transition;

            let new_unfinides_nodes_line = unfinished_nodes_line.map((x) => x);

            new_unfinides_nodes_line.push(node);

            if (last_node_id_transition == 1) {
            parallel_nodes_lines.push(new_unfinides_nodes_line);
            }
            else {
            unfinished_nodes_lines.push(new_unfinides_nodes_line);
            }
        }
    }

    return parallel_nodes_lines;
}