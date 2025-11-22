import type Contact from "../models/contact.types";

/**
 * Handles the submission of the Contact Us form by sending the data via email
 * and to a Google Apps Script endpoint.
 * @param contactUs - The contact us form data.
 */
export async function handleContactUsFormSubmission(
  contactUs: Contact
): Promise<void> {
  return Promise.all([
    sendEmailViaFormSubmit(contactUs),
    sendContactUsToGAS(contactUs),
  ]).then(() => {
    return;
  });
}

/**
 * Sends the contact us form data via FormSubmit email service.
 * @param contactUs - The contact us form data.
 */
async function sendEmailViaFormSubmit(contactUs: Contact): Promise<void> {
  const ENQUIRY_EMAIL = process.env.NEXT_PUBLIC_CONTACT_SUBMIT_EMAIL as string;
  const submitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(
    ENQUIRY_EMAIL
  )}`;
  return fetch(submitUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "First Name": contactUs.firstName || "",
      "Last Name": contactUs.lastName || "",
      Email: contactUs.email,
      Phone: contactUs.phone,
      "Selected Services": contactUs.selectedServices.join(", "),
      "Company Name": contactUs.companyName || "",
      "Company Website": contactUs.companyWebsite || "",
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Error sending email: ${response.statusText}`);
    }
    return;
  });
}

/**
 * Sends the contact us form data to a Google Apps Script endpoint.
 * @param contactUs - The contact us form data.
 */
async function sendContactUsToGAS(contactUs: Contact): Promise<void> {
  const GAS_URL = process.env.NEXT_PUBLIC_GOOGLE_APP_SCRIPTS_URL as string;
  return fetch(GAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors",
    body: JSON.stringify({
      firstName: contactUs.firstName || "",
      lastName: contactUs.lastName || "",
      email: contactUs.email,
      phone: contactUs.phone,
      selectedServices: contactUs.selectedServices.join(", "),
      companyName: contactUs.companyName || "",
      companyWebsite: contactUs.companyWebsite || "",
    }),
  }).then(() => {});
}
