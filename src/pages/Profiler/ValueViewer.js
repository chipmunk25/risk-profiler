import React from "react";

import Widget from "components/Widget/index";

const ProfileValueViewer = ({ title, color, colorTitle }) => {
    return (
        <Widget styleName={`gx-card-full gx-py-4  gx-bg-${color}`}>
            <div className="gx-flex-row gx-justify-content-center gx-text-center">
                <h1 className={`gx-fs-iconcard gx-font-weight-heavy gx-text-${colorTitle}`}>{title}</h1>
            </div>
        </Widget>
    );
};

export default ProfileValueViewer;
