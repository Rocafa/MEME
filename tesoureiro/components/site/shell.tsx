"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bitcoin, BookOpen, LayoutDashboard, ShieldAlert, ShoppingCart, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { SIMULATED } from "@/lib/data"

const NAV = [
  { href: "/", label: "Início", icon: Bitcoin },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard#comprar", label: "Como comprar", icon: ShoppingCart },
  { href: "/#como-funciona", label: "Como funciona", icon: BookOpen },
  { href: "/#riscos", label: "Riscos", icon: ShieldAlert },
]

function Mark() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="grid size-7 place-items-center rounded-md bg-ink text-btc">
        <Bitcoin className="size-4" />
      </span>
      <span>Tesoureiro</span>
    </Link>
  )
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const crumb = pathname.startsWith("/dashboard") ? "Dashboard" : "Início"

  return (
    <div className="flex flex-1 flex-col">
      {SIMULATED && (
        <div className="bg-ink px-4 py-1.5 text-center font-mono text-[11px] tracking-wide text-ink-foreground">
          <span className="mr-2 inline-block size-1.5 rounded-full bg-btc align-middle" />
          Pré-lançamento · todos os números desta página são simulados
        </div>
      )}
      <div className="flex flex-1">
        <aside className="sticky top-0 hidden h-svh w-56 shrink-0 flex-col border-r bg-sidebar p-4 lg:flex">
          <Mark />
          <nav className="mt-8 flex flex-col gap-0.5" aria-label="Principal">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = href === pathname
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    active && "bg-muted font-medium text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              )
            })}
          </nav>
          <div className="mt-auto rounded-lg border bg-card p-3 text-xs leading-relaxed text-muted-foreground">
            O contrato oficial só será publicado neste site. Qualquer outro endereço é falso.
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur sm:px-6">
            <div className="lg:hidden">
              <Mark />
            </div>
            <div className="hidden items-center gap-2 text-sm lg:flex">
              <span className="text-muted-foreground">Tesoureiro</span>
              <span className="text-muted-foreground/50">/</span>
              <span>{crumb}</span>
            </div>
            <nav className="ml-auto flex items-center gap-1 lg:hidden" aria-label="Atalhos">
              <Link href="/dashboard" className="rounded-md px-2 py-1 text-sm hover:bg-muted">
                Dashboard
              </Link>
            </nav>
            <button
              type="button"
              disabled
              title="Disponível no lançamento"
              className="ml-auto hidden h-9 items-center gap-2 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground opacity-60 sm:inline-flex lg:ml-auto"
            >
              <Wallet className="size-4" />
              Conectar carteira
            </button>
          </header>
          <main className="flex-1 px-4 py-6 sm:px-6 lg:py-8">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
