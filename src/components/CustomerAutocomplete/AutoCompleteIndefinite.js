
import React, { useState } from 'react';

import { Input, AutoComplete } from 'antd';
import FuzzySearch from 'fuzzy-search';
import { uniqWith, trim } from 'lodash'
let searcher;
const AutoCompleteIndefinite = ({ supplierLists, onSelectSupplier }) => {
    const [options, setOptions] = useState([]);
    const handleSearch = value => setOptions(value ? searchResult(value) : [])
    searcher = new FuzzySearch(supplierLists, ["supplier", "telephone", "contact_person"], { caseSensitive: false });

    const searchResult = query =>
        uniqWith(searcher.search(query.trim()), (locationA, locationB) =>
            trim(locationA.supplier) === trim(locationB.supplier) &&
            trim(locationA.telephone) === trim(locationB.telephone)
        ).map((item, index) => {
            return {
                value: item.id,
                label: (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}  >
                        <span> {item.supplier} </span>
                        <span> ({item.telephone} - {item.contact_person}) </span>
                    </div>
                ),
            };
        });

    const onSelect = value => {
        const data = supplierLists.find(item => parseInt(item.id) === parseInt(value))
        if (data) {
            onSelectSupplier(data)
        }
    };
    return (
        <AutoComplete dropdownMatchSelectWidth={400} className="search" style={{ minWidth: 300 }}
            options={options} onSelect={onSelect} onSearch={handleSearch}>
            <span className="search__input">
                <Input.Search size="large" placeholder="Supplier | Telephone| Contact Person" enterButton />
            </span>
        </AutoComplete>
    );
};

export default AutoCompleteIndefinite;