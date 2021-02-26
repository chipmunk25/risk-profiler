import React from 'react';
import "./style.scss"

import { Input } from 'antd'

const { Search } = Input;
const SearchBox = ({ placeholder, OnSearch }) => {
    return (
        <div className="search">
            <Search className="search__input" placeholder={placeholder}  onChange={OnSearch} onSearch={OnSearch} enterButton />
        </div>
    );
};

export default SearchBox;