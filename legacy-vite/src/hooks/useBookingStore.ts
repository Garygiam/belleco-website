import { create } from "zustand";
import { createEmptyBookingDraft, type BookingDraft } from "@/utils/booking";

type BookingState = {
  draft: BookingDraft;
  submittedAt?: number;
  setDraft: (draft: BookingDraft) => void;
  setField: <K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) => void;
  reset: () => void;
  markSubmitted: () => void;
};

const STORAGE_KEY = "belleco.booking.draft.v1";

function loadDraft(): BookingDraft {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyBookingDraft();
    const parsed = JSON.parse(raw) as BookingDraft;
    return { ...createEmptyBookingDraft(), ...parsed };
  } catch {
    return createEmptyBookingDraft();
  }
}

function saveDraft(draft: BookingDraft) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    return;
  }
}

export const useBookingStore = create<BookingState>((set, get) => ({
  draft: typeof window === "undefined" ? createEmptyBookingDraft() : loadDraft(),
  setDraft: (draft) => {
    saveDraft(draft);
    set({ draft });
  },
  setField: (key, value) => {
    const next = { ...get().draft, [key]: value };
    saveDraft(next);
    set({ draft: next });
  },
  reset: () => {
    const next = createEmptyBookingDraft();
    saveDraft(next);
    set({ draft: next, submittedAt: undefined });
  },
  markSubmitted: () => set({ submittedAt: Date.now() }),
}));

