import { defineStore } from "pinia";
import { buyProducts, IProduct } from "../api/shop";
import { useProductsStore } from "../store/products";

// 定义一个类型，并且和IProduct合并
// type CartProduct = {
//   quantity: number
// } & IProduct
// 但是我们不需要库存属性，我们可以使用Omit进行过滤
type CartProduct = {
  quantity: number;
} & Omit<IProduct, "inventory">;

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cartProducts: [] as CartProduct[], //购物车商品列表
      checkoutStatus: null as null | string, //成功 | 失败
    };
  },

  getters: {
    totalPrice(state) {
      return state.cartProducts.reduce((pre, val) => {
        return pre + val.price * val.quantity;
      }, 0);
    },
  },

  actions: {
    addProductToCart(product: IProduct) {
      console.log("addProductToCart", product);
      // 1.看商品有没有库存
      if (product.inventory < 1) return;
      // 2.检查购物车中是否已有该商品
      const cartItem = this.cartProducts.find((item) => item.id == product.id);
      // 3.如果有商品数量+1；
      if (cartItem) {
        cartItem.quantity++;
      } else {
        // 4.没有直接添加到购物车
        this.cartProducts.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1, //第一次加到购物车的数量就是1
        });
      }
      // 5. 更新商品库存
      const productsStore = useProductsStore();
      productsStore.decrementProduct(product);
    },

    // 结算
    async checkout() {
      const res = await buyProducts();
      this.checkoutStatus = res ? "成功" : "失败";
      if (this.checkoutStatus) {
        this.cartProducts = [];
      }
    },
  },
});
