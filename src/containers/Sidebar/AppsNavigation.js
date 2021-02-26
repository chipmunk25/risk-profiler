import React from "react";
import { Popover } from "antd"
import AppNotification from "components/AppNotification";
import MailNotification from "components/MailNotification";

const AppsNavigation = () =>
  <ul className="gx-app-nav">

    <li>
      <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={<AppNotification />}
        trigger="click">
        <span className="gx-pointer gx-status-pos gx-d-block">
          <i className="icon icon-notification" />
        </span>
      </Popover>
    </li>
    <li>
      <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={<MailNotification />}
        trigger="click">
        <span className="gx-pointer gx-status-pos gx-d-block">
          <i className="icon icon-chat-new" />
        </span>
      </Popover>
    </li>

  </ul>;

export default AppsNavigation;
