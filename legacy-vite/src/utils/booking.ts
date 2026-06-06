import { brand } from "@/config/brand";

export type BookingDraft = {
  fullName: string;
  phone: string;
  email: string;
  preferredContact: "WhatsApp" | "Call" | "Email";
  concern: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  consent: boolean;
};

export function createEmptyBookingDraft(): BookingDraft {
  return {
    fullName: "",
    phone: "",
    email: "",
    preferredContact: "WhatsApp",
    concern: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
    consent: false,
  };
}

export function formatBookingMessage(draft: BookingDraft) {
  const lines = [
    `Hi ${brand.name}, I'd like to book a consultation.`,
    "",
    `Name: ${draft.fullName || "-"}`,
    `Phone: ${draft.phone || "-"}`,
    `Email: ${draft.email || "-"}`,
    `Concern: ${draft.concern || "-"}`,
    `Preferred date: ${draft.preferredDate || "-"}`,
    `Preferred time: ${draft.preferredTime || "-"}`,
    `Preferred contact: ${draft.preferredContact || "-"}`,
    draft.notes ? "" : undefined,
    draft.notes ? `Notes: ${draft.notes}` : undefined,
  ].filter((v): v is string => typeof v === "string");

  return lines.join("\n");
}

export function buildWhatsAppHref(message: string) {
  const phone = brand.contact.phoneE164.replace("+", "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function buildMailtoHref(subject: string, body: string) {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${brand.contact.email}?subject=${encodedSubject}&body=${encodedBody}`;
}

