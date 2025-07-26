import { Mascot } from './mascot'

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Mascot expression="logo" size="md" />
            <span className="hidden font-bold sm:inline-block">
              PumpFun Bundler
            </span>
          </a>
          <nav className="flex items-center gap-6 text-sm">
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/dashboard"
            >
              Dashboard
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/wallets"
            >
              Wallets
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/tokens"
            >
              Tokens
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/bundles"
            >
              Bundles
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search or other controls can go here */}
          </div>
          <nav className="flex items-center">
            {/* User menu or settings can go here */}
          </nav>
        </div>
      </div>
    </header>
  )
}
