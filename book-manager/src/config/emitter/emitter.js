// 引入mitt
import mitt from "mitt";
// emitter:绑定事件、触发事件
const emitter = mitt();
// 暴露emitter
export default emitter;
