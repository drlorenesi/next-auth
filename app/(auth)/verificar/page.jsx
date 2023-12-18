import Link from "next/link";

export default function Verificar() {
  return (
    <>
      <form className="form-signin w-100 m-auto my-4">
        <h1 className="h3 mb-3 fw-normal text-center">Error 😖...</h1>
        <p className="text-center text-muted">
          Por favor revisa tu enlace e intenta de nuevo.
        </p>
      </form>
      <br />
      <p className="text-center">
        <Link href="/solicitar">¿Olvidaste tu contraseña?</Link>
      </p>
    </>
  );
}
