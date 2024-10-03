import React, {Component} from 'react'

//import MyDiagram from '../Components/Diagram/MyDiagram'
import ProbabilityChart from './FailureFreeOperatoinProbabilityChart'

export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <ProbabilityChart/>
            </div>
        )
    }
}

export default Home