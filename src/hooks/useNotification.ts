import { message } from "antd";
import React, { useEffect, useState } from "react";

const useNotification = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const info = (value: string) => {
    messageApi.info(value);
  };

  return {
    contextHolder,
    info,
  };
};

export default useNotification;
