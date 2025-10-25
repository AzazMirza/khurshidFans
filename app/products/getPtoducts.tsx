// import { Product } from "@/app/types"; // We'll define this
// import Page from "./page";

// // Fetch data on the server (no CORS!)
// const getProducts = async (): Promise<Product[]> => {
//   const res = await fetch("http://192.168.1.102:3000/api/products", {
//     cache: "no-store", // Disable caching if data changes frequently
//   });
//   if (!res.ok) throw new Error("Failed to fetch products");
//   return res.json();
// };

// export default async function ProductsPage() {
//   const products = await getProducts();
//   return <Page products={products} />;
// }
