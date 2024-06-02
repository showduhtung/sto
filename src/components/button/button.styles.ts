import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px uppercase w-fit",

  {
    variants: {
      variant: {
        solid: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline: "border bg-background",
        text: "",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xxs: "h-6 rounded-sm px-3 text-[10px]", // not sure why text-xxs doesn't work
        xs: "h-8 rounded-sm px-3 text-xs",
        sm: "h-9 rounded-md px-3 text-sm",
        md: "h-10 px-4 py-2 text-base",
        lg: "h-11 rounded-md px-8 text-lg",
        icon: "h-10 w-10",
      },
      color: {
        primary: "text-primary",
        secondary: "text-black/80",
        danger: "text-danger",
        black: "text-white",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
      color: "primary",
    },
    compoundVariants: [
      { variant: "solid", color: "primary", className: "text-primary-foreground" },
      { variant: "solid", color: "secondary", className: "bg-secondary hover:bg-primary/20" },
      {
        variant: "solid",
        color: "danger",
        className: "bg-danger text-danger-foreground hover:bg-danger/80",
      },
      { variant: "solid", color: "black", className: "bg-black text-white hover:bg-black/80" },
      { variant: "outline", color: "primary", className: "border-primary hover:bg-primary/20" },
      { variant: "outline", color: "secondary", className: "border-black/20 hover:bg-black/20" },
      { variant: "outline", color: "danger", className: "border-danger hover:bg-danger/20" },

      { variant: "text", color: "primary", className: "hover:bg-primary/20" },
      { variant: "text", color: "secondary", className: "hover:bg-primary/20" },
      { variant: "text", color: "danger", className: "hover:bg-danger/20" },
      { variant: "text", color: "black", className: "text-black hover:bg-black/20" },
    ],
  },
);

export { buttonVariants };
