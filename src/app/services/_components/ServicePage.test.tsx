import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServicePage } from "@/app/services/_components/ServicePage";

describe("ServicePage", () => {
  it("shows an early return path to home and treatments", () => {
    render(
      <ServicePage
        eyebrow="Acne"
        title="Acne Treatment Kuala Lumpur"
        description="Description"
        bullets={["One"]}
        suitability={["Suitability"]}
        process={["Step 1"]}
        expectations={["Expectation"]}
        faqs={[{ q: "Question?", a: "Answer." }]}
        bookingHref="/en/book"
        labels={{
          bookConsultation: "Book Consultation",
          whatsapp: "WhatsApp",
          getDirections: "Get Directions",
          whoItsFor: "Who it’s for",
          howItWorks: "How it works",
          whatToExpect: "What to expect",
          faqs: "FAQs",
          continueExploring: "Continue Exploring",
        }}
        supportingLinks={[
          { href: "/en", label: "Belléco Skin Beauté" },
          { href: "/en#treatments", label: "Explore Treatments" },
        ]}
        jsonLd={[]}
      />,
    );

    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/en");
    expect(screen.getAllByRole("link", { name: "Explore Treatments" })[0]).toHaveAttribute(
      "href",
      "/en#treatments",
    );
  });

  it("renders process, outcomes, suitability, and FAQ sections with semantic headings", () => {
    render(
      <ServicePage
        eyebrow="Targeted Skin Correction"
        title="Acne Treatment"
        description="Diagnosis-led acne care for calmer, clearer-looking skin."
        bullets={[
          "Barrier-first support",
          "Guided home care",
        ]}
        suitability={[
          "Recurring breakouts",
          "Clogged pores",
        ]}
        process={[
          "Consultation and skin analysis",
          "Treatment planning",
          "Clinic session and follow-up",
        ]}
        expectations={[
          "Low downtime for most sessions",
          "Visible progress builds over weeks",
        ]}
        faqs={[
          {
            q: "How many sessions do I need?",
            a: "It depends on skin condition and treatment goals.",
          },
        ]}
        supportingLinks={[
          { href: "/en", label: "Belléco Skin Beauté" },
          { href: "/en#treatments", label: "Explore Treatments" },
          { href: "/en#before-after-results", label: "View Results" },
        ]}
        jsonLd={[]}
      />,
    );

    expect(screen.getByRole("heading", { name: "Who it’s for", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How it works", level: 2 })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "What to expect", level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "FAQs", level: 2 })).toBeInTheDocument();

    expect(screen.getByText("Recurring breakouts")).toBeInTheDocument();
    expect(screen.getByText("Consultation and skin analysis")).toBeInTheDocument();
    expect(screen.getByText("Low downtime for most sessions")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "How many sessions do I need?", level: 3 }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Belléco Skin Beauté" })).toHaveAttribute(
      "href",
      "/en",
    );
    expect(screen.getAllByRole("link", { name: "Explore Treatments" })[0]).toHaveAttribute(
      "href",
      "/en#treatments",
    );
    expect(screen.getByRole("link", { name: "View Results" })).toHaveAttribute(
      "href",
      "/en#before-after-results",
    );
  });

  it("supports locale-aware labels, booking link, and supporting links", () => {
    render(
      <ServicePage
        eyebrow="针对性护肤修复"
        title="痘痘护理"
        description="以肌肤诊断为基础的痘痘护理方案。"
        bullets={["屏障优先", "居家护理指导"]}
        suitability={["反复爆痘"]}
        process={["咨询与肌肤分析"]}
        expectations={["多数疗程恢复期短"]}
        faqs={[{ q: "需要多少次疗程？", a: "取决于肤况与目标。" }]}
        bookingHref="/zh/book"
        labels={{
          bookConsultation: "预约咨询",
          whatsapp: "WhatsApp",
          getDirections: "路线导航",
          whoItsFor: "适合人群",
          howItWorks: "治疗流程",
          whatToExpect: "效果与恢复",
          faqs: "常见问题",
          continueExploring: "继续了解",
        }}
        supportingLinks={[
          { href: "/zh", label: "Belléco Skin Beauté" },
          { href: "/zh#treatments", label: "查看疗程" },
        ]}
        jsonLd={[]}
      />,
    );

    expect(screen.getByRole("link", { name: "预约咨询" })).toHaveAttribute(
      "href",
      "/zh/book",
    );
    expect(screen.getByText("适合人群")).toBeInTheDocument();
    expect(screen.getByText("治疗流程")).toBeInTheDocument();
    expect(screen.getByText("效果与恢复")).toBeInTheDocument();
    expect(screen.getByText("常见问题")).toBeInTheDocument();
    expect(screen.getByText("继续了解")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "查看疗程" })).toHaveAttribute(
      "href",
      "/zh#treatments",
    );
  });
});
