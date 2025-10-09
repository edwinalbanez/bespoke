// import { router } from "@inertiajs/react"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "@/types"

export default function Pagination({ links }: { links: Link[]}) {
  
  // const handleNavigation = (url: string | null) => {
  //   if (!url) return

  //   router.get(
  //     url,
  //     filter ? { filter } : {},
  //     { preserveState: true }
  //   )
  // }

  

  const renderLabel = (label: string) => {
    if (label.includes('Previous')) {
      return (
        <>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Anterior</span>
        </>
      )
    }

    if (label.includes('Next')) {
      return (
        <>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Siguiente</span>
        </>
      )
    }

    return label;
  }


  return (
    <div className="flex items-center justify-center gap-2 mx-auto">
      {links.map(link => 
        <Button
          key={link.label + link.page}
          variant={link.active ? 'default' : 'secondary'}
          onClick={link.click}
          // onClick={() => handleNavigation(link.url)}
        >
          {renderLabel(link.label)}
        </Button>
      )}
    </div>
  )
}

