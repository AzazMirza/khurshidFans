"use client";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Home, Users, Package, ShoppingCart } from "lucide-react";
import CuratedSidebar  from "@/components/curatedsidebar";

export default function Dashboard() {
  return (
    <CuratedSidebar main={        <main className="flex-1 p-4">
          <div className="mb-4">
            
            <SidebarTrigger />
          </div>
          <div className="flex justify-around flex-wrap gap-6 md:flex-nowrap">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Users</h3>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Total users: 100</p>
                  <Badge variant="default">NEW</Badge>
                </div>
                <Link href="/users" className="w-full">
                  <Button variant="outline" className="w-full">
                    View all users
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Products</h3>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Total products: 1000</p>
                  <Badge variant="default">NEW</Badge>
                </div>
                <Link href="/products" className="w-full">
                  <Button variant="outline" className="w-full">
                    View all products
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Orders</h3>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Total orders: 1000</p>
                  <Badge variant="default">NEW</Badge>
                </div>
                <Link href="/orders" className="w-full">
                  <Button variant="outline" className="w-full">
                    View all orders
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
}/>
  );
}