import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface ParameterFormProps {
  parameter: {
    id: number
    name: string
    type: string
    required: boolean
  }
  onUpdate: (field: string, value: string | boolean) => void
  onRemove: () => void
}

export function ParameterForm({ parameter, onUpdate, onRemove }: ParameterFormProps) {
  return (
    <div className="rounded-md border p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">Parameter</h4>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <Trash className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`param-name-${parameter.id}`}>Name</Label>
            <Input
              id={`param-name-${parameter.id}`}
              value={parameter.name}
              onChange={(e) => onUpdate("name", e.target.value)}
              placeholder="id"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`param-type-${parameter.id}`}>Type</Label>
            <Select value={parameter.type} onValueChange={(value) => onUpdate("type", value)}>
              <SelectTrigger id={`param-type-${parameter.id}`}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
                <SelectItem value="object">Object</SelectItem>
                <SelectItem value="array">Array</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor={`param-required-${parameter.id}`}>Required</Label>
            <p className="text-xs text-muted-foreground">Is this parameter required?</p>
          </div>
          <Switch
            id={`param-required-${parameter.id}`}
            checked={parameter.required}
            onCheckedChange={(checked) => onUpdate("required", checked)}
          />
        </div>
      </div>
    </div>
  )
}

