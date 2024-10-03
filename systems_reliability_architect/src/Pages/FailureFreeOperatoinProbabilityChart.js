import { Component } from "react";
import {Container, Form, Button} from 'react-bootstrap';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export class ProbabilityChart extends Component {
    constructor(props) {
        super (props);

        this.state = {
            begin_t: 0,
            end_t: 100,
            step_t: 1
        }
    }

    render () {
        return (
            <Container fluid>
                <Form>
                    <Form.Group>
                        <Form.Label> Начальная позиция времени (t) </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="0"
                            value={this.state.begin_t}
                            pattern="[0-9]"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Конечная позиция времени (t) </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="0"
                            value={this.state.end_t}
                            pattern="[0-9]"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Шаг времени (t) </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="0"
                            value={this.state.step_t}
                            pattern="[0-9]"
                        />
                    </Form.Group>

                    <Button
                        className="mt-3 mb-3"
                        variant="primary"
                        type="button"
                        onClick={null}
                        >
                        Построить
                    </Button>
                </Form>

                <LineChart width={400} height={400} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                </LineChart>
            </Container>
        )
    }
}

export default ProbabilityChart;
