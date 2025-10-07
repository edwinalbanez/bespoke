import { Input } from "./ui/input";

export default function Search({
  placeholder = 'Search..',
  onChange,
  ...props
}: React.ComponentProps<"input"> & {
  placeholder?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {

  return(
    <div className="grid gap-3 w-md">
      <Input
        {...props}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
      />
    </div>
  )
}