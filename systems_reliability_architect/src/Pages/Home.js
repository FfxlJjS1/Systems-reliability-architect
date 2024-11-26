import React, {Component} from 'react'

import MyDiagram, {initialNodes, NodesEdges}  from '../Components/Diagram/MyDiagram'
import ProbabilityChart from './FailureFreeOperatoinProbabilityChart'
import { Container, Button, Form, Col, Row } from 'react-bootstrap'

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            my_graphic: null
        }
    }

    render() {
        const handleToClearObjects = (e) => {
            NodesEdges.setEdges([]);
            NodesEdges.setNodes(initialNodes);
        }

        const handleDisplayGraphicOfEntiryStructure = (e) => {
            const nodes = NodesEdges.nodes;
            const edges = NodesEdges.edges;

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

            console.log(nodes_data);
            console.log(transition_graph);

            this.setState({my_graphic: null});

            this.setState({my_graphic: <ProbabilityChart transition_graph={transition_graph} nodes_data={nodes_data}/>})
        }

        return (
            <Container className='mt-2'>
                <Container style={{width: '800px'}}>
                    <Form>
                        <Button
                            className='mt-3 mb-3'
                            variant='primary'
                            type="button"
                            onClick={handleToClearObjects}>
                            Очистить объекты
                        </Button>

                        <Button
                            className='mt-3 mb-3'
                            variant='primary'
                            type="button"
                            onClick={null}>
                            Применить автоструктурирование
                        </Button>
                        
                        <Button
                            className='mt-3 mb-3'
                            variant='primary'
                            type="button"
                            onClick={handleDisplayGraphicOfEntiryStructure}>
                            Построить график по всей ИС
                        </Button>

                        <Button
                            className='mt-3 mb-3'
                            variant='primary'
                            type="button"
                            onClick={null}>
                            Построить график по выбранным объектам
                        </Button>
                    </Form>
                </Container>

                <Container style={{minWidth: '1000px', minHeight: '830px'}}>
                    <Col>
                        <MyDiagram />
                    </Col>
                    <Col>
                        {this.state.my_graphic}
                    </Col>
                </Container>
            </Container>
        )
    }
}

export default Home
