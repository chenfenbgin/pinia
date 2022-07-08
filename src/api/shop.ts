export interface IProduct {
  id: number;
  title: string;
  price: number;
  inventory: number; //  库存
}

const _products: IProduct[] = [
  { id: 1, title: "ipad", price: 3000, inventory: 100 },
  { id: 2, title: "xiaomi", price: 4000, inventory: 100 },
  { id: 3, title: "huawei", price: 5000, inventory: 100 },
];

export const getProducts = async () => {
  await wait(100);
  return _products;
};

// 订单解算
export const buyProducts = async () => {
  await wait(100);
  return Math.random() > 0.5;
};

async function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, delay);
  });
}
