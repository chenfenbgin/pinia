<template>
  <div>
    {{ mainStore.counter }}
    {{ mainStore.foo }}
    {{ mainStore.arr }}
    <p>{{ mainStore.counterTen }}</p>
    <p>{{ mainStore.counterTen }}</p>
    <p>{{ mainStore.counterTen }}</p>
    <hr />
    <!-- 上面的写法是有些繁琐的 -->
    <p>{{ counter }}</p>
    <p>{{ foo }}</p>
    <hr />
    <p><button @click="changeData">修改数据</button></p>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useMainStore } from "../store/index";

const mainStore = useMainStore();
console.log(mainStore.counter);

// 这样写是有问题的，counter，foo不是响应式的
// pinia 其实就是把 state 数据都做了 reactive 处理
// const { counter, foo } = mainStore;

// 改成响应式，需要使用 storeToRefs
// 把解构出来的数据做 ref 响应式代理，如果要访问counter,需要使用counter.value
const { counter, foo } = storeToRefs(mainStore);

console.log("counter=", counter.value);

const changeData = () => {
  // 数据修改方式一：
  // mainStore.counter++;

  // 数据修改方式二：如果修改多个数据，建议使用 $patch 进行批量更新
  // mainStore.$patch({
  //   counter: counter.value++,
  //   foo: "foo",
  // });
  // mainStore.$patch({
  //   counter: mainStore.counter ++,
  //   foo: 'foo',
  // })

  // 数据修改方式三：$patch 接受一个函数，批量更新
  // mainStore.$patch(state => {
  //   state.counter ++;
  //   state.foo = "foo";
  //   state.arr.push(4)
  // })

  // 数据修改方式四：逻辑比较多的时候，可以封装到 actions中处理
  mainStore.changeState(100);
};
</script>

<style lang="scss" scoped></style>
