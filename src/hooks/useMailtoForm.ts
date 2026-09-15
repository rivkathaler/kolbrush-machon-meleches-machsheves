import { useState, type FormEvent } from "react";

const CONTACT_EMAIL = "printyoursefer@gmail.com";

/** Forms are mailto:-only — there is no backend. Submitting opens the user's
 * mail client addressed to the studio, same as the static site's wireForm(). */
export function useMailtoForm(subject: string) {
  const [note, setNote] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const missing = Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]")
    ).some((f) => !f.value.trim());
    if (missing) {
      setNote("Please fill in every field so we can get back to you.");
      return;
    }
    const data = new FormData(form);
    const lines = Array.from(data.entries())
      .map(([k, v]) => `${k}: ${v}`)
      .join("%0D%0A");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${lines}`;
    setNote("Thank you — your email client is opening.");
    form.reset();
  }

  return { note, handleSubmit };
}
