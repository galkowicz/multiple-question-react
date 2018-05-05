import React, {Component} from 'react';
import {Segment} from 'semantic-ui-react';

class Answers extends Component {
    constructor(props) {
        super(props);

        const chosenArray = Array.apply(null, Array(props.possibleAnswers.length)).map(() => false);
        this.state = {chosen: chosenArray}
    }

    handleAnswerClick(index) {
        const newArray = this.state.chosen;
        newArray[index] = !newArray[index];

        this.setState({chosen: newArray});
        this.props.onAnswerClick(newArray);
    }

    render() {
        const {possibleAnswers} = this.props;

        return (
            <Segment.Group
                className='possible-answers'>
                {possibleAnswers.map((answer, index) => {
                    return (
                        <Segment className={(this.state.chosen[index] ? 'chosen' : '')}
                                 key={index}
                                 onClick={this.handleAnswerClick.bind(this, index)}>{answer}</Segment>
                    );
                })}
            </Segment.Group>
        );
    }
}

export default Answers;