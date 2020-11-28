import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './css/common.css';
import Login from './js/login';
import Main from './js/main';

class App extends React.Component {

  constructor(props) {
      super(props);
  }

  componentDidMount() {
    fetch('api/users')
    .then(res=>res.json())
    .then(data=>this.setState({
      id: data.id,
      password: data.password
    }));
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={Login}/>
        <Route exact path="/main" component={Main}/>
      </Router>
    );
  }
}

export default App;