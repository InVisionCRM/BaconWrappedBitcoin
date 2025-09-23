export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                🥓₿ Bacon Wrapped Bitcoin
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              The most deliciously decentralized memecoin on PulseChain. Join the sizzling revolution today!
            </p>
            <div className="text-sm text-muted-foreground">
              <p>Ticker: BWBTC</p>
              <p>Blockchain: PulseChain</p>
              <p>Total Supply: 1,000,000,000</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#tokenomics" className="hover:text-primary transition-colors">
                  Tokenomics
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-primary transition-colors">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-primary transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Audit Report
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Brand Kit
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Bacon Wrapped Bitcoin (BWBTC). All rights reserved. This is a memecoin for entertainment purposes.
            Please invest responsibly.
          </p>
          <div className="mt-4 text-xs text-muted-foreground">
            <p>
              🥓 Remember: Crypto investments are risky. Only invest what you can afford to lose. BWBTC is not financial
              advice, just delicious fun! 🥓
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
