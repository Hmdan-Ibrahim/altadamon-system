import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import SelectCom from "./SelectCom"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"


export function FormDialog({
  open,
  onOpenChange,
  title,
  fields = [],
  initialData = {},
  onSubmit,
  submitText = "حفظ",
}) {
  const [formData, setFormData] = React.useState(initialData)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    onOpenChange(false)
  }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{`${title}`}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>
                {field.type !== "select" && field.label}
                {field.required && <span className="text-destructive mr-1">*</span>}
              </Label>
              {field.type === "select" ? (
                <SelectCom
                  label={field.label}
                  value={formData[field.name] || ""}
                  onValueChange={(value) => setFormData({ ...formData, [field.name]: value })}
                  selectItems={field.options || []}
                />

              ) : field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background"
                  value={formData[field.name] || ""}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  required={field.required}
                />
              ) : (
                <Input
                  id={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  required={field.required}
                />
              )}
            </div>
          ))}
          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit">{submitText}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
