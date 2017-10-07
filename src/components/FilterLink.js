
import React from 'react';
import { Link, IndexLink } from 'react-router';

const FilterLink = ({filter, children}) => {
  const style = {
    textDecoration: 'none',
    color: 'black',
  };

  return filter === 'all'
         ? <IndexLink to ="/" activeStyle={style}>{children}</IndexLink>
         : <Link to={filter} activeStyle={style}>{children}</Link>
}

export default FilterLink;

// removed because we want the router to be in control
// import { connect } from 'react-redux';
// import { setVisibilityFilter } from '../actions';
// import Link from './Link';

// const mapStateToProps = (state, ownProps) => {
//   return {
//     active: ownProps.filter === state.visibilityFilter,
//   };
// };

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     onClick: () => {
//       dispatch(setVisibilityFilter(ownProps.filter));
//     },
//   };
// };

// const FilterLink = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Link);

// export default FilterLink;
