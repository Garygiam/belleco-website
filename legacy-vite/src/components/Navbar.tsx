import { useMemo, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { brand } from "@/config/brand";
import Button from "@/components/Button";
import Container from "@/components/Container";

type NavItem = { to: string; label: string };

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const items = useMemo<NavItem[]>(
    () => [
      { to: "/", label: "Home" },
      { to: "/treatments", label: "Treatments" },
      { to: "/stories", label: "Stories" },
      { to: "/book", label: "Book" },
    ],
    [],
  );

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-bg/72 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-baseline gap-2" onClick={close}>
          <span className="font-serif text-lg font-semibold tracking-tight text-ink sm:text-xl">
            {brand.name}
          </span>
          <span className="hidden text-xs font-semibold tracking-[0.14em] text-muted sm:inline">
            {brand.tagline.toUpperCase()}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive ? "bg-ink/5 text-ink" : "text-muted hover:bg-ink/5 hover:text-ink",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={brand.links.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-muted transition hover:text-ink"
          >
            Instagram
          </a>
          <Link to="/book" className={cn(location.pathname === "/book" && "pointer-events-none")}>
            <Button variant="primary" size="sm">
              Book now <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface text-ink ring-1 ring-ink/10 transition hover:bg-bg md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-ink/10 bg-bg/92 backdrop-blur-xl md:hidden">
          <Container className="py-4">
            <div className="grid gap-2">
              {items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={close}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between rounded-2xl bg-surface px-4 py-3 text-sm font-semibold shadow-lift ring-1 ring-ink/10",
                      isActive ? "text-ink" : "text-muted",
                    )
                  }
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </NavLink>
              ))}
              <a
                href={brand.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-surface px-4 py-3 text-sm font-semibold text-muted shadow-lift ring-1 ring-ink/10"
              >
                Instagram
              </a>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
