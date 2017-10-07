import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { toggleTodo, receiveTodos } from '../actions';
import * as actions from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';

class VisibleTodoList extends Component {
  fetchData(){
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if(this.props.filter !== prevProps.filter) { // acts as a cache
      this.fetchData();
    }
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return <TodoList {...rest} onTodoClick={toggleTodo} />;
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: (id) => {
//       dispatch(toggleTodo(id));
//     },
//   };
// };

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
  // mapDispatchToProps // using shorthand
  // { onTodoClick: toggleTodo, receiveTodos }
)(VisibleTodoList));

export default VisibleTodoList;
