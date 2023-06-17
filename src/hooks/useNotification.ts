import { notification } from 'antd';
import '@/styles/global.scss';

const useNotification = () => {
  const [messageApi, contextHolder] = notification.useNotification();

  const info = (value: string) => {
    messageApi.info({
      type: 'info',
      message: value,
      duration: 2,
      className: 'infoMessage',
      placement: 'topRight',
    });
  };

  const success = (value: string) => {
    messageApi.success({
      message: value,
      duration: 2,
      className: 'infoMessage',
      placement: 'topRight',
    });
  };

  const warning = (value: string) => {
    messageApi.warning({
      message: value,
      duration: 2,
      className: 'infoMessage',
      placement: 'topRight',
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
