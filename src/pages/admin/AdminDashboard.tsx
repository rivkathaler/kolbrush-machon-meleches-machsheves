import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { FAQ_ITEMS, type FaqItem } from "@/data/faq";
import { TESTIMONIALS_HOME, TESTIMONIALS_DOWNLOADS } from "@/data/testimonials";
import { DOWNLOAD_CARDS } from "@/data/downloads";

type PanelId = "faq" | "testimonials" | "addon" | "downloads";

const PANELS: { id: PanelId; label: string }[] = [
  { id: "faq", label: "FAQ" },
  { id: "testimonials", label: "Testimonials" },
  { id: "addon", label: "Word Add-on" },
  { id: "downloads", label: "Downloads Grid" },
];

interface EditableTestimonial {
  name: string;
  role: string;
  img: string;
  quote: string;
}

function toEditable(list: typeof TESTIMONIALS_HOME): EditableTestimonial[] {
  return list.map((t) => ({ name: t.name, role: t.role, img: t.img, quote: t.body.join(" ") }));
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

function SaveButton({ label = "Save changes" }: { label?: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex items-center gap-3 mt-2">
      <Button
        type="button"
        onClick={() => {
          setSaved(true);
          setTimeout(() => setSaved(false), 1800);
        }}
      >
        {label}
      </Button>
      <span className={`text-sm text-[hsl(var(--ok))] transition-opacity ${saved ? "opacity-100" : "opacity-0"}`}>
        Preview saved
      </span>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState<PanelId>("faq");

  const [faq, setFaq] = useState<FaqItem[]>(() => FAQ_ITEMS.map((f) => ({ ...f })));
  const [testiHome, setTestiHome] = useState<EditableTestimonial[]>(() => toEditable(TESTIMONIALS_HOME));
  const [testiDownloads, setTestiDownloads] = useState<EditableTestimonial[]>(() => toEditable(TESTIMONIALS_DOWNLOADS));
  const [downloadImgs, setDownloadImgs] = useState<string[]>(() => DOWNLOAD_CARDS.map((c) => c.img));
  const [downloadFiles, setDownloadFiles] = useState<string[]>(() => DOWNLOAD_CARDS.map(() => "No file uploaded yet"));
  const [addonFileName, setAddonFileName] = useState("word-addon-installer.zip");
  const [addonMediaName, setAddonMediaName] = useState("No file uploaded yet");

  useEffect(() => {
    document.title = "Admin — Machon Meleches Machsheves";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("mmm_admin_logged_in") !== "1") {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  function logout() {
    sessionStorage.removeItem("mmm_admin_logged_in");
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr] bg-muted">
      <aside className="bg-navy text-cream-light p-5 flex md:flex-col items-center md:items-stretch gap-1 overflow-x-auto">
        <div className="flex items-center gap-2.5 pb-2 md:pb-5 md:mb-3 md:border-b border-white/10 pr-4 md:pr-0 border-r md:border-r-0">
          <img src="/img/logo-cream.svg" alt="" className="w-8 h-8" />
          <span className="text-sm font-bold leading-tight hidden md:inline">
            Machon Meleches
            <br />
            Machsheves — Admin
          </span>
        </div>

        <nav className="flex md:flex-col gap-1 flex-1">
          {PANELS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              className={`text-left text-sm font-semibold px-3 py-2.5 rounded-lg transition-colors whitespace-nowrap ${
                active === p.id ? "bg-cream-light text-maroon" : "text-cream-light/75 hover:bg-white/10 hover:text-cream-light"
              }`}
            >
              {p.label}
            </button>
          ))}
        </nav>

        <div className="md:pt-3 md:mt-3 md:border-t border-white/10">
          <Button variant="outline" className="border-white/30 text-cream-light hover:bg-white/10 hover:text-cream-light" onClick={logout}>
            Log out
          </Button>
        </div>
      </aside>

      <main className="p-6 md:p-10 max-w-3xl">
        <div className="bg-amber-50 border border-amber-300 text-amber-900 text-sm leading-relaxed rounded-lg px-4 py-3 mb-7">
          <strong>Preview mode.</strong> This admin shows the layout and lets you try adding/removing items and swapping
          images, but nothing is saved permanently yet — real saving, file storage and secure login will be connected
          once this site is imported into Lovable.
        </div>

        {active === "faq" && (
          <section>
            <h1 className="text-2xl font-extrabold text-maroon mb-1">FAQ</h1>
            <p className="text-sm text-taupe mb-6">
              Edit the questions and answers shown in the FAQ section on the Services page. Section title stays fixed.
            </p>

            <Card>
              <CardContent className="pt-6 space-y-4">
                {faq.map((item, i) => (
                  <div key={i} className="border rounded-lg p-4 bg-muted/40">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wide text-taupe">FAQ item {i + 1}</span>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setFaq((f) => f.filter((_, idx) => idx !== i))}
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </Button>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      <Label>Question</Label>
                      <Input
                        value={item.q}
                        onChange={(e) =>
                          setFaq((f) => f.map((it, idx) => (idx === i ? { ...it, q: e.target.value } : it)))
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Answer</Label>
                      <Textarea
                        value={item.a}
                        onChange={(e) =>
                          setFaq((f) => f.map((it, idx) => (idx === i ? { ...it, a: e.target.value } : it)))
                        }
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => setFaq((f) => [...f, { q: "", a: "" }])}>
                  <Plus className="w-4 h-4" /> Add FAQ item
                </Button>
              </CardContent>
            </Card>

            <SaveButton />
          </section>
        )}

        {active === "testimonials" && (
          <section>
            <h1 className="text-2xl font-extrabold text-maroon mb-1">Testimonials</h1>
            <p className="text-sm text-taupe mb-6">Home page and Downloads page each have their own separate list.</p>

            {([
              { title: "Home page testimonials", desc: "Shown on the Home page testimonials section.", list: testiHome, setList: setTestiHome },
              { title: "Downloads page testimonials", desc: "Shown on the Downloads page testimonials section.", list: testiDownloads, setList: setTestiDownloads },
            ] as const).map((group) => (
              <Card key={group.title} className="mb-5">
                <CardHeader>
                  <CardTitle className="text-base">{group.title}</CardTitle>
                  <CardDescription>{group.desc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {group.list.map((t, i) => (
                    <div key={i} className="border rounded-lg p-4 bg-muted/40">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wide text-taupe">Testimonial {i + 1}</span>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => group.setList((list) => list.filter((_, idx) => idx !== i))}
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </Button>
                      </div>
                      <div className="flex items-center gap-3.5 mb-3.5">
                        <div
                          className="w-20 h-20 rounded-lg bg-muted bg-cover bg-center border flex-shrink-0"
                          style={{ backgroundImage: `url('${t.img}')` }}
                        />
                        <div className="flex-1">
                          <Label className="block mb-1.5">Photo</Label>
                          <input
                            type="file"
                            accept="image/*"
                            className="text-xs"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const url = await readAsDataUrl(file);
                              group.setList((list) => list.map((it, idx) => (idx === i ? { ...it, img: url } : it)));
                            }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
                        <div className="space-y-1.5">
                          <Label>Name</Label>
                          <Input
                            value={t.name}
                            onChange={(e) =>
                              group.setList((list) => list.map((it, idx) => (idx === i ? { ...it, name: e.target.value } : it)))
                            }
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Role / institution</Label>
                          <Input
                            value={t.role}
                            onChange={(e) =>
                              group.setList((list) => list.map((it, idx) => (idx === i ? { ...it, role: e.target.value } : it)))
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Quote</Label>
                        <Textarea
                          value={t.quote}
                          onChange={(e) =>
                            group.setList((list) => list.map((it, idx) => (idx === i ? { ...it, quote: e.target.value } : it)))
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => group.setList((list) => [...list, { name: "", role: "", img: "", quote: "" }])}
                  >
                    <Plus className="w-4 h-4" /> Add testimonial
                  </Button>
                </CardContent>
              </Card>
            ))}

            <SaveButton />
          </section>
        )}

        {active === "addon" && (
          <section>
            <h1 className="text-2xl font-extrabold text-maroon mb-1">Word Add-on</h1>
            <p className="text-sm text-taupe mb-6">
              Swap the installer file and the demo video/GIF for the Word add-on section on the Downloads page. Title
              and description text stay fixed.
            </p>

            <Card className="mb-5">
              <CardHeader>
                <CardTitle className="text-base">Installer file</CardTitle>
                <CardDescription>The file people download when they click "Download here".</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <span className="text-sm text-taupe">{addonFileName}</span>
                <label>
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span><Upload className="w-3.5 h-3.5" /> Choose file</span>
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && setAddonFileName(e.target.files[0].name)}
                  />
                </label>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Demo video / GIF</CardTitle>
                <CardDescription>Replaces the "Video or GIF showing how it looks and works" placeholder.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <span className="text-sm text-taupe">{addonMediaName}</span>
                <label>
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span><Upload className="w-3.5 h-3.5" /> Choose file</span>
                  </Button>
                  <input
                    type="file"
                    accept="video/*,image/gif"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && setAddonMediaName(e.target.files[0].name)}
                  />
                </label>
              </CardContent>
            </Card>

            <SaveButton />
          </section>
        )}

        {active === "downloads" && (
          <section>
            <h1 className="text-2xl font-extrabold text-maroon mb-1">Downloads Grid</h1>
            <p className="text-sm text-taupe mb-6">
              Swap the thumbnail image and the downloadable file for each card. Card titles stay fixed and are shown
              here just for reference.
            </p>

            <div className="space-y-4">
              {DOWNLOAD_CARDS.map((card, i) => (
                <Card key={card.title}>
                  <CardContent className="pt-6">
                    <div className="text-xs font-bold uppercase tracking-wide text-taupe mb-3">
                      Card {i + 1} — {card.title.replace("\n", " ")}{" "}
                      <em className="normal-case font-normal opacity-60">(title fixed)</em>
                    </div>
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <div
                        className="w-20 h-20 rounded-lg bg-muted bg-cover bg-center border flex-shrink-0"
                        style={{ backgroundImage: `url('${downloadImgs[i]}')` }}
                      />
                      <div className="flex-1">
                        <Label className="block mb-1.5">Thumbnail image</Label>
                        <input
                          type="file"
                          accept="image/*"
                          className="text-xs"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const url = await readAsDataUrl(file);
                            setDownloadImgs((imgs) => imgs.map((im, idx) => (idx === i ? url : im)));
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-semibold">Download file:</span>
                      <span className="text-taupe">{downloadFiles[i]}</span>
                      <label>
                        <Button type="button" variant="outline" size="sm" asChild>
                          <span><Upload className="w-3.5 h-3.5" /> Choose file</span>
                        </Button>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setDownloadFiles((files) => files.map((f, idx) => (idx === i ? file.name : f)));
                          }}
                        />
                      </label>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
