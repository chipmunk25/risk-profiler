import React from 'react';
import { Input, AutoComplete } from 'antd';

const AutoCompleteDefinite = ({ peopleLists, searchPersonPlaceholder, onSelectPeople, selectedPeople ,customStyle}) => {

    const options = peopleLists && peopleLists.map((item, index) => {
        return {
            value: item.id.toString(),
            label: (<div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}  >
                <span> {item.supplier ? item.supplier : item.customer} </span>
                <span> ({item.telephone} - {item.contact_person ? item.contact_person : null}) </span>
            </div>),
            searcher: { ...item }
        }
    })

    const onSelect = value => {
        const data = peopleLists.find(item => parseInt(item.id) === parseInt(value))
        if (data) {
            onSelectPeople(data)
        }
    };
    const filterOption = (inputValue, option) => {
        const supplier = option.searcher.supplier ? option.searcher.supplier.toUpperCase().indexOf(inputValue.toString().toUpperCase()) !== -1 : false
        const customer = option.searcher.customer ? option.searcher.customer.toUpperCase().indexOf(inputValue.toString().toUpperCase()) !== -1 : false
        const telephone = option.searcher.telephone ? option.searcher.telephone.toUpperCase().indexOf(inputValue.toString().toUpperCase()) !== -1 : false
        const contact_person = option.searcher.contact_person ? option.searcher.contact_person.toUpperCase().indexOf(inputValue.toString().toUpperCase()) !== -1 : false

        return supplier || customer || telephone || contact_person ||
            option.value.toUpperCase().indexOf(inputValue.toString().toUpperCase()) !== -1

    }

    return (
        <AutoComplete dropdownMatchSelectWidth={400} className="search" style={customStyle}
         //   value={selectedPeople ? selectedPeople.id : ""}
            onSelect={onSelect}
            options={options.length > 0 ? options : []}
            filterOption={filterOption}
        >
            <span className="search__input">
                <Input.Search size="large" placeholder={searchPersonPlaceholder} enterButton />
            </span>
        </AutoComplete>

    );
};

export default AutoCompleteDefinite;