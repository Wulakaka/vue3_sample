import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// 运行时的版本
import { computed } from "vue";

const app = createApp(App);

// 配置自动解包
app.config.unwrapInjectedRef = true;
app.use(router).mount("#app");

// 全局注册，注意引用时，标签的写法需要与组件名一致
app.component("todo-list", {
  data() {
    return {
      todos: ["Feed a cat", "Buy tickets"],
    };
  },
  provide() {
    return {
      todosLength: computed(() => this.todos.length),
    };
  },
  template: `
    <div>todo
      {{ todos.length }}
      <!-- 模板的其余部分 -->
      <button @click="todos.push('a')">add <todo-list-statistics/></button>
    </div>
  `,
});

app.component("todo-list-statistics", {
  inject: ["todosLength"],
  template: `
    <span>
      {{ todosLength }}
      <!-- 模板的其余部分 -->
    </span>
  `,
});
