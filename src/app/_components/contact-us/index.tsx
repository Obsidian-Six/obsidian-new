import { PiPhoneCall } from "react-icons/pi";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import "react-phone-input-2/lib/style.css";
import Link from "next/link";
import ContactForm from "./contact-form";

const ContactUs = () => {
  return (
    <section id="contactUs" className="mb-20">
      <h2 className="invisible">Contact Us</h2>
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 text-main gap-10">
        {/* Contact Details */}
        <div className="space-y-6 md:sticky md:top-20 self-start max-md:grid max-md:grid-cols-2">
          <address className="not-italic">
            <h3 className="text-xl font-medium poppins">Call Us</h3>
            <Link
              href={"tel:+918085652729"}
              className="text-sm font-semibold inter my-2.5"
            >
              <PiPhoneCall className="text-xl inline-block me-2" />
              +918085652729
            </Link>
          </address>
          <address className="not-italic">
            <h2 className="text-xl font-medium poppins">Mail Us</h2>
            <Link
              href={"mailto:info@obsidiansix.com"}
              className="text-sm font-semibold inter my-2.5"
            >
              <MdOutlineMailOutline className="text-xl inline-block me-2" />
              info@obsidiansix.com
            </Link>
          </address>
          <address className="not-italic">
            <h2 className="text-xl font-medium poppins">Our Socials</h2>
            <Link
              href={"https://www.obsidiansix.com/"}
              className="text-sm font-semibold inter my-2.5"
            >
              <RiInstagramLine className="text-xl inline-block me-2" />
              obsidiansix.com
            </Link>
          </address>
          <address className="not-italic">
            <h2 className="text-xl font-medium poppins">Visit Us</h2>
            <p className="text-sm font-semibold inter my-2.5">
              <GrLocation className="text-xl inline-block me-2" />
              Bhopal , Indore , Mumbai , Delhi
            </p>
          </address>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactUs;
