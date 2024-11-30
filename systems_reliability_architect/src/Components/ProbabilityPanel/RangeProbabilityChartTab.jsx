import React from "react";
import { useState } from "react";
import {Container, Form, Button} from 'react-bootstrap';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip } from 'recharts';
import {transform_structure_from_mydiagram_to_graph, get_scheme_s_parallel_lines} from './DiagramTransformator';

import { NodesEdges } from "../Diagram/MyDiagram";

const RangeProbabilityChartTab = () => {
    const [begin_t, set_begin_t] = useState(0);
    const [end_t, set_end_t] = useState(100);
    const [step_t, set_step_t] = useState(1);
    const [range_diagram, set_range_diagram] = useState(null);
    const [y_axis_type_id, set_y_axis_type_id] = useState(1);

    const handleOnInputBeginT = (e) => {
        if(e.target.value.match("^[0-9]+$") != null){
            set_begin_t(parseInt(e.target.value));
        }
    };

    const handleOnInputEndT = (e) => {
        if(e.target.value.match("^[1-9]+[0-9]*$") != null){
            set_end_t(parseInt(e.target.value));
        }
    };

    const handleOnInputStepT = (e) => {
        if(e.target.value.match("^[1-9]+[0-9]*$") != null){
            set_step_t(parseInt(e.target.value));
        }
    };

    const handleOnSelectYAxisType = (e) => {
      set_y_axis_type_id(e.target.value);
    }

    const handleGenerateAndDisplayGraphic = (e) => {
      const [nodes_data, transition_graph] = transform_structure_from_mydiagram_to_graph(NodesEdges.nodes, NodesEdges.edges);

      const parallel_nodes_lines = get_scheme_s_parallel_lines(nodes_data, transition_graph);

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
          p_t: system_p_t,
          q_t: system_q_t
        });
      }

      const data_key_for_line = y_axis_type_id == 1
                            ? "p_t"
                            : y_axis_type_id == 2
                              ? "q_t"
                              : y_axis_type_id == 3
                                ? "a_t"
                                : y_axis_type_id == 4
                                  ? "lambda_t"
                                  : y_axis_type_id == 5
                                    ? "T"
                                    : "undefined";

      set_range_diagram(
        <LineChart width={650} height={700} data={new_data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <XAxis dataKey="name" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey={data_key_for_line} stroke="#ff7300" />
        </LineChart>
      );
    }

    return (
        <Container>
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
                <Form.Group
                  value={y_axis_type_id}
                  onChange={handleOnSelectYAxisType}>
                  <Form.Label> Тип данных </Form.Label>
                  <Form.Select>
                    <option value={1} selected>Вероятность безотказной работы P(t)</option>
                    <option value={2}>Вероятность отказной работы Q(t)</option>
                    {
                      /*
                      <option value={3}>Частота отказов a(t)</option>
                      <option value={4}>Интенсивность отказа &lambda;(t)</option>
                      <option value={5}>Средняя наработка на отказ T(t)</option>
                      */
                    }
                  </Form.Select>
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