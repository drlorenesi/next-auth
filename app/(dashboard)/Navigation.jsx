"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
// Icons
import {
  FaHouse,
  FaUserGear,
  FaCircleUser,
  FaPenToSquare,
  FaArrowRightFromBracket,
} from "react-icons/fa6";

export default function Navigation() {
  const router = useRouter();
  const currentRoute = usePathname();
  const active = "nav-link active";
  const nonActive = "nav-link";

  const handleLogout = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error signing out...", error);
    if (!error) {
      toast.success("Sesión terminada.");
      router.push("/login");
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="sm"
        className="bg-body-tertiary mb-3"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Link href="/" className="navbar-brand">
            <FaHouse style={{ color: "CadetBlue" }} />
          </Link>
          <Navbar.Toggle />
          <Navbar.Offcanvas bg="dark" data-bs-theme="dark" placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {/* Left side Nav */}
              <Nav className="me-auto">
                <Nav.Link
                  as={Link}
                  href="/posts"
                  className={currentRoute === "/posts" ? active : nonActive}
                >
                  Posts
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="/productos"
                  className={currentRoute === "/productos" ? active : nonActive}
                >
                  Productos
                </Nav.Link>
                {/* Dropdown */}
                <NavDropdown title="Forms">
                  <NavDropdown.Item
                    as={Link}
                    href="/forms/dates"
                    className={currentRoute === "/forms/dates" ? "active" : ""}
                  >
                    Dates
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    href="/forms/products"
                    className={
                      currentRoute === "/forms/products" ? "active" : ""
                    }
                  >
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
                {/* Dropdown */}
                <NavDropdown title="Utils">
                  <NavDropdown.Item
                    as={Link}
                    href="/utils/excel"
                    className={currentRoute === "/utils/excel" ? "active" : ""}
                  >
                    Download to Excel
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {/* Right side Nav */}
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown
                  align="end"
                  title={
                    <FaCircleUser size={22} style={{ color: "CadetBlue" }} />
                  }
                >
                  <NavDropdown.Item
                    as={Link}
                    href="/perfil"
                    className={currentRoute === "/perfil" ? "active" : ""}
                  >
                    <FaUserGear style={{ color: "CadetBlue" }} /> &nbsp; Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    href="/actualizar"
                    className={currentRoute === "/actualizar" ? "active" : ""}
                  >
                    <FaPenToSquare style={{ color: "CadetBlue" }} /> &nbsp;
                    Actualizar
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <FaArrowRightFromBracket style={{ color: "CadetBlue" }} />{" "}
                    &nbsp; Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
