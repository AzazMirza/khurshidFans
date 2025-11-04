// app/ui/products/client-page.tsx
// This is the Client Component for the interactive parts of the products page.
// It handles state for dialogs, forms, image previews, and API calls for mutations.
'use client'; // This directive is crucial for this file
import Pagination from '@/components/pagination'; // Client Component
import Search from '@/components/search'; // Client Component
import { useState, useEffect } from 'react'; // Import hooks here
import { Product } from '@/app/types'; // Ensure this type is accessible
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Edit, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // Import Input for the dialogs

interface ProductPageClientProps {
  initialProducts: Product[];
  totalPages: number;
  query: string;
  currentPage: number;
}

export default function ProductPageClient({ initialProducts, totalPages, query, currentPage }: ProductPageClientProps) {
  // Client-side state for UI interactions (dialogs, forms)
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryImagePreviews, setGalleryImagePreviews] = useState<string[]>([]);
  const [existingGalleryImages, setExistingGalleryImages] = useState<string[]>([]); // For existing image URLs from the product

  

  // useEffect is imported from 'react' in this file
  useEffect(() => {
    return () => {
      // Cleanup object URLs to prevent memory leaks
      galleryImagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [galleryImagePreviews]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);
  // Append new files to the existing ones
  const newGalleryImages = [...galleryImages, ...files];
  setGalleryImages(newGalleryImages);

  // Generate previews for all files (existing and new)
  const newUrls = newGalleryImages.map(file => URL.createObjectURL(file));
  setGalleryImagePreviews(newUrls);
};

// Add this new function
const handleRemoveGalleryImage = (index: number) => {
  // Create new arrays excluding the item at the specified index
  const newGalleryImages = galleryImages.filter((_, i) => i !== index);
  const newPreviews = galleryImagePreviews.filter((_, i) => i !== index);

  setGalleryImages(newGalleryImages);
  setGalleryImagePreviews(newPreviews);

};

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      stock: "",
    });
    setImageFile(null);
    setGalleryImages([]);
    setGalleryImagePreviews([]);
    setSelectedProduct(null);
  };

  // ADD PRODUCT
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stock", formData.stock);

    if (imageFile) {
      formDataToSend.append("image", imageFile, imageFile.name);
    }

    galleryImages.forEach((file) => {
      formDataToSend.append("images", file);
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/products`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to create product");

      setIsAddDialogOpen(false);
      resetForm();
      // After successful API call, you could trigger a re-fetch of the page data
      // For example, by navigating to the same URL or using router.refresh() if applicable
      // window.location.reload(); // One way, but not ideal
      // router.push(window.location.pathname + window.location.search); // Another way
      // Or, rely on the URL state change if the API call leads to a redirect elsewhere
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product");
    }
  };

  // EDIT PRODUCT
  // EDIT PRODUCT
  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description || "",
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    // Set existing gallery image URLs
    setExistingGalleryImages(product.images || []); // Use product.images, fallback to empty array
    // Reset newly added files and their previews
    setGalleryImages([]);
    setGalleryImagePreviews([]);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stock", formData.stock);

    if (imageFile) {
      formDataToSend.append("image", imageFile, imageFile.name);
    }

    // Append *newly added* gallery images
    galleryImages.forEach((file) => {
      formDataToSend.append("galleryImages", file); // Use the correct key expected by backend
    });

    // If your backend supports sending the *full* list of image URLs (existing + new) to update the product,
    // you might send them like this:
    // const allImageUrls = [...existingGalleryImages, ...galleryImages.map(f => f.name)]; // Or send filenames if backend expects them
    // allImageUrls.forEach(url => formDataToSend.append("galleryImages", url));

    // If your backend requires explicit removal actions, you might need to send a list of URLs to delete separately.
    // This logic depends heavily on your backend API design.

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/products/${selectedProduct.id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (!response.ok) throw new Error("Failed to update product");

      setIsEditDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update product");
    }
  };

  // DELETE PRODUCT
  const handleDeleteClick = (id: number) => {
    setDeleteProductId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteProductId) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/products/${deleteProductId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete product");

      setIsDeleteDialogOpen(false);
      setDeleteProductId(null);
      // After successful API call, you could trigger a re-fetch of the page data
      // window.location.reload(); // One way, but not ideal
      // router.push(window.location.pathname + window.location.search);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex justify-between w-full sm:w-min items-center gap-4">
          <SidebarTrigger className="position-absolute top-2 left-2" />
          <h1 className={` text-3xl font-bold`}>Products</h1>
        </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">


      <div className=" flex flex-col sm:flex-row gap-4">
        <Search placeholder="Search products..." />
      </div>


        {/* ADD PRODUCT DIALOG */}
<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
  <DialogTrigger asChild>
    <Button className="" >Add Product</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Add Product</DialogTitle>
    </DialogHeader>
    <form onSubmit={handleAddSubmit} className="flex flex-col gap-4 py-4">
      <div className="flex flex-row items-center gap-4">
        <Label htmlFor="name" className="text-right w-1/4">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="flex-1"
          required
        />
      </div>
      <div className="flex flex-row items-center gap-4">
        <Label htmlFor="category" className="text-right w-1/4">
          Category
        </Label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="flex-1"
          required
        />
      </div>
      <div className="flex flex-row items-center gap-4">
        <Label htmlFor="price" className="text-right w-1/4">
          Price
        </Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={handleInputChange}
          className="flex-1"
          required
        />
      </div>
      <div className="flex flex-row items-center gap-4">
        <Label htmlFor="stock" className="text-right w-1/4">
          Stock
        </Label>
        <Input
          id="stock"
          name="stock"
          type="number"
          min="0"
          value={formData.stock}
          onChange={handleInputChange}
          className="flex-1"
          required
        />
      </div>
      <div className="flex flex-row items-center gap-4">
        <Label htmlFor="image" className="text-right w-1/4">
          Display Image
        </Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="flex-1"
        />
      </div>
      <div className="flex flex-row items-center gap-4">
        <Label htmlFor="images" className="text-right w-1/4">
          Images Gallery
        </Label>
        <Input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryImageChange}
          className="flex-1"
        />
      </div>

      {galleryImagePreviews.length > 0 && (
        <ul className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
          {galleryImagePreviews.map((url, index) => (
            <li key={index} className="relative aspect-square overflow-hidden rounded group"> {/* Added 'group' class */}
              <img
                src={url}
                alt={`gallery-preview-${index}`}
                className=" object-cover"
                width={125} 
                height={125}
              />
              {/* Remove button, shown on hover */}
              <button
                type="button"
                onClick={() => handleRemoveGalleryImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove image ${index + 1}`}
              >
                <X className="h-3 w-3" /> {/* You'll need to import X from lucide-react */}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-row items-center gap-4">
        <Label htmlFor="description" className="text-right w-1/4">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="flex-1"
          required
        />
      </div>
      <DialogFooter>
        <Button type="submit">Save Product</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>    

  </div>
</div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="flex flex-col gap-4 py-4">
            {/* ... other input fields (name, category, etc.) ... */}
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="edit-name" className="text-right w-1/4">
                Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="flex-1"
                required
              />
            </div>
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="edit-category" className="text-right w-1/4">
                Category
              </Label>
              <Input
                id="edit-category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="flex-1"
                required
              />
            </div>
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="edit-price" className="text-right w-1/4">
                Price
              </Label>
              <Input
                id="edit-price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                className="flex-1"
                required
              />
            </div>
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="edit-stock" className="text-right w-1/4">
                Stock
              </Label>
              <Input
                id="edit-stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                className="flex-1"
                required
              />
            </div>
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="edit-image" className=" w-1/4">
                Display Image
              </Label>
              <Input
                id="edit-image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="flex-1"
                placeholder="Leave empty to keep current image"
                aria-placeholder=""
              />
              
            </div>
            <p className='text-sm text-right pr-1 text-gray-600'>

            Leave empty to keep current image
            </p>
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="edit-images" className=" w-1/4">
                Images Gallery
              </Label>
              <Input
                id="edit-images"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryImageChange}
                className="flex-1"
              />
            </div>

            {/* Show previews for both existing and newly added images */}
            {(existingGalleryImages.length > 0 || galleryImagePreviews.length > 0) && (
              <ul className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                {/* Render existing images */}
                {existingGalleryImages.map((url, index) => (
                  <li key={`existing-${index}`} className="relative aspect-square overflow-hidden rounded group">
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMG}${url}`} // Prepend base URL
                      alt={`existing-gallery-image-${index}`}
                      className=" object-cover"
                      width={125}
                      height={125}
                    />
                    {/* Optional: Add a visual indicator that this image is existing */}
                    {/* <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs rounded-full px-1">Existing</div> */}
                  </li>
                ))}
                {/* Render previews for newly added images */}
                {galleryImagePreviews.map((url, index) => (
                  <li key={`new-${index}`} className="relative aspect-square overflow-hidden rounded group">
                    <img
                      src={url} // Use the object URL for previews
                      alt={`gallery-preview-${index}`}
                      className=" object-cover"
                      width={125}
                      height={125}
                    />
                    {/* Remove button for newly added images */}
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(index)} // Pass index of the *new* file
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={`Remove image ${index + 1}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="edit-description" className="text-right w-1/4">
                Description
              </Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="flex-1"
                required
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Update Product</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* DELETE CONFIRMATION DIALOG */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setDeleteProductId(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link href={`/products/${product.id}`}>
              <CardHeader>
                <img
                  src={`${process.env.NEXT_PUBLIC_IMG}${product.image}`}
                  alt={product.name}
                  className="w-full h-72 object-cover"
                />
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
                    <p className="text-sm text-muted-foreground">Stock: {product.stock} units</p>
                  </div>
                </div>
              </CardContent>
            </Link>

            <CardFooter className="flex gap-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(product);
                }}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(product.id);
                }}
                variant="outline"
                size="sm"
                className="flex-1 text-red-600 hover:text-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="mt-8 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}