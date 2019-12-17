import React from 'react';
import Login from './Login'
import Homepage from './Homepage';
import HomeworkImage from './HomeworkImage';
import { Switch, Route, withRouter } from 'react-router-dom';
import CreateAndSend from './CreateAndSend';

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
                <Route exact path = '/create' component={CreateAndSend} />
                <Route exact path = '/homework/:imgId' component={HomeworkImage} />
                </Switch>
            </div>
        )
    }
}
export default App;