import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

// Demo login only — not secure. Real authentication gets wired up once this
// project is imported into Lovable (which has native auth).
const DEMO_USER = "admin";
const DEMO_PASS = "admin123";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    document.title = "Admin Login — Machon Meleches Machsheves";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const user = String(form.get("user") || "").trim();
    const pass = String(form.get("pass") || "");
    if (user === DEMO_USER && pass === DEMO_PASS) {
      sessionStorage.setItem("mmm_admin_logged_in", "1");
      navigate("/admin/dashboard");
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy to-[#12222c] p-6">
      <Card className="w-full max-w-sm bg-cream-light border-0">
        <CardContent className="pt-8 pb-6 px-8">
          <img src="/img/logo-cream.svg" alt="" className="w-14 h-14 mx-auto mb-4" />
          <h1 className="text-xl font-extrabold text-center text-maroon mb-1">Admin Login</h1>
          <p className="text-sm text-center text-taupe mb-7">Machon Meleches Machsheves</p>

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2 mb-4">
              Incorrect username or password.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="user">Username</Label>
              <Input id="user" name="user" type="text" autoComplete="username" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pass">Password</Label>
              <Input id="pass" name="pass" type="password" autoComplete="current-password" required />
            </div>
            <Button type="submit" className="w-full">Log in</Button>
          </form>

          <p className="text-xs text-center text-taupe/80 leading-relaxed mt-6">
            This page is only reachable at <strong>/admin</strong> and is not linked from the site.
            Preview login only — real secure login will be connected when this project moves into Lovable.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
