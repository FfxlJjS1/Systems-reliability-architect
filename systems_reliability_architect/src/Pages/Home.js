import React, {Component} from 'react'

import MyDiagram from '../Components/Diagram/MyDiagram'
import ProbabilityChart from './FailureFreeOperatoinProbabilityChart'
import { Container, Button, Form, Row, Col } from 'react-bootstrap'

export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
                <Container className='mt-2'>
                    <Container style={{width: '600px'}}>
                        <Form>
                            <Button
                            className='mt-3 mb-3'
                            variant='primary'
                            type="button"
                            onClick={null}>
                                Очистить объекты
                            </Button>
                            
                            <Button
                            className='mt-3 mb-3'
                            variant='primary'
                            type="button"
                            onClick={null}>
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

                    <Container style={{width: '1000px', height: '830px'}}>
                        <Col>
                            <MyDiagram/>
                        </Col>
                        <Col>    
                            <ProbabilityChart/>
                        </Col>
                    </Container>
                </Container>
        )
    }
}

export default Home