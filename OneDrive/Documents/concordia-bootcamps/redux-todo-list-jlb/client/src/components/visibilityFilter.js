import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../actions';
import { Filters } from '../actionTypes';
import styled from 'styled-components';

function VisibilityFilter({ activeFilter, setFilter }) {
    return (
        Filters.map((filter, i) => (
            <button
                className={filter === activeFilter ? 'active' : ''}
                onClick={() => setFilter(filter)}
                key={`filter-${i}`}>
                {filter}
            </button>
        ))
    )
}

// const FilterButton = styled.button`
//   background: hsl(258deg, 100%, 50%);
//   margin-left: 5px;
//   font-size: 15px;
//   border-radius: 5px;
//   color: white;
//   width: 100px;
//   height: 40px;
//   font-weight: bold;
//   cursor: pointer;
//   outline: none;
//   border: none;
// `;

const mapState = (state) => ({ activeFilter: state.visibilityFilter.activeFilter })
export default connect(mapState, { setFilter })(VisibilityFilter)
