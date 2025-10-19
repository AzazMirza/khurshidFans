
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ComponentProps } from "react";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => (
  <NavigationMenu {...props} viewport={false}>
  <NavigationMenuList className="w-full flex justify-evenly">
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link className="nav-links" href="/">Home</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link className="nav-links" href="#">Blogs</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuTrigger className="nav-links">Store</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="flex flex-col w-[140px]">
          <NavigationMenuLink asChild>
            <Link className="border-b hover:bg-[var(--nav-color)] hover:text-white" href="#">
              Products
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link className="border-b hover:bg-[var(--nav-color)] hover:text-white" href="#">
              View Cart
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link className="border-b hover:bg-[var(--nav-color)] hover:text-white" href="#">
              Check Out
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link className="border-b hover:bg-[var(--nav-color)] hover:text-white" href="#">
              Profile
            </Link>
          </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuTrigger className="nav-links">Support</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="flex flex-col w-[140px]">
          <NavigationMenuLink asChild>
            <Link className="border-b hover:bg-[var(--nav-color)] hover:text-white" href="/#contact">
              Contact Us
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link className="border-b hover:bg-[var(--nav-color)] hover:text-white" href="/stillFaq">
              FAQ
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link className="border-b hover:bg-[var(--nav-color)] hover:text-white" href="\aboutus">
              About Us
            </Link>
          </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuTrigger className="nav-links">Customer Service</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="flex flex-col w-[140px]">
          <NavigationMenuLink asChild>
            <Link className="border-b hover:bg-[var(--nav-color)] hover:text-white" href="#">
              Complaint
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link className="border-b hover:bg-[var(--nav-color)] hover:text-white" href="#">
              Reviews
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link className="border-b hover:bg-[var(--nav-color)] hover:text-white" href="#">
              About Us
            </Link>
          </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link className="nav-links" href="#">Export Queries</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

);
