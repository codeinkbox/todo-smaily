import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTask } from '../actions/taskActions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();

        const task = {
            title: this.state.title,
            is_completed: false
        };

        this.props.createTask(task);  
    }

    render() {
        return (
        <div>
            
            <form onSubmit={this.onSubmit}>
                <div>
                    <Grid container spacing={16} direction="row" justify="center">
                        <Grid item xs={8}>
                            <input type="text" name="title" className="taskBar" placeholder="Task description" onChange={this.onChange} value={this.state.title} />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="fab" className="fab" mini color="secondary" aria-label="Add" type="submit">
                            <AddIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </div>
        )
    }
}

TaskForm.propTypes = {
    createTask: PropTypes.func.isRequired
};

export default connect(null, { createTask })(TaskForm);
