import { router } from "@inertiajs/react"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Links { 
  url: string | null, 
  label: string, 
  page: number, 
  active: boolean
}

export default function Pagination({ links, filter }: { links: Links[], filter?: string}) {
  
  return (
    <div className="flex items-center justify-center gap-2">
      {links.map(link => 
        <Button
          key={link.label}
          variant={link.active ? 'default' : 'secondary'}
          onClick={() => router.get(
            link.url ?? '',
            filter ? { filter } : {},
            { preserveState: true }
          )}
        >
          {link.label.includes('Previous') && <ChevronLeft />}
          {link.label.includes('Next') && <ChevronRight />}
          {link.label.length === 1 && link.label}
        </Button>
      )}
    </div>
  )
}
