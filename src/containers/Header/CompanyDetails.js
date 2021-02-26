import React from 'react';
import { useSelector } from "react-redux"
const CompanyDetails = () => {
    const { user } = useSelector(({ auth }) => auth);

    return (
        <div>
            <div>
                <h3 className="gx-text-geekblue">{user.branch}</h3>
                <small>{user.role}</small>
            </div>
        </div>
    );
};

export default CompanyDetails;