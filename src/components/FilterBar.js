import React from 'react';

import '../css/Misc.css';

const FilterBar = ({filter, setFilter}) => {
    return(
        <div className={"control-bar"}>
            <div className={filter == "all" ? "selected-filter" : "filter"} onClick={() => setFilter("all")}>All</div>
            <div className={filter == "captured" ? "selected-filter" : "filter"} onClick={() => setFilter("captured")}>Captured</div>
            <div className={filter == "not captured" ? "selected-filter" : "filter"} onClick={() => setFilter("not captured")}>Not Captured</div>
        </div>
    )
}

export default FilterBar