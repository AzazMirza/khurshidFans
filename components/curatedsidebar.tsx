
"use client";
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
import { ReactNode } from "react"; 

export default function CuratedSidebar({ main }: { main: ReactNode }) {
  return (
<SidebarProvider>
      <div className="flex w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="px-4 py-2">
              <h2 className="text-lg font-semibold">Admin Dashboard</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard">
                        <Home className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/users">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/products">
                        <Package className="mr-2 h-4 w-4" />
                        <span>Products</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/orders">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>Orders</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-4 py-2 text-sm text-muted-foreground">
              Admin Panel v1.0
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1">{main}</main>
      </div>
    </SidebarProvider>
  )
}
