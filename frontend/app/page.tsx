import FetchTest from "@/components/FetchTest";
import SignupForm from "@/components/SignUp/SignUp";

export default function Home() {
  return (
    <div className="h-full font-[family-name:var(--font-geist-sans)]">
      <SignupForm />
      <FetchTest />
    </div>
  );
}
