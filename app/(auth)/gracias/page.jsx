import Link from "next/link";

export default function Verificar() {
  return (
    <>
      <form className="form-signin w-100 m-auto my-4">
        <h1 className="h3 mb-3 fw-normal text-center">
          !Gracias por Registrarte 👍!
        </h1>
        <p className="text-center text-muted">
          Se ha enviado un correo con instrucciones para verificar tu cuenta. En
          cuanto la hayas verificado podrás iniciar sesión.
        </p>
      </form>
      <br />
      <p className="text-center">
        <Link href="/login">Regresar a inicio.</Link>
      </p>
    </>
  );
}
