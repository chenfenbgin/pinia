import { defineStore } from "pinia";
import { getProducts, IProduct } from "../api/shop";

export const useProductsStore = defineStore("products", {
  state: () => {
    return {
      all: [] as IProduct[], //所有商品列表，
    };
  },
  getters: {},
  actions: {
    async loadAllProducts() {
      const res = await getProducts();
      this.all = res; // 返回的时IProduct[]数组，如果state中的all不指定类型，这里会报错
    },

    // 减库存
    decrementProduct(product: IProduct) {
      const res = this.all.find((item) => item.id === product.id);
      if (res) res.inventory--;
    },
  },
});
