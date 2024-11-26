import { Component } from "react";
import {Container, Form, Button} from 'react-bootstrap';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Queue from "../Components/Queue";

export class ProbabilityChart extends Component {
    constructor(props) {
        super (props);

        this.state = {
          transition_graph: props.transition_graph,
            nodes_data: props.nodes_data,
            data: [],
            begin_t: 1,
            end_t: 100,
            step_t: 1
        }
    }

    render () {
        const data = this.state.data;

        const handleGenerateAndDisplayGraphic = (e) => {
          const nodes_data = this.state.nodes_data;
          const transition_graph = this.state.transition_graph;

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
          
          for (let current_t = this.state.begin_t; current_t <= this.state.end_t; current_t += this.state.step_t){
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

          this.setState({data: new_data});
        }

        return (
            <Container fluid>
                <Form>
                    <Form.Group>
                        <Form.Label> Начальная позиция времени (t) </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="0"
                            value={this.state.begin_t}
                            pattern="[0-9]*"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Конечная позиция времени (t) </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="0"
                            value={this.state.end_t}
                            pattern="[0-9]*"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Шаг времени (t) </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="0"
                            value={this.state.step_t}
                            pattern="[0-9]*"
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

                <LineChart width={400} height={400} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="p_t" stroke="#ff7300" />
                </LineChart>
            </Container>
        )
    }
}

export default ProbabilityChart;
