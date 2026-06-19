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

export type BookingMessageCopy = {
  greeting: string;
  name: string;
  phone: string;
  email: string;
  concern: string;
  preferredDate: string;
  preferredTime: string;
  preferredContact: string;
  notes: string;
  mailSubject: string;
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

export function formatBookingMessage(draft: BookingDraft, copy: BookingMessageCopy) {
  const lines = [
    copy.greeting,
    "",
    `${copy.name}: ${draft.fullName || "-"}`,
    `${copy.phone}: ${draft.phone || "-"}`,
    `${copy.email}: ${draft.email || "-"}`,
    `${copy.concern}: ${draft.concern || "-"}`,
    `${copy.preferredDate}: ${draft.preferredDate || "-"}`,
    `${copy.preferredTime}: ${draft.preferredTime || "-"}`,
    `${copy.preferredContact}: ${draft.preferredContact || "-"}`,
    draft.notes ? "" : undefined,
    draft.notes ? `${copy.notes}: ${draft.notes}` : undefined,
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
