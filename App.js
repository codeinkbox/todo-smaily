import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Tasks from './components/tasks';
import TaskForm from './components/taskForm'
import store from './store'
import './css/main.css';


class App extends Component {
  render() {
    return (
      
      <Provider store={store}>
      
      <div className="container MainContainer">
      
      <Tasks />
      <div className="MainContainer-Header">
      <TaskForm />
      </div>
    </div>
    </Provider>
    );
  }
}

export default App;
