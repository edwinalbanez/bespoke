import { Input } from "../ui/input"
import { Label } from "../ui/label"
import ErrorLine from "./error-line"

const FormField = ({
  children,
  label,
  error,
  ...props
}: React.ComponentProps<"input"> & {
  children?: React.ReactNode,
  label: string,
  error?: string | null
}) => (
  <div className="grid w-full gap-3">
    <Label>{label}</Label>
    <Input {...props} />
    {error && <ErrorLine field={error} />}

    {children}
  </div>
)

export default FormField