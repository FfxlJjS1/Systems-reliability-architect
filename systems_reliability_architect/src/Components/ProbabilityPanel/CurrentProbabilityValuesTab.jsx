import React from "react";
import { useState } from "react";
import {Container, Form, Button} from 'react-bootstrap';
import transform_structure_from_mydiagram_to_graph from './DiagramTransformator';
import get_scheme_s_parallel_lines from './DiagramTransformator';

import { NodesEdges } from "../Diagram/MyDiagram";

const CurrentProbabilityValuesTab = () => {
    const [control_time, set_control_time] = useState(0);

    const handleOnInputControlTime = (e) => {
        if(e.target.value.match("^[0-9]*$") != null){
            set_control_time(parseInt(e.target.value));
        }
    }
    
    return (
        <Container> 
            <Form>
                <Form.Group>
                    <Form.Label> Контрольное время для вывода надежности ИС: </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="0"
                        value={control_time}
                        onInput={handleOnInputControlTime}
                        />    
                </Form.Group>
            </Form>    
        </Container>
    );
}

export default CurrentProbabilityValuesTab;