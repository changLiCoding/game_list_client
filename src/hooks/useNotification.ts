import { message } from 'antd';

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
