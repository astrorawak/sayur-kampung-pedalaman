import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, Category, BlogPost } from '../types';
import { products as defaultProducts, categories as defaultCategories } from '../data/products';
import { blogPosts as defaultBlogPosts } from '../data/blog';

interface AdminStore {
  products: Product[];
  categories: Category[];
  blogPosts: BlogPost[];

  // Products
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;

  // Categories
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: number) => void;

  // Blog Posts
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: number) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      products: defaultProducts,
      categories: defaultCategories,
      blogPosts: defaultBlogPosts,

      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === product.id ? product : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({ products: state.products.filter((p) => p.id !== id) })),

      addCategory: (category) =>
        set((state) => ({ categories: [...state.categories, category] })),
      updateCategory: (category) =>
        set((state) => ({
          categories: state.categories.map((c) => (c.id === category.id ? category : c)),
        })),
      deleteCategory: (id) =>
        set((state) => ({ categories: state.categories.filter((c) => c.id !== id) })),

      addBlogPost: (post) =>
        set((state) => ({ blogPosts: [...state.blogPosts, post] })),
      updateBlogPost: (post) =>
        set((state) => ({
          blogPosts: state.blogPosts.map((p) => (p.id === post.id ? post : p)),
        })),
      deleteBlogPost: (id) =>
        set((state) => ({ blogPosts: state.blogPosts.filter((p) => p.id !== id) })),
    }),
    {
      name: 'sayur-kampung-admin',
    }
  )
);
