import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    email: '',
    password: '',
    isAuthenticated: false,
    type: null,
  }

  getLogin = () => {
    const { email, password } = this.state;
    axios.post('http://localhost:3000/api/auth/login', {
      email, password
    }).then((response) => {
      const { token, type } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('type', type);
      this.setState({ isAuthenticated: true });
      this.setState({ type })
    });
  }

  onChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');
    if (token && type) {
      this.setState({
        isAuthenticated: true,
        type
      });
    }
  }

  render() {
    return <div className="App">
      { !this.state.isAuthenticated ? <div>
        <input type="text" onChange={this.onChange} name="email" placeholder="Email" />
        <input type="password" onChange={this.onChange} name="password" placeholder="Password" />
        <button onClick={this.getLogin}>Login</button>
      </div> : <p>You're authenticated {this.state.type}</p>}
      
    </div>
  }
}

export default App;
