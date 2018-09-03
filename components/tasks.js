import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTasks, updateTask, deleteTask } from '../actions/taskActions';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uuid: this.props.uuid, 
            title: this.props.title,
            is_completed: this.props.is_completed
        };
        this.deleteTask = this.deleteTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount(){
        this.props.fetchTasks();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newTask){
            this.props.tasks.unshift(nextProps.newTask);
        }
    }

    deleteTask(key) {
        const task = {
            uuid: key
        };
        this.props.deleteTask(task);  
    }
    
    updateTask(key, is_completed) {

        const task = {
            uuid: key,
            is_completed: true
        };
        this.props.updateTask(task);  
    }

    render() {
        const taskItems =  this.props.tasks.map(task => (
            <Grid container spacing={16}
            direction="row"
            justify="center"
            alignItems="center" key={task.uuid}>
                <Grid item xs={6}>
                        <li>
                        {task.title}
                        </li>
                </Grid>
                <Grid item xs={2}>
                    <Button color="secondary" mini aria-label="Complete" onClick={this.updateTask.bind(this, task.uuid, task.is_completed)}>
                    <DoneIcon />
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button color="secondary" mini aria-label="Delete" onClick={this.deleteTask.bind(this, task.uuid)}>
                    <DeleteIcon />
                    </Button>
                </Grid>
            </Grid>
            
        ));
        return (
        <div>
            <p>Ongoing tasks:</p>
            <ul name="todoList">
            {taskItems}
            </ul>
        </div>
        )
    }
}

Tasks.propTypes = {
    fetchTasks: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    newTask: PropTypes.object,
    deleteTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    tasks: state.tasks.items,
    newTask: state.tasks.item,
    deleteTask: state.tasks.item,
    updateTask: state.tasks.item
});

export default connect(mapStateToProps, { fetchTasks, updateTask, deleteTask })(Tasks);