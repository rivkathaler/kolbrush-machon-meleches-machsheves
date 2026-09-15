export interface DownloadCard {
  title: string;
  img: string;
  fileUrl?: string;
}

// Title text is fixed (not client-editable) — image + linked file are.
export const DOWNLOAD_CARDS: DownloadCard[] = [
  { title: "The Word add-on\ninstaller and guide", img: "/samples/single-1.jpg" },
  { title: "Single column\ntypesetting samples", img: "/samples/single-2.jpg" },
  { title: "Double column\ntypesetting samples", img: "/samples/double-1.jpg" },
  { title: "Multi-text\ntypesetting samples", img: "/samples/multi-1.jpg" },
  { title: "Manuscript\npreparation checklist", img: "/samples/multi-3.jpg" },
  { title: "Shaar blatt\ntitle page templates", img: "/books/book-2.jpg" },
  { title: "Hebrew fonts\nfor seforim", img: "/samples/double-3.jpg" },
  { title: "Print specification\nand binding sheet", img: "/books/book-9.jpg" },
];
