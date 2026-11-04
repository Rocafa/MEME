import { CheckCircle2, CircleDashed, XCircle } from "lucide-react"
import type { DiaryKind } from "@/lib/data"
import { cn } from "@/lib/utils"

const KIND: Record<DiaryKind, { label: string; icon: typeof CheckCircle2; cls: string }> = {
  executado: { label: "Executado", icon: CheckCircle2, cls: "text-emerald-700" },
  proposta: { label: "Proposta", icon: CircleDashed, cls: "text-muted-foreground" },
  recusado: { label: "Recusado pelo guardião", icon: XCircle, cls: "text-red-700" },
}

export function Diary({ items }: { items: { time: string; kind: DiaryKind; text: string }[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((d) => {
        const k = KIND[d.kind]
        const Icon = k.icon
        return (
          <li key={d.time + d.text} className="rounded-lg bg-muted/60 p-3.5">
            <div className="flex items-center gap-2 text-xs">
              <Icon className={cn("size-3.5", k.cls)} />
              <span className={cn("font-medium", k.cls)}>{k.label}</span>
              <span className="ml-auto font-mono text-muted-foreground">{d.time}</span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed">{d.text}</p>
          </li>
        )
      })}
    </ul>
  )
}
