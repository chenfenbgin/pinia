import { defineStore } from "pinia";

// 1.定义并导出容器

// 参数1. 容器的 ID,必须唯一
// 参数2. 选项对象
// 返回值： 一个函数，得到函数容器实例
export const useMainStore = defineStore("main", {
  /**
   * 类似vue2组件中的data, 用来存储全局状态的
   * 必须是函数： 这样是为了在服务端渲染的时候，避免交叉请求导致的数据状态污染
   * 而且是箭头函数：是为了更好的 TS类型推导
   */
  state: () => {
    return {
      counter: 100,
      foo: "bar",
      arr: [1, 2, 3, 4, 5],
    };
  },
  //  类似于组件中的computed，用来封装计算属性的，有缓存的功能
  getters: {
    // 函数接受一个可选参数： state 状态对象
    // counterTen(state) {
    //   console.log("counterTen 调用了");
    //   return state.counter + 10;
    // },

    // 如果在 getters 中使用了 this 则必须手动指定返回的类型(在访问getters中的其他东西时)
    counterTen(): number {
      console.log('counterTen 调用了');
      return this.counter + 10
    }
  },

  // 注意：不能使用箭头函数定义 action, 箭头函数this指向问题
  actions: {
    changeState(num: number) {
      this.counter += num;
      this.foo = "foo";
      this.arr.push(5);

      // 这里也可以使用$patch
      // this.$patch({})
      // this.$patch(state => {})
    },
  },
});

// 2. 使用容器中的 state
// 3. 修改 state
// 4. 容器中的 action的使用
