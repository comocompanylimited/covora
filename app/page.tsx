import type { Metadata } from "next";
import SplitLanding from "@/components/home/SplitLanding";

export const metadata: Metadata = {
  title: "Covora — Enter the House",
  description:
    "Enter the House of Covora. Modern luxury for him and her. Discover the new collection.",
};

export default function HomePage() {
  return <SplitLanding />;
}
