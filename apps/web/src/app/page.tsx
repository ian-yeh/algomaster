"use client";
import { useRouter } from "next/navigation";

export default function Index() {
  const router = useRouter();
  const handleLearnMore = () => {
    router.push("/about");
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <button 
        onClick={handleLearnMore}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
      >
        Learn More
      </button>
    </div>
  );
}
