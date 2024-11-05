import React, {Component, useState} from 'react'

import MyDiagram, {initialNodes, NodesEdges}  from '../Components/Diagram/MyDiagram'
import ProbabilityChart from './FailureFreeOperatoinProbabilityChart'
import { Container, Button, Form } from 'react-bootstrap'

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
            // Преобразовать узлы и отношения для графика

            this.setState({my_graphic: <ProbabilityChart/>})
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
                        <MyDiagram />
                    </Container>
                    
                    {this.state.my_graphic}
                </Container>
        )
    }
}

export default Home