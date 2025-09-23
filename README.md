# 🥓₿ Bacon Wrapped Bitcoin (BWBTC)

The most deliciously decentralized memecoin on PulseChain! Where crispy bacon meets digital gold in perfect harmony.

## 🚀 About BWBTC

Bacon Wrapped Bitcoin (BWBTC) is a fun, community-driven memecoin built on PulseChain that combines the beloved meme culture of crypto with the mouth-watering appeal of bacon. Our mission is to create a vibrant, engaging community while providing a deflationary token mechanism that rewards holders.

### Key Features

- **Lightning Fast**: Built on PulseChain for blazing fast transactions
- **Crispy Secure**: Smart contract audited and locked
- **Sizzling Community**: Growing community of bacon lovers and crypto enthusiasts
- **Deflationary**: Every transaction burns tokens, making BWBTC rarer over time

## 🛠️ Technology Stack

This website is built with modern web technologies:

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Google Fonts** - Inter and JetBrains Mono fonts
- **Framer Motion** - Smooth animations and interactions

## 📦 Installation

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm package manager

### Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/bacon-wrapped-bitcoin.git
   cd bacon-wrapped-bitcoin
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🎨 Customization

### Colors and Theme

The website uses a custom color scheme inspired by bacon and bitcoin. You can modify the theme in `app/globals.css`:

- **Primary**: Bitcoin gold/orange (`oklch(0.65 0.15 45)`)
- **Secondary**: Bacon brown (`oklch(0.45 0.08 35)`)
- **Accent**: Warm orange (`oklch(0.75 0.12 65)`)
- **Background**: Warm cream (`oklch(0.98 0.01 85)`)

### Fonts

The website uses Google Fonts:
- **Inter** - Primary font for body text
- **JetBrains Mono** - Monospace font for code/technical content

### Animations

Custom CSS animations are defined in `globals.css`:
- `float-animation` - Floating effect for the main bacon/bitcoin emoji
- `bounce-gentle` - Gentle bouncing animation
- `wiggle` - Playful wiggle effect
- `pulse-glow` - Glowing pulse effect for buttons

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop (1024px and up)
- Large screens (1280px and up)

## 🔧 Development

### Project Structure

\`\`\`
bacon-wrapped-bitcoin/
├── app/
│   ├── globals.css          # Global styles and theme
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Main page component
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── hero.tsx             # Hero section
│   ├── features.tsx         # Features section
│   ├── tokenomics.tsx       # Tokenomics section
│   ├── roadmap.tsx          # Roadmap section
│   ├── community.tsx        # Community section
│   ├── navigation.tsx       # Navigation component
│   └── footer.tsx           # Footer component
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
\`\`\`

### Adding New Sections

1. Create a new component in the `components/` directory
2. Import and add it to `app/page.tsx`
3. Update navigation links in `components/navigation.tsx`

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the existing color scheme
- Maintain responsive design patterns
- Use semantic HTML elements
- Ensure accessibility with proper ARIA labels

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with every push

### Other Platforms

The website can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

- **Website**: [https://baconwrappedbitcoin.com](https://baconwrappedbitcoin.com)
- **Telegram**: [t.me/BaconWrappedBitcoin](https://t.me/BaconWrappedBitcoin)
- **Twitter**: [@BaconBitcoinBWBTC](https://twitter.com/BaconBitcoinBWBTC)
- **Discord**: [discord.gg/bwbtc](https://discord.gg/bwbtc)

## ⚠️ Disclaimer

BWBTC is a memecoin created for entertainment purposes. Cryptocurrency investments are highly risky and volatile. Please do your own research and only invest what you can afford to lose. This is not financial advice.

---

**Made with 🥓 and ❤️ by the BWBTC Community**
