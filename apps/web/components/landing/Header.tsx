import Link from "next/link"

import ConnectWallet from "./ConnectWallet"

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-xl font-semibold tracking-tight">Monarc</div>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/games" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Games
            </Link>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Docs
            </Link>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              GitHub
            </Link>
          </nav>
        </div>
        <ConnectWallet />
      </div>
    </header>
  )
}
