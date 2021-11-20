import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/reset.scss';
import 'element-plus/theme-chalk/el-message.css';
import { ElMessage } from 'element-plus';


createApp(App)
.use(ElMessage)
.use(router)
.mount('#app')
