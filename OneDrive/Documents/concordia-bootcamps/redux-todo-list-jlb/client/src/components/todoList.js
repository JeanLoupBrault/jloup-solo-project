import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { FILTER_ALL, FILTER_COMPLETED } from '../actionTypes';
import { toggleTodo } from '../actions';
import styled from 'styled-components';

const Todo = ({ todo, id, toggleTodo }) => (
    <StyledList className={todo.completed ? 'completed' : ''} onClick={() => toggleTodo(id)}>{todo.content}</StyledList>
)

function TodoList({ todos, toggleTodo }) {
    return (
        _.keys(todos).map((id) => (
            <Todo key={id} id={id} toggleTodo={toggleTodo} todo={todos[id]} />
        ))
    )
}

const mapState = (state) => {
    if (state.visibilityFilter.activeFilter === FILTER_ALL) {
        return { todos: state.todos.data }
    } else if (state.visibilityFilter.activeFilter === FILTER_COMPLETED) {
        return ({
            todos: _.pick(state.todos.data, (todo) => todo.completed)
        })
    } else {
        return ({
            todos: _.pick(state.todos.data, (todo) => !todo.completed)
        })
    }
}

const StyledList = styled.li`
  width: 300px;
  height: 40px;
  font-size: 18px;
  option {
    font-size: 18px;
  }
`;

export default connect(mapState, { toggleTodo })(TodoList);
