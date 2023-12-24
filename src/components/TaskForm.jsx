import React, {useState} from 'react';

import './TaskForm.css'
import Tag from "./Tag.jsx";

const TaskForm = ({setTasks}) => {

    const [taskData, setTaskData] = useState({
        task: "",
        status: "todo",
        tags: []
    });

    const checkTag = (tag) => {
        return taskData.tags.some(item => item === tag);
    }

    const selectTag = (tag) => {
        if (taskData.tags.some(item => item === tag)) {
            const filteredTags = taskData.tags.filter(item => item !== tag);
            setTaskData(prevState => {
                return {...prevState, tags: filteredTags};
            });
        } else {
            setTaskData(prevState => {
                return {...prevState, tags: [...prevState.tags, tag]};
            });
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setTaskData(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTasks(prevState => {
            return [...prevState, taskData];
        });
        setTaskData({
            task: "",
            status: "todo",
            tags: []
        });
    }

    return (
        <div>
            <header className='app_header'>
                <form onSubmit={handleSubmit}>
                    <input name="task"
                           type='text'
                           value={taskData.task}
                           className='task_input'
                           placeholder='Enter your task'
                           onChange={handleChange}/>
                    <div className='task_form_bottom_line'>
                        <div>
                            <Tag tagName='HTML' selectTag={selectTag} selected={checkTag('HTML')}/>
                            <Tag tagName='CSS' selectTag={selectTag} selected={checkTag('CSS')}/>
                            <Tag tagName='JavaScript' selectTag={selectTag} selected={checkTag('JavaScript')}/>
                            <Tag tagName='React' selectTag={selectTag} selected={checkTag('React')}/>
                        </div>
                        <div>
                            <select name="status"
                                    value={taskData.status}
                                    className='task_status'
                                    onChange={handleChange}>
                                <option value='todo'>To Do</option>
                                <option value='doing'>Doing</option>
                                <option value='done'>Done</option>
                            </select>
                            <button type='submit' className='task_submit'>+ Add Task</button>
                        </div>
                    </div>
                </form>
            </header>
        </div>
    );
};

export default TaskForm;