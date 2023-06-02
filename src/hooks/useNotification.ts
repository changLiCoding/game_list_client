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

  const warning = (value: string) => {
    messageApi.open({
      type: 'warning',
      content: value,
      duration: 2,
      className: 'infoMessage',
    });
  };

  return {
    warning,
    success,
    contextHolder,
    info,
  };
};

export default useNotification;
