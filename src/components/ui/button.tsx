import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
    size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-vr-teal text-vr-navy font-bold uppercase tracking-widest rounded-none shadow-[4px_4px_0_#B87333] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-heavy",
            secondary: "bg-vr-iron text-vr-cream font-bold uppercase tracking-widest rounded-none border-b-4 border-vr-navy hover:bg-vr-navy transition-heavy",
            outline: "bg-transparent border-2 border-vr-teal text-vr-teal font-bold uppercase tracking-widest rounded-none hover:bg-vr-teal hover:text-vr-navy transition-heavy",
            ghost: "text-vr-cream/60 hover:text-vr-teal hover:bg-white/5 transition-heavy",
            link: "text-vr-teal underline-offset-4 hover:underline transition-heavy",
        };

        const sizes = {
            sm: "h-9 px-3 text-xs",
            md: "h-11 px-6 py-3",
            lg: "h-14 px-8 text-lg",
            icon: "h-11 w-11",
        };

        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vr-teal disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
