import UserForm from "./user-form";

export default function TextInputForm() {
  return (
    <div className="max-w-md w-full mx-auto p-6 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Información Personal</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Por favor, ingresa tu información abajo
        </p>
      </div>

      <UserForm />
    </div>
  );
}
