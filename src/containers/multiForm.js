import React from "react";
import {Button, Segment, Header} from 'semantic-ui-react';
import Answers from "../components/answers";

class MultiForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleUserSelection = this.handleUserSelection.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            usersAnswers: new Array(props.questions.length),
            submitted: undefined,
            correctAnswers: props.questions.map((query) => query.answers)
        };
    }

    handleUserSelection(index, userSelection) {
        const tempUsersAnswers = this.state.usersAnswers;

        tempUsersAnswers.splice(index, 1, userSelection);

        this.setState({
            usersAnswers: tempUsersAnswers
        });
    }

    handleSubmit() {
        const userCorrectAnswers = MultiForm.checkAnswers(this.state.usersAnswers, this.state.correctAnswers);
        this.setState({submitted: true, userCorrectAnswers});
    }

    static checkAnswers(usersAnswers, correctAnswers) {
        return usersAnswers.map((answer, index) => {
            const answersCount = answer.filter(ans => ans).length;
            const matchedAnswers = correctAnswers[index].every(ans => !!answer[ans]);

            return matchedAnswers && answersCount === correctAnswers[index].length;
        });
    }

    render() {
        const {questions} = this.props;
        const {submitted, userCorrectAnswers} = this.state;

        return (
            <div className='multi-form'>
                <Header as='h1'>The Amazing Quiz</Header>
                {questions.map((query, index) => {
                    const correctAnswer = submitted && userCorrectAnswers[index];
                    const colorMap = {
                        undefined: 'black',
                        true: 'green',
                        false: 'red'
                    };

                    return (
                        <Segment key={index} color={(colorMap[correctAnswer])}
                                 className={'question ' + (correctAnswer ? 'correct' : 'incorrect')}>
                            <div>{query.question}</div>
                            <Answers possibleAnswers={query.possibleAnswers}
                                     onAnswerClick={this.handleUserSelection.bind(this, index)}/>
                        </Segment>
                    );
                })}
                <Button onClick={this.handleSubmit}>Submit Answers</Button>
            </div>);
    }
}

export default MultiForm;