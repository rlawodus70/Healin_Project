import React from 'react';
import './css/common.css';
import Login from './js/login';

class App extends React.Component {

  constructor(props) {
      super(props);

      // this.state = {
      //     id: null,
      //     password: null
      // };
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
      <Login />
    );
  }
}

// const App = () => {
//   return <Login />;
// }

export default App;