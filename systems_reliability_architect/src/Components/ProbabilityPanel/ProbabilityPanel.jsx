import { Component } from "react";
import { Container } from 'react-bootstrap';

import RangeProbabilityChartTab from "./RangeProbabilityChartTab";
import CurrentProbabilityValuesTab from './CurrentProbabilityValuesTab';
import Tabs from "./Tabs";

export class ProbabilityPanel extends Component {
    constructor(props) {
        super (props);

        this.tabs = [
          { label: 'По диапазону', content: <RangeProbabilityChartTab /> },
          { label: 'По константе', content: <CurrentProbabilityValuesTab /> },
          { label: 'Таблица переходов', content: null }
        ];
    }

    render () {
        return (
            <Container className="sidebar">
                <Tabs tabs={this.tabs} />
            </Container>
        )
    }
}

export default ProbabilityPanel;
