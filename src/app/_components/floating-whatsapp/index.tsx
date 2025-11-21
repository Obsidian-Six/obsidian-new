import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default async function FloatingWhatsapp() {
  return (
    <>
      <Link
        href="https://wa.me/+918085652729"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="floating-whatsapp"
      >
        <div className="floating-whatsapp-container">
          <FaWhatsapp className="floating-whatsapp-icon" />
        </div>
      </Link>
    </>
  );
}
