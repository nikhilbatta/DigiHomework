import React from 'react';
import Login from './Login'
import Homepage from './Homepage';
import HomeworkImage from './HomeworkImage';
import { Switch, Route, withRouter } from 'react-router-dom';
import CreateAndSend from './CreateAndSend';
import Homework from './Homework';
import StudentHomework from './StudentHomework';

class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Switch>
                <Route exact path ='/' component={Login}/>
                <Route exact path ='/homepage' component={Homepage} />
                <Route exact path = '/create/:pID' component={CreateAndSend} />
                <Route exact path = '/period/homework/:pID' component={Homework}/>
                <Route exact path = '/period/homework/image/:imgId' component={HomeworkImage} />
                <Route exact path = '/sh/:shID' component={StudentHomework}/>
                </Switch>
            </div>
        )
    }
}
export default App;