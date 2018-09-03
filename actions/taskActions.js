import { FETCH_TASKS, NEW_TASK, DELETE_TASK_SUCCESS, UPDATE_TASK_SUCCESS } from './types';

export const fetchTasks = () => dispatch => {
    fetch('http://142.93.105.39/todos', {
        headers: {
            "Authorization" : `Smaily VGhyZWUgZXJyb3JzIHdhbGsgaW50byBhIGJhci4gVGhlIGJhcm1hbiBzYXlzLCAiTm9ybWFsbHkgSSdkIHRocm93IHlvdSBhbGwgb3V0LCBidXQgdG9uaWdodCBJJ2xsIG1ha2UgYW4gZXhjZXB0aW9uIg==`,
            'content-type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(tasks =>
        dispatch({
          type: FETCH_TASKS,
          payload: tasks.tasks
        })
      );
};

export const createTask = (taskData) => dispatch => {
    fetch('http://142.93.105.39/todos', {
        method: 'POST',
        headers: {
            "Authorization" : `Smaily VGhyZWUgZXJyb3JzIHdhbGsgaW50byBhIGJhci4gVGhlIGJhcm1hbiBzYXlzLCAiTm9ybWFsbHkgSSdkIHRocm93IHlvdSBhbGwgb3V0LCBidXQgdG9uaWdodCBJJ2xsIG1ha2UgYW4gZXhjZXB0aW9uIg==`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(taskData)
    })
    .then(res => res.json())
    .then(task => 
        dispatch({
            type: NEW_TASK,
            payload: task
        })
    );
};

export const deleteTask = (taskData) => dispatch => {
    fetch(`http://142.93.105.39/todos/${taskData.uuid}`, {
        method: 'DELETE',
        headers: {
            "Authorization" : `Smaily VGhyZWUgZXJyb3JzIHdhbGsgaW50byBhIGJhci4gVGhlIGJhcm1hbiBzYXlzLCAiTm9ybWFsbHkgSSdkIHRocm93IHlvdSBhbGwgb3V0LCBidXQgdG9uaWdodCBJJ2xsIG1ha2UgYW4gZXhjZXB0aW9uIg==`,
            'content-type': 'application/json'
        },
    })
    .then(task => 
        dispatch({
            type: DELETE_TASK_SUCCESS
        }),
        console.log(`Deleted ${taskData.uuid}`)
    );
};

export const updateTask = (taskData) => dispatch => {
    let is_completed = taskData.is_completed; 
    if (taskData.is_completed === true) {
        is_completed = "complete";
    } else {
        is_completed = "revert";
    }
    fetch(`http://142.93.105.39/todos/${taskData.uuid}`, {
        method: 'PATCH',
        headers: {
            "Authorization" : `Smaily VGhyZWUgZXJyb3JzIHdhbGsgaW50byBhIGJhci4gVGhlIGJhcm1hbiBzYXlzLCAiTm9ybWFsbHkgSSdkIHRocm93IHlvdSBhbGwgb3V0LCBidXQgdG9uaWdodCBJJ2xsIG1ha2UgYW4gZXhjZXB0aW9uIg==`,
            'content-type': 'application/json'
        },
        body: JSON.stringify( { "command": `${is_completed}` } ) 
    })
    .then(task => 
        dispatch({
            type: UPDATE_TASK_SUCCESS
        }),
        console.log(`Updated ${taskData.uuid}`)
    );
};