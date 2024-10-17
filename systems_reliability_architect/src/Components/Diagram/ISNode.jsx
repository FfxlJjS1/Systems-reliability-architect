import { useState } from 'react';
import { Handle, Position, NodeToolbar } from 'reactflow';
import { Col, Row, Container, Form } from "react-bootstrap";

export function ISNode({ data }) {
    const customizeProp = data.customize;
    const nodeWidth = data.width;
    const nodeHeight = data.height;

    // Focus and blur node
    const [panel_visible_state, set_focus_state] = useState(false);

    const onFocusToChangePanelVisible = (e) => {
        set_focus_state(!panel_visible_state);
    }

    const [node_panel_text, set_node_panel_text] = useState(<div><label htmlFor="text" style={{ marginTop: '5px' }}>Reload</label></div>);

    const handleReloadNodeInformation = (e) => {
        set_node_panel_text(<div><label>Текст</label></div>)
    }

    data.handleReloadNodeInformation = handleReloadNodeInformation;

    return (
        <>
            <NodeToolbar 
                position={Position.Left}
                isVisible={data.isGroupNode != true ? true : false}
                style={{zIndex: 3} }>
                <Container className="node-status-panel" style={{ display: panel_visible_state ? '' : 'none', paddingRight: "0px" }}>
                    <Form>
                        <Form.Group>
                            <Form.Select style={{width: '180px'}}>
                                <option value="1">Экспоненциальный закон</option>
                                <option value="2">Распределение Рэлея</option>
                                <option value="3">Распределение Вэйбулля</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    <Row className="node-button-panel-area">
                        <Col md="auto">
                            <button onClick={handleReloadNodeInformation}>↻</button>
                        </Col>
                    </Row>

                    <Row>
                    <Col md="auto">
                            {node_panel_text}
                        </Col>
                    </Row>
                </Container>
            </NodeToolbar>

            <div style={{ width: nodeWidth, height: nodeHeight }} onClick={onFocusToChangePanelVisible}>
                <Handle type="target" position={Position.Left} />
                <Handle type="source" position={Position.Right} />

                <div style={{ display: 'flex' }} >
                    <label htmlFor="text" style={{ marginLeft: 10, marginTop: 4, whiteSpace: 'nowrap' }} >{data.label}</label>
                </div>
            </div>
        </>
    );
}
