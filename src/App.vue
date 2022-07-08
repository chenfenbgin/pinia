<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import ProductList from "./components/ProductList.vue";
import Shopping from "./components/Shopping.vue";
</script>

<template>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <h1>Pinia - 购物车示例</h1>
  <hr />
  <h2>商品列表</h2>
  <ProductList />
  <hr />
  <Shopping />
</template>

<style>

</style>
