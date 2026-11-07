# Mohamed Elbalshy — Personal Portfolio

A clean, modern dark single-page portfolio site for marketing myself as a
freelance software engineer. Pure **HTML / CSS / vanilla JS** — no build step,
no framework, easy to host anywhere for free.

## Structure

```
portfolio/
├── index.html          # All page content
├── css/styles.css      # Theme & layout
├── js/main.js          # Interactions (nav, reveal, typewriter, carousel)
└── README.md
```

## Before you publish — fill in these TODO items

Search `index.html` for `TODO` comments. The main ones:

1. **Email address** — two `mailto:you@example.com` links (hero + contact). Replace
   with your real email.
2. **Profile photo** — already set to `assets/me.jpeg` (your WhatsApp image). Replace
   that file with a higher-res square-cropped version if you prefer.
3. **Exact dates/years** — the Experience timeline currently says "Most recent" /
   "Recent" / "2 years". Add real dates.
4. **Stats** — the About numbers (`40+` projects, `100%` success, `5.0` rating)
   are placeholders. Replace them with your real Upwork stats.
5. **Reviews** — add your 15 Upwork review screenshots to `assets/reviews/` named
   `review-01.jpg` … `review-15.jpg` (see `assets/reviews/README.md` for details).
6. **Project "Live" links & screenshots** — project cards link "Code" to your
   GitHub and "Live" to `#`. Add real live URLs or remove the link if a project
   isn't public.
7. **Domain** — `og:url` and `og:image` in the `<head>` point at
   `https://your-domain.com`. Set your live URL once deployed.

Your **GitHub / LinkedIn / Upwork** links are already wired in everywhere.

## Customizing colors

Open `css/styles.css` and edit the `:root` variables at the top:

```css
--accent: #38bdf8;   /* primary accent (sky blue) */
--accent-2: #818cf8; /* secondary accent (indigo) */
```

The gradient is built from those two colors.

## Running locally

Just open `index.html` in a browser — no server needed. Or serve it:

```bash
cd portfolio
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploying (free options)

**Netlify / Vercel** (drag-and-drop or Git):
- Netlify: drag the `portfolio/` folder onto https://app.netlify.com/drop
- Vercel: `npx vercel portfolio`

**GitHub Pages**:
1. Push the `portfolio/` folder to a repo.
2. Settings → Pages → deploy from a branch, select the folder/root.
3. Site live at `https://mohamedelbalshy.github.io/<repo>/`.

After deploying, update the `og:url` in `index.html` to your live URL.
