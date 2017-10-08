import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { toggleTodo, receiveTodos } from '../actions';
import * as actions from '../actions';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers';
import TodoList from './TodoList';
import FetchError from './FetchError'


class VisibleTodoList extends Component {
  fetchData(){
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) { // post render
    if(this.props.filter !== prevProps.filter) { // acts as a cache?
      this.fetchData();
    }
  }

  render() {
    const { toggleTodo, errorMessage, todos, isFetching } = this.props;

    if(isFetching && !todos.length){
      return <p>Loading...</p>
    }
    if(errorMessage && !todos.length){
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()} />
      );
    }

    return <TodoList todos={todos} onTodoClick={toggleTodo} />;
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter), // a selector, not a reducer
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
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
