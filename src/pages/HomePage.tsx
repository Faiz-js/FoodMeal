import Foods from "@/components/Foods";
import Headings from "@/components/Headings";

export default function HomePage() {
  return (
    <div className="px-4 md:px-20">
      <Headings />
      <Foods />
    </div>
  );
}
