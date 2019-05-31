import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { search } from 'react-icons-kit/fa/search';

const Search = ({ labels, onChange }) => (
    <form className="search">
        <div className="icon">
            <Icon icon={search} />
        </div>
        <input
            type="text"
            className="search-field"
            onChange={onChange}
            placeholder={labels['search.placeholder']}
        />
    </form>
);

export default Search;
