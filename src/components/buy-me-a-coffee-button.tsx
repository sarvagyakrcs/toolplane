import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import { Offside } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Coffee, Heart } from "lucide-react";

export const offsideFont = Offside({
  subsets: ['latin'],
  weight: ['400'],
})

const BuyMeACoffeeButton = ({ 
  variant = "outline", 
  size = "default",
  showIcon = true,
  className = ""
}: {
  variant?: "default" | "outline" | "ghost" | "premium";
  size?: "default" | "sm" | "lg";
  showIcon?: boolean;
  className?: string;
}) => {
  const baseClasses = "group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg";
  
  if (variant === "premium") {
    return (
      <Link
        href="https://www.buymeacoffee.com/thesarvagya"
        className={cn(
          "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full",
          "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500",
          "text-white font-medium shadow-lg",
          "hover:from-yellow-500 hover:via-orange-500 hover:to-yellow-600",
          "transform transition-all duration-300 hover:scale-105 hover:shadow-xl",
          "relative overflow-hidden group",
          className
        )}
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        {showIcon && <Coffee className="h-5 w-5 animate-bounce" />}
        <span className={cn("relative z-10", offsideFont.className)}>
          Buy me a coffee
        </span>
        <Heart className="h-4 w-4 text-red-200 group-hover:text-red-100 transition-colors" />
      </Link>
    );
  }

  return (
    <Link
      className={cn(
        "flex items-center justify-center gap-2",
        baseClasses,
        buttonVariants({ variant: variant as any, size }),
        variant === "outline" && "hover:bg-yellow-50 hover:border-yellow-300",
        className
      )}
      href="https://www.buymeacoffee.com/thesarvagya"
    >
      {showIcon && (
        <Image
          width={20}
          height={20}
          src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
          alt="Buy me a coffee"
          className="group-hover:scale-110 transition-transform duration-200"
        />
      )}
      <span className={cn("group-hover:text-yellow-600 transition-colors", offsideFont.className)}>
        Buy me a coffee
      </span>
    </Link>
  );
};

export default BuyMeACoffeeButton; 