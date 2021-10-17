import React from 'react';

import '../css/Misc.css';

//icons
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';

const SearchBar = ({input, currentSearch, onChange, onSubmit, onClear}) => {

    function onKeyDown(event){
        if(event.key == "Enter"){
            onSubmit();
        }else if(event.key == "Escape"){
            onClear();
        }
    }

    return(
        <div className={"control-bar"}>
            <input className="text-input" type="text" placeholder="Search..." value={input} onChange={onChange} onKeyDown={(event) => onKeyDown(event)}></input>
            {currentSearch != ""? <CancelIcon className="cancel-icon" onClick={onClear} fontSize="small"/> : null}
            <SearchIcon className="search-icon" onClick={onSubmit}/>
        </div>
    )
}

export default SearchBar