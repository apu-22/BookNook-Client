import type { Metadata } from "next";
import Banner from "@/components/home/banner";
import NewArrivalsBook from "@/components/home/new-arrivals";
import HowItWorks from "@/components/home/how-it-works";
import TopCategories from "@/components/home/top-categories";
import ReaderReviews from "@/components/home/reader-reviews";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <Banner />
      <NewArrivalsBook />
      <HowItWorks />
      <TopCategories />
      <ReaderReviews />
    </>
  );
}
