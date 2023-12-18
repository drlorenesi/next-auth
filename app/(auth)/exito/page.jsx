import Link from "next/link";

export default function Exito() {
  return (
    <>
      <form className="form-signin w-100 m-auto my-4">
        <h1 className="h3 mb-3 fw-normal text-center">
          ¡Enhorabuena 👏! Tu cuenta ha sido verificada ✅.
        </h1>
        <p className="text-center text-muted">Ahora podrás iniciar sesión.</p>
      </form>
      <br />
      <p className="text-center">
        <Link href="/login">Regresar a inicio.</Link>
      </p>
    </>
  );
}
