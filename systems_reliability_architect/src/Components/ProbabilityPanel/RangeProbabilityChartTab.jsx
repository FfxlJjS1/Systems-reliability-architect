import React from "react";
import { useState } from "react";
import {Container, Form, Button} from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import transform_structure_from_mydiagram_to_graph from './DiagramTransformator';
import Queue from '../Queue'

import { NodesEdges } from "../Diagram/MyDiagram";

const RangeProbabilityChartTab = () => {
    const [begin_t, set_begin_t] = useState(0);
    const [end_t, set_end_t] = useState(100);
    const [step_t, set_step_t] = useState(1);
    const [range_diagram, set_range_diagram] = useState(null);

    const handleOnInputBeginT = (e) => {
        if(e.target.value.match("^[0-9]*$") != null){
            set_begin_t(parseInt(e.target.value));
        }
    };

    const handleOnInputEndT = (e) => {
        if(e.target.value.match("^[0-9]*$") != null){
            set_end_t(parseInt(e.target.value));
        }
    };

    const handleOnInputStepT = (e) => {
        if(e.target.value.match("^[0-9]*$") != null){
            set_step_t(parseInt(e.target.value));
        }
    };

    const handleGenerateAndDisplayGraphic = (e) => {
        const [nodes_data, transition_graph] = transform_structure_from_mydiagram_to_graph(NodesEdges.nodes, NodesEdges.edges);

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

          // Появились все возможные пути линий узлов от начала до конца
          /// Считаем для каждого дискретного момента t значения для каждой параллельной линии последовательности объектов, в конце считаем P_t системы из этих параллельных линий
          let new_data = [];
          
          for (let current_t = begin_t; current_t <= end_t; current_t += step_t){
            let parallel_lines_s_p_t = [];

            // Считаем P_t каждой последовательной линии системы
            for (const parallel_nodes_line_index in parallel_nodes_lines) {
              const parallel_nodes_line = parallel_nodes_lines[parallel_nodes_line_index];
              
              let line_p_t = 1;

              for (const line_s_node_index in parallel_nodes_line) {
                const line_s_node = parallel_nodes_line[line_s_node_index];

                if (line_s_node["Тип закона распределения"] == 1) {
                  // У узла экспоненциальный закон
                  line_p_t *= Math.exp(- line_s_node["lambda"] * current_t);
                }
                else if (line_s_node["Тип закона распределения"] == 2) {
                  // У узла распределение Рэлея
                  line_p_t *= Math.exp(- (Math.pow(current_t, 2) / (2 * Math.pow(line_s_node["sigma"], 2))));
                }
                else if (line_s_node["Тип закона распределения"] == 3) {
                  // У узла распределение Вэйбулля
                  line_p_t *= Math.exp(- line_s_node["lambda_1"] * Math.pow(current_t, line_s_node["m"]));
                }
              }

              parallel_lines_s_p_t.push(line_p_t);
            }

            // Считаем параллельную конечную систему
            let parallel_lines_s_q_t = [];

            for (const parallel_line_s_p_t_index in parallel_lines_s_p_t) {
              const parallel_line_s_p_t = parallel_lines_s_p_t[parallel_line_s_p_t_index];
              
              parallel_lines_s_q_t.push(1 - parallel_line_s_p_t);
            }

            // Вычисляем вероятность отказной работы системы из параллельных соединений
            let system_q_t = 1;

            for (const parallel_line_s_q_t_index in parallel_lines_s_q_t) {
              const parallel_line_s_q_t = parallel_lines_s_q_t[parallel_line_s_q_t_index];

              system_q_t *= parallel_line_s_q_t;
            }

            // Вычисляем вероятность безотказной работы системы
            let system_p_t = 1 - system_q_t;

            new_data.push({
              name: String(current_t),
              t: current_t,
              p_t: system_p_t
            });
          }

          set_range_diagram(
            <LineChart width={650} height={700} data={new_data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <XAxis dataKey="name" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="p_t" stroke="#ff7300" />
            </LineChart>
          );
    }

    return (
        <Container className="sidebar">
            <Form>
                <Form.Group>
                    <Form.Label> Начальная позиция времени (t) </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="0"
                        value={begin_t}
                        onInput={handleOnInputBeginT}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label> Конечная позиция времени (t) </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="0"
                        value={end_t}
                        onInput={handleOnInputEndT}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label> Шаг времени (t) </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="0"
                        value={step_t}
                        onInput={handleOnInputStepT}
                    />
                </Form.Group>

                <Button
                    className="mt-3 mb-3"
                    variant="primary"
                    type="button"
                    onClick={handleGenerateAndDisplayGraphic}
                    >
                    Построить
                </Button>
            </Form>

            {range_diagram}
        </Container>
    );
};

export default RangeProbabilityChartTab;