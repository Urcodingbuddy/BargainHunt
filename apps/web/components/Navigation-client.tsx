"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Comparisons: { title: string; href: string; description: string }[] = [
  {
    title: "Samsung Galaxy S24 Ultra",
    href: "/compare?q=Samsung+Galaxy+S24+Ultra",
    description:
      "The Samsung Galaxy S24 Ultra features a 6.8-inch Dynamic AMOLED display, Exynos 2200 processor, and a versatile quad-camera setup. Available in Phantom Black, Silver, and Navy Blue colors.",
  },
  {
    title: "Apple Watch Series 9",
    href: "/compare?q=Apple+Watch+Series+9",
    description:
      "The Apple Watch Series 9 offers advanced health tracking features, an always-on Retina display, and improved battery life. Compatible with a wide range of bands and accessories.",
  },
  {
    title: "Asus vivobook 15",
    href: "/compare?q=asus+vivobook+15",
    description:
      "The Asus Vivobook 15 features a 15.6-inch FHD display, Intel Core i5 processor, and 8GB RAM. It is lightweight and portable, making it ideal for students and professionals.",
  },
  {
    title: "SAMSUNG Odyssey G35 Gaming Monitor",
    href: "/compare?q=SAMSUNG+Odyssey+G35",
    description:
      "The SAMSUNG Odyssey G35 features a 144Hz refresh rate, 1ms response time, and AMD FreeSync Premium technology, providing an immersive gaming experience with stunning visuals.",
  },
  {
    title: "Canon EOS R10 Mirrorless Camera",
    href: "/compare?q=Canon+EOS+R7",
    description:
      "The Canon EOS R10 features a 24.2 MP CMOS sensor, 4K video recording, and advanced autofocus capabilities, making it ideal for both photography enthusiasts and professionals.",
  },
  {
    title: "Samsung 55-Inch Neo QLED 4K TV",
    href: "/compare?q=Samsung+QN90B+55-Inch",
    description:
      "The Samsung QN90B offers Quantum Matrix Technology, Neo Quantum Processor 4K, and Object Tracking Sound+, delivering an immersive viewing experience with stunning picture quality.",
  },
];

export function NavigationClient() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>More</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <img src="./bargainHunt Logo.png" alt="Icon" />

                    <div className="mb-2 mt-4 text-lg font-medium">
                      Bargain<span className="text-purple-600">Hunt</span>
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Your smart way to compare and save on the best online
                      deals!.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/blogs" title="Articles">
                Explore Our Articles to Stay Informed in E-commerce and Maximize
                Your Savings.
              </ListItem>
              <ListItem href="/guides" title="Shopping Guides">
                Discover our comprehensive shopping guides to make informed and
                efficient purchasing decisions.
              </ListItem>
              <ListItem href="/about" title="About Us">
                Learn more about our mission and the team behind BargainHunt.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Comparisons</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {Comparisons.map((product) => (
                <ListItem
                  key={product.title}
                  title={product.title}
                  href={product.href}
                >
                  {product.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
