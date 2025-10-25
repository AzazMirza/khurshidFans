"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Search,
  Edit,
  Trash2,
} from "lucide-react";
import CuratedSidebar from "@/components/curatedsidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/app/types";
import {API} from '@/.env'
interface Products {
  products: Product[];
}



export default function Page() {
    
      const [products, setProducts] = useState<Product[]>([]);
      const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  //  (loading) ? (<div>Loading...</div>) :  
  // (!products.length) ? (<div>No products</div>) : 
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [imageFile, setImageFile] = useState<File | null>(null);

// Handle file input change
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0] || null;
  setImageFile(file);
};


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   try {
  //     const response = await fetch("http://192.168.1.102:3000/api/products", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         ...formData,
  //         price: Number(formData.price),
  //         stock: Number(formData.stock),
  //       }),
  //     });

  //     console.log(formData);

  //     if (!response.ok) throw new Error("Failed to create product");
      
  //     // Optionally refresh the page or update state
  //     // window.location.reload(); // Simple approach
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Failed to add product");
  //   }

  //   setIsDialogOpen(false);
  //   setFormData({ name: "", category: "", description: "", price: "", stock: "", image: "" });
  // };


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("category", formData.category);
  formDataToSend.append("description", formData.description);
  formDataToSend.append("price", formData.price);
  formDataToSend.append("stock", formData.stock);
  
  // ✅ Append the actual File object
  if (imageFile) {
    formDataToSend.append("image", imageFile, imageFile.name);
  }

  try {
    const response = await fetch("http://192.168.1.102:3000/api/products", {
      method: "POST",
      // ⚠️ DO NOT set Content-Type — browser sets it automatically with boundary
      body: formDataToSend, // ✅ Not JSON!
    });

    if (!response.ok) throw new Error("Failed to create product");
    
    // Refresh or update UI
    // window.location.reload();
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to add product");
  }

  setIsDialogOpen(false);
  setFormData({ name: "", category: "", description: "", price: "", stock: "", image: "" });
  setImageFile(null);
};

const handleDelete = async (id: number) => {
  try {
    const response = await fetch(`http://192.168.1.102:3000/api/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete product");
else{
    // window.location.reload();
  }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to delete product");
  } 
};

  return (
    <CuratedSidebar
      main={
        <main className="flex-1 p-6 bg-gray-50">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-3xl font-bold">Products</h1>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add New Product</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock" className="text-right">
                      Stock
                    </Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image
                    </Label>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      value={formData.image}
                      onChange={handleImageChange}
                      className="col-span-3"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                </form>
                <DialogFooter>
                  <Button type="submit" onClick={handleSubmit}>
                    Save Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search products..." className="pl-10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={{ pathname: "/productdetail", query: { id: product.id } }} >
                  <CardHeader>
                    <img src={`http://192.168.1.102:3000/${product.image}`} /> 
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                      <Badge
                        variant={
                          product.stock === 0
                            ? "destructive"
                            : product.stock < 10
                            ? "secondary"
                            : "default"
                        }
                      >
                        {product.stock === 0
                          ? "Out of Stock"
                          : product.stock < 10
                          ? "Low Stock"
                          : "In Stock"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          Stock: {product.stock} units
                        </p>
                      </div>
                    </div>
                  </CardContent>
              </Link>

                  <CardFooter className="flex gap-2">
                    <Button onClick={(e) => e.stopPropagation()} variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button onClick={(e) => {e.stopPropagation(); handleDelete(product.id)}} variant="outline" size="sm" className="flex-1">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </main>
      }
    />
  );
}