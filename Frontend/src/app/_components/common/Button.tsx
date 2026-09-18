"use client";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
interface ButtonProps {
  text: string;
  hlink?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  className?: string;
}
function Button({
  text,
  hlink = "#",
  bgColor = "transparent",
  textColor = "text-slate-900",
  borderColor = "border-slate-900",
  hoverBgColor = "hover:bg-slate-900",
  hoverTextColor = "hover:text-white",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={hlink}
      className={`os-btn-slide group inline-flex items-center gap-2.5 rounded-full border px-8 py-3 text-sm font-medium transition-all duration-300 ${textColor} ${borderColor} ${hoverBgColor} ${hoverTextColor} ${className} `}
      style={{ backgroundColor: bgColor }}
    >
      {" "}
      {text}{" "}
      <GoArrowUpRight className="text-xl transition-transform duration-300 group-hover:rotate-45" />{" "}
    </Link>
  );
}
export default Button;
