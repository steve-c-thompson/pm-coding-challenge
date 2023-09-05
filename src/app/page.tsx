import InvestorForm from "@/components/InvestorForm";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="flex flex-col items-center mb-4">
        <h1 className="text-2xl">Investor Intake</h1>
      </header>
      <main className="flex min-h-screen flex-col items-center">
        <InvestorForm />
      </main>
    </>
  );
}
