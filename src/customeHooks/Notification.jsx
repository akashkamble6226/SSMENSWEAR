import { notification } from "antd";

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, msg, desc) => {
    api[type]({
      message: msg,
      description: desc,
    });
  };
  return { openNotificationWithIcon, contextHolder };
};

export default useNotification;
