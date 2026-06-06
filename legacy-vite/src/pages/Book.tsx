import { useMemo, useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import FormField from "@/components/FormField";
import TextInput from "@/components/TextInput";
import TextArea from "@/components/TextArea";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { brand } from "@/config/brand";
import { concerns } from "@/data/treatments";
import { useBookingStore } from "@/hooks/useBookingStore";
import {
  buildMailtoHref,
  buildWhatsAppHref,
  formatBookingMessage,
  type BookingDraft,
} from "@/utils/booking";
import { ArrowUpRight, CheckCircle2, Mail, MessageCircle, Phone } from "lucide-react";

type Errors = Partial<Record<keyof ReturnType<typeof useBookingStore.getState>["draft"], string>>;

function validateDraft(draft: BookingDraft): Errors {
  const errors: Errors = {};
  if (!draft.fullName.trim()) errors.fullName = "Required";
  if (!draft.concern.trim()) errors.concern = "Required";
  if (!draft.consent) errors.consent = "Please agree";

  if (draft.preferredContact === "Email") {
    if (!draft.email.trim()) errors.email = "Required";
  } else {
    if (!draft.phone.trim()) errors.phone = "Required";
  }

  return errors;
}

export default function Book() {
  const { draft, setField, reset, submittedAt, markSubmitted } = useBookingStore();
  const [errors, setErrors] = useState<Errors>({});

  const message = useMemo(() => formatBookingMessage(draft), [draft]);
  const whatsappHref = useMemo(() => buildWhatsAppHref(message), [message]);
  const mailtoHref = useMemo(
    () => buildMailtoHref(`Booking request - ${brand.name}`, message),
    [message],
  );

  const submitted = Boolean(submittedAt);

  return (
    <SiteLayout>
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <SectionHeader
            eyebrow="Booking"
            title={
              <>
                Request an <span className="text-accent">appointment</span>.
              </>
            }
            description="Send a quick request. We’ll reply with suitable starting sessions and the next available slots."
          />

          <div className="rounded-3xl bg-surface p-6 ring-1 ring-ink/10">
            {submitted ? (
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 text-accent" />
                  <div>
                    <div className="text-sm font-semibold text-ink">Request prepared</div>
                    <div className="mt-1 text-sm leading-relaxed text-muted">
                      Use WhatsApp / call / email to send your details. We’ll confirm availability.
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-bg p-5 ring-1 ring-ink/10">
                  <div className="text-xs font-semibold tracking-[0.16em] text-muted">YOUR MESSAGE</div>
                  <pre className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink">{message}</pre>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a href={whatsappHref} target="_blank" rel="noreferrer">
                    <Button variant="primary" size="lg" className="w-full justify-center">
                      WhatsApp <MessageCircle className="h-5 w-5" />
                    </Button>
                  </a>
                  <a href={`tel:${brand.contact.phoneE164}`}>
                    <Button variant="secondary" size="lg" className="w-full justify-center">
                      Call <Phone className="h-5 w-5" />
                    </Button>
                  </a>
                  <a href={mailtoHref}>
                    <Button variant="secondary" size="lg" className="w-full justify-center">
                      Email <Mail className="h-5 w-5" />
                    </Button>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setErrors({});
                    }}
                  >
                    <Button variant="ghost" size="lg" className="w-full justify-center">
                      Start over <ArrowUpRight className="h-5 w-5" />
                    </Button>
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  const next = validateDraft(draft);
                  setErrors(next);
                  if (Object.keys(next).length > 0) return;
                  markSubmitted();
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Full name" error={errors.fullName}>
                    <TextInput
                      value={draft.fullName}
                      onChange={(e) => setField("fullName", e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </FormField>
                  <FormField label="Preferred contact">
                    <Select
                      value={draft.preferredContact}
                      onChange={(e) => setField("preferredContact", e.target.value as BookingDraft["preferredContact"])}
                    >
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Call">Call</option>
                      <option value="Email">Email</option>
                    </Select>
                  </FormField>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label="Phone"
                    error={errors.phone}
                    hint="Required for WhatsApp/Call. Include country code if possible."
                  >
                    <TextInput
                      value={draft.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      placeholder="+60..."
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </FormField>
                  <FormField label="Email" error={errors.email} hint="Required if you prefer email replies.">
                    <TextInput
                      value={draft.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="you@email.com"
                      autoComplete="email"
                      inputMode="email"
                    />
                  </FormField>
                </div>

                <FormField label="Main concern" error={errors.concern}>
                  <Select value={draft.concern} onChange={(e) => setField("concern", e.target.value)}>
                    <option value="" disabled>
                      Select a concern
                    </option>
                    {concerns.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.key}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </Select>
                </FormField>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Preferred date">
                    <TextInput
                      value={draft.preferredDate}
                      onChange={(e) => setField("preferredDate", e.target.value)}
                      placeholder="e.g. 12 Jun"
                    />
                  </FormField>
                  <FormField label="Preferred time">
                    <TextInput
                      value={draft.preferredTime}
                      onChange={(e) => setField("preferredTime", e.target.value)}
                      placeholder="e.g. 3pm"
                    />
                  </FormField>
                </div>

                <FormField label="Notes (optional)" hint="Anything we should know? Sensitivity, past reactions, timeline, etc.">
                  <TextArea
                    value={draft.notes}
                    onChange={(e) => setField("notes", e.target.value)}
                    placeholder="Tell us what's important..."
                  />
                </FormField>

                <FormField label="Consent" error={errors.consent}>
                  <label className="flex items-start gap-3 rounded-3xl bg-bg p-4 ring-1 ring-ink/10">
                    <input
                      type="checkbox"
                      checked={draft.consent}
                      onChange={(e) => setField("consent", e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-ink/20 text-accent focus:ring-ring"
                    />
                    <span className="text-sm leading-relaxed text-muted">
                      I agree to be contacted about this appointment request. I understand this is for enquiries and is
                      not medical advice.
                    </span>
                  </label>
                </FormField>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
                    Prepare message <ArrowUpRight className="h-5 w-5" />
                  </Button>
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setErrors({});
                    }}
                    className="w-full"
                  >
                    <Button variant="secondary" size="lg" className="w-full justify-center">
                      Clear form
                    </Button>
                  </button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
