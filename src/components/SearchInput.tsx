import React, {HTMLAttributes, InputHTMLAttributes} from 'react';
import searchImage from '../assets/images/search.png'
import '../assets/style/SearchInput.css'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement>{
    
}

function SearchInput(props:SearchInputProps) {
    return (
        <div className="search-input">
            <img src={searchImage} alt=""/>
            <input type="text" {...props}/>
        </div>
    );
}

export default SearchInput;