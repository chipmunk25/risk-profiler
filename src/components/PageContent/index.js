import React from 'react';

import CustomScrollbars from "utils/CustomScrollbars"
import Datatable from "../Datatable"
import PageHeader from "../PageHeader"
const PageContent = (props) => {
    return (
        <CustomScrollbars className="gx-wall-scroll">
            <PageHeader {...props} />
            <Datatable {...props} />
        </CustomScrollbars>
    );
};

export default PageContent;