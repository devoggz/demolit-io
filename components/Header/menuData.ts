import type { MenuItem } from "./types";

export const menuData: MenuItem[] = [
  // {
  //   title: "Popular",
  //   path: "/popular?sort=popular",
  // },
  {
    title: "Shop",
    path: "/shop-with-sidebar",
  },

  {
    title: "Accessories",
    submenu: [
      {
        title: "Chargers",
        path: "/shop-with-sidebar",
      },
      {
        title: "Earphones",
        path: "/shop-with-sidebar",
      },
      {
        title: "Headphones",
        path: "/shop-with-sidebar",
      },
      {
        title: "Watches",
        path: "/shop-with-sidebar",
      },

    ],
  },
  // {
  //   title: "Blog",
  //   submenu: [
  //     {
  //       title: "Blog Grid with Sidebar",
  //       path: "/blogs/blog-grid-with-sidebar",
  //     },
  //     {
  //       title: "Blog Grid",
  //       path: "/blogs/blog-grid",
  //     },
  //     {
  //       title: "Blog details with sidebar",
  //       path: "/blogs/blog-details-with-sidebar",
  //     },
  //     {
  //       title: "Blog Details",
  //       path: "/blogs/blog-details",
  //     },
  //   ],
  // },
  {
    title: "Contact",
    path: "/contact",
  },
];
