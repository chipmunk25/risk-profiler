
import { message } from 'antd';

const AlertMessage = (type, msg, key, duration) => {
    switch (type) {
        case "success":
            message.success({ content: msg, duration, key });
            break;
        case "loading":
            message.loading({ content: msg, duration, key });
            break;

        case "error":
            message.error({ content: msg, duration, key });
            break;
        default:
            message.destroy();
            break;
    }
};

export default AlertMessage
