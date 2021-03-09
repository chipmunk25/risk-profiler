import React, { useEffect } from 'react';
import "./style.scss"
import logo from "images/finallogo-w.png"

import { useDispatch, useSelector } from 'react-redux';
import { requestGetBranch, } from "appRedux/Actions/auth"
const ReportHeader = ({ reportTitle }) => {
    const dispatch = useDispatch()
    const { branchLists, user } = useSelector(({ auth }) => auth);
    useEffect(() => { dispatch(requestGetBranch({ company_id: user.company_id, })) }, [])
  //  console.log(user)
    const FindBranch = branch_id => branchLists.find(item => parseInt(item.id) === parseInt(branch_id))

    return (

        <header>
            <div className="row report-header-container">
                <div className="col">
                    <a target="_blank" href="https://riskprofiler.chipsoftgh.com" rel="noreferrer">
                        <img src={logo} data-holder-rendered="true" alt="logo" />
                    </a>
                </div>
                <div className="col company-details">
                    <h2 className="name">
                        <a target="_blank" href="https://riskprofiler.chipsoftgh.com" rel="noreferrer">
                            {user.company}   </a>
                    </h2>
                  {/*   <h4>Branch Details</h4>
                    <div>Name: {FindBranch(user.branch_id) ? FindBranch(user.branch_id).branch_name : ""}</div>
                    <div>Contact: {FindBranch(user.branch_id) ? FindBranch(user.branch_id).telephone : ""}</div>
                    <div>Location: {FindBranch(user.branch_id) ? FindBranch(user.branch_id).address : ""}</div>
                    <div>Email: {FindBranch(user.branch_id) ? FindBranch(user.branch_id).email : ""}</div> */}
                    <div>website:https://riskprofiler.chipsoftgh.com</div>
                </div>
            </div>
            <div><h1 className="gx-text-center">{reportTitle}</h1></div>
        </header>

    );
};

export default ReportHeader;