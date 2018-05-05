import React, {Component} from 'react';
import './App.css';
import {Container} from 'semantic-ui-react';
import MultiForm from './containers/multiForm';
import serverData from './mocks/serverData';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Container>
                    <MultiForm questions={serverData.questions}/>
                </Container>
            </div>
        );
    }
}

export default App;
