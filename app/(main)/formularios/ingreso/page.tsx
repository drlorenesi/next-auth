import { InputForm } from "./input-form";

export default function Home() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold tracking-tight border-b pb-2 first:mt-0">
        Next.js Forms
      </h2>
      <h3 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Input Form
      </h3>
      <InputForm />
    </div>
  );
}
