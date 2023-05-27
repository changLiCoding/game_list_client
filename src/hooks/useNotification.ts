import { message } from 'antd';
import '@/styles/global.scss';

const useNotification = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const info = (value: string) => {
    messageApi.open({
      type: 'info',
      content: value,
      duration: 2,
      className: 'infoMessage',
    });
  };

  const success = (value: string) => {
    messageApi.open({
      type: 'success',
      content: value,
      duration: 2,
      className: 'infoMessage',
    });
  };

  const warrning = (value: string) => {
    messageApi.open({
      type: 'warning',
      content: value,
      duration: 2,
      className: 'infoMessage',
    });
  };

  return {
    warrning,
    success,
    contextHolder,
    info,
  };
};

export default useNotification;
