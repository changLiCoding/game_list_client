import { message } from "antd";
import React from "react";

const useNotification = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const info = (data: string) => {
    messageApi.info(data);
  };

  return {
    contextHolder,
    info,
  };
};

export default useNotification;
