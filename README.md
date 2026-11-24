# For Moniii ❤️ — birthday surprise

## Run
Needs Node 18+.
    npm install
    npm run dev      # open the printed localhost link (phone: use the Network link)
    npm run build    # production build in /dist (host free on Netlify / Vercel / GitHub Pages)

## Personalise
- **Messages & captions:** `src/config.js` (every text lives there).
- **Photos:** drop JPGs into `public/images/` with these exact names:
  moniii-photo-1..5.jpg, final-photo-1.jpg, final-photo-2.jpg (cute emoji placeholders show until then).
- **Music:** `public/music/background-music.mp3`. **Sounds:** `public/sounds/balloon-pop.mp3, cake-cut.mp3, celebration.mp3`
  (a soft synth beep plays if a file is missing). Use royalty-free files.
- Colours: top of `src/styles.css`.
- Music starts on the first tap (browsers block autoplay); 🎵 button mutes.
