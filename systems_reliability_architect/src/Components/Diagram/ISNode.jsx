import { useState } from 'react';
import { Handle, Position, NodeToolbar } from 'reactflow';
import { Col, Row, Container, Form } from "react-bootstrap";

export function ISNode({ data }) {
    const nodeWidth = data.width;
    const nodeHeight = data.height;
    
    // Focus and blur node
    const [panel_visible_state, set_focus_state] = useState(false);

    const onFocusToChangePanelVisible = (e) => {
        set_focus_state(!panel_visible_state);
    }

    const [law_number, set_law_number] = useState("1")

    const [label, set_label] = useState(data.label)
    const [parameters, set_parameter] = useState({"lambda": 0.0})

    const handleSelectLaw = (value) => {
        if (value == "1")
            set_parameter({"lambda": 0.0});
        else if (value == "2")
            set_parameter({"sigma": 0.0});
        else if (value == "3")
            set_parameter({"lambda_1": 0.0, "m": 0.0});

        set_law_number(value);
    }

    const handleOnInput = (parameter_name, value) => {
        let params = {};
        
        Object.assign(params, parameters);

        params[parameter_name] = value;

        data.parameters = params;

        set_parameter(params);
    }

    return (
        <>
            <NodeToolbar 
                position={Position.Left}
                style={{zIndex: 3} }>
                <Container className="node-status-panel" style={{ width: '200px', display: panel_visible_state ? '' : 'none', paddingRight: "0px" }}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Имя узла:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='Имя узла'
                                value={label}
                                onInput={e => set_label(e.target.value)}
                                />
                        </Form.Group>
                        <br/>
                        <Form.Group>
                            <Form.Label>Вид закона:</Form.Label>
                            <Form.Select style={{width: '20 0px'}} onChange={e => handleSelectLaw(e.target.value)}>
                                <option value="1">Экспоненциальный закон</option>
                                <option value="2">Распределение Рэлея</option>
                                <option value="3">Распределение Вэйбулля</option>
                            </Form.Select>
                        </Form.Group>
                        <br/>
                        <Form.Group style={{ display: law_number == "1" ? '' : 'none'}}>
                            <Form.Label>Параметр lambda:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="обьём м³"
                                pattern="[0-9]*"
                                value={parameters["lambda"]}
                                onInput={e => handleOnInput("lambda", e.target.value)}
                                />
                        </Form.Group>
                        <Form.Group style={{ display: law_number == "2" ? '' : 'none'}}>
                            <Form.Label>Параметр sigma:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="обьём м³"
                                pattern="[0-9]*"
                                value={parameters["sigma"]}
                                onInput={e => handleOnInput("sigma", e.target.value)}
                                />
                        </Form.Group>
                        <Form.Group style={{ display: law_number == "3" ? '' : 'none'}}>
                            <Form.Label>Параметр lambda_1:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="обьём м³"
                                pattern="[0-9]*"
                                value={parameters["lambda_1"]}
                                onInput={e => handleOnInput("lambda_1", e.target.value)}
                                />
                                <br/>
                            <Form.Label>Параметр m:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="обьём м³"
                                pattern="[0-9]*"
                                value={parameters["m"]}
                                onInput={e => handleOnInput("m", e.target.value)}
                                />
                        </Form.Group>
                    </Form>
                </Container>
            </NodeToolbar>

            <div style={{ width: nodeWidth, height: nodeHeight }} onClick={onFocusToChangePanelVisible}>
                <Handle type="target" position={Position.Left} />
                <Handle type="source" position={Position.Right} />

                <div style={{ display: 'flex' }} >
                    <label htmlFor="text" style={{ marginLeft: 10, marginTop: 4, whiteSpace: 'nowrap' }} >{label}</label>
                </div>
            </div>
        </>
    );
}
