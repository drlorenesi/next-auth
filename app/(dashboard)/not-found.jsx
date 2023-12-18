"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Missing from "@/public/img/404_not_found.png";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      className="overflow-x-auto my-4 mx-4"
      style={{
        position: "absolute",
        left: "50%",
        top: "40%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="alert alert-secondary text-center" role="alert">
        <Image
          src={Missing}
          alt="Not found"
          width={200}
          quality={100}
          placeholder="blur"
        />
        <h4 className="alert-heading">
          <samp>Ocurrión un problema.</samp>
        </h4>
        <p>No pudimos encontrar la página que buscas.</p>
      </div>
      <div className="d-flex justify-content-center">
        <Link href="/" className="btn btn-primary mx-2">
          A Inicio
        </Link>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => router.back()}
        >
          Atrás
        </button>
      </div>
    </div>
  );
}
