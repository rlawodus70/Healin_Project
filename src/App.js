import React from 'react';
import commonCss from './css/common.css';
import loginCss from './css/login.css';
import Login from './js/login';

// class App extends React.Component {

//   constructor(props) {
//       super(props);
//       this.state = {
//           id: null,
//           password: null
//       };
//   }

//   componentDidMount() {
//     fetch('api/users')
//     .then(res=>res.json())
//     .then(data=>this.setState({
//       id: data.id,
//       password: data.password
//     }));
//   }

//   render() {
//     const id = this.state.id;
//     return (
//       <div className="App">
//         <header className="App-header">
//           {`Hello ${id}`}
//         </header>
//       </div>
//     );
//   }
// }

const App = () => {
  return <Login />;
}

export default App;