export interface Testimonial {
  name: string;
  role: string;
  img: string;
  body: string[];
}

// Home page and Downloads page each keep their own separate list (client can
// edit them independently in the admin panel).
export const TESTIMONIALS_HOME: Testimonial[] = [
  {
    name: "Machon Kan Hanesher",
    img: "/testimonials/testimonial-1.jpg",
    role: "Gateshead",
    body: [
      "Besides his vast expertise and know-how in the sefarim world, Rabbi Kulbersh also uses his erudition of the actual topics discussed to help achieve the best presentation of the content. Always helpful and encouraging, he has shown to be professional yet attentive to every sefer’s unique requirements.",
      "<strong>Highly recommended!</strong>",
    ],
  },
  {
    name: "R’ Avrohom Gross",
    img: "/testimonials/testimonial-2.jpg",
    role: "Chaim Berlin, Pachad Yitzchok, Mir Yerushalayim, Kollel Zichron Yochanan",
    body: [
      "I’ve worked with R’ Akiva on many seforim over the past ten years, including both seforim and kuntreisim I personally authored, as well as a series of seforim published by our Kollel. R’ Akiva worked diligently to produce a top-quality product, ensuring that every step, from manuscript to print draft, was handled with the utmost care and accuracy.",
      "His devotion and reliability are truly noteworthy and were especially evident on several occasions when seforim needed to be published under severe time constraints. In such instances, he went above and beyond to ensure deadlines were successfully met.",
      "<strong>I would certainly recommend R’ Akiva to anyone seeking a highly skilled and dependable typesetter.</strong>",
    ],
  },
  {
    name: "R’ Mordechai Linzer",
    img: "/testimonials/testimonial-3.jpg",
    role: "Mechaber seforim",
    body: [
      "R’ Akiva has typeset many seforim of mine. The work was efficient and precise with a beautiful sefer at the end.",
      "<strong>He is also very easy to work with.</strong>",
    ],
  },
  {
    name: "R’ Moshe Zvi Twersky",
    img: "/testimonials/testimonial-4.jpg",
    role: "Toras Moshe, Mir, Mercaz Hatorah, Toras Chaim",
    body: [
      "Working with R’ Akiva Kulbersh was a pleasure. He put together my sefer in good taste, professionally, and arranged everything that had to be arranged without my having to worry about anything.",
      "<strong>I’ve recommended him to anyone who asks me about putting out a sefer.</strong>",
    ],
  },
];

export const TESTIMONIALS_DOWNLOADS: Testimonial[] = TESTIMONIALS_HOME.map((t) => ({ ...t }));
