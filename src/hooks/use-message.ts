import { getCurrentInstance } from 'vue';

export default function useMessage () {
  const currentInstance = getCurrentInstance();
  const { $message } = currentInstance!.appContext.config.globalProperties;
  return {
    $message
  };
}
