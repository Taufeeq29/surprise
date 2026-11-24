// ✏️ EDIT EVERYTHING HERE. Photos live in public/images, audio in public/music and public/sounds.
const img = (f) => `${import.meta.env.BASE_URL}images/${f}`
export const C = {
  name: 'Moniii',
  sender: 'Taufeeq',
  music: '/music/background-music.mp3',
  sounds: { pop: '/sounds/balloon-pop.mp3', cut: '/sounds/cake-cut.mp3', celebrate: '/sounds/celebration.mp3' },
  cover: { title: 'For My Moniii ❤️', subtitle: 'A little something made just for you...', button: 'Open Your Surprise 💗' },
  memories: {
    title: 'Our Little Memory Book 📖',
    photos: [
      
      { src: img('moni4.jpeg'), caption: 'That smile again 🌸' },
      { src: img('moni3.jpeg'), caption: 'Laughing for no reason' },
      { src: img('moniii-photo-2.jpeg'), caption: 'My favourite kind of day' },
      { src: img('moni2.jpg'), caption: 'Unforgettable ✨' },
    ],
    end: 'Every little moment has its own story, and we make those moments unforgettable. Namma bond epayum ipdiye irukanum Drlngg Moniii. ❤️',
    button: 'Continue Our Little Journey →',
  },
  cheers: {
    title: 'CHEERS TO 21! 🎂',
    text: '21 years of beautiful memories, Officially nee ipa Major aayita normal aah veyy aatam dhaan idhuku aprm sollava venummm',
    question: 'Are you excited for what’s next, Moniii? 💗', yes: 'YES! ❤️', no: 'NO 🙈',
  },
  balloons: {
    intro: 'Before we move ahead, I have a little surprise for you!',
    sub: 'Pop all 4 balloons to unlock your birthday wish! 🎈',
    doneTitle: 'YOU ARE SO SPECIAL, MONIII! ❤️',
    doneText: 'Make a wish and somewhere in the world a shining star will make it come true. 🌟 If you wish Something Adhu kandippa Nadakum cause nee poiye pesunalum adhu nejam',
    next: 'One More Surprise 🎁',
  },
  cake: { text: 'Now it’s time for the birthday girl to cut her cake! 🎂', button: 'Cut the Cake 🔪', done: 'Happy 21st Birthday, Moniii! ❤️', next: 'Read My Letter 💌' },
  letter: {
    title: 'Happy 21st Birthday, My Moniii! ❤️',
    body: [
      'My Dear Moniii,',
      'Today is not just another birthday. It’s the beginning of another beautiful chapter in your life.',
      'I hope your 21st year brings you endless happiness, beautiful opportunities, unforgettable adventures, and everything your heart has ever wished for.',
      'I may not always have the perfect words to express what you mean to me, but I want you to know something.',
      'You have become someone incredibly special in my life. Your smile can make an ordinary day feel extraordinary, and your presence brings a happiness that is difficult to explain.',
      'I want to see you achieve every dream you’ve ever imagined. I want to see you smile without a reason, laugh without limits, and live a life filled with beautiful moments.',
      'Whenever life becomes difficult, remember that you are stronger than you think, more beautiful than you realize, and more special than words can describe.',
      'And one thing I want you to remember:',
    ],
    highlight: 'TAUFEEQ IS ALWAYS THERE FOR YOU. ❤️',
    after: [
      'Not just during the happiest moments, but also during the difficult days. I’ll always wish for your happiness, celebrate your achievements, support your dreams, and hope that life treats you beautifully.',
      'You deserve the world, Moniii.',
      'Once again, Happy 21st Birthday!',
    ],
    signoff: 'With lots of love,\nYour Taufeeq ❤️',
    gallery: [
      { src: img('m1.jpeg'), caption: 'Always smiling' },
      { src: img('m2.jpeg'), caption: 'My favourite person' },
      { src: img('m3.jpeg'), caption: 'Little moments' },
      { src: img('m4.jpg'), caption: 'Pure joy' },
    ],
    next: 'One last thing... 💗',
  },
  final: {
    pre: 'Before you leave, I have one last question for you...',
    question: 'MONIII, DO YOU LOVE ME? ❤️', yes: 'YES ❤️', no: 'NO 💔',
    yesTitle: 'I LOVE YOU, MONIII! ❤️',
    yesText: ['Maybe this is the beginning of something beautiful. I don’t know what the future holds, but I know that having you in my life makes everything a little more special.', 'Thank you for being you. Here’s to more smiles, more memories, more adventures, and a beautiful journey together.', 'You are special to me, always. ❤️'],
    noTitle: 'Oh nooo! 🥺💔',
    noText: 'I guess I have to keep trying to win that beautiful heart of yours!\n\nI don’t deserve you!',
    replay: 'Replay My Surprise ❤️',
  },
}
