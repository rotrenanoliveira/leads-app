import { CAMPAIGN_FIELDS } from '@/utils/constants'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { XIcon } from 'lucide-react'
import { campaignFieldsTypesSchema } from '@/utils/types'
import type { CampaignField } from './create-campaign-form'

interface CampaignFieldInputProps {
  field: CampaignField
  changeField: (field: CampaignField) => void
  removeField: (fieldName: string) => void
}

export function CampaignFieldInput({ field, changeField, removeField }: CampaignFieldInputProps) {
  function handleChangeFieldName(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const slug = value
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    changeField({ ...field, field: value, slug })
  }

  function handleChangeFieldType(value: string) {
    changeField({ ...field, type: campaignFieldsTypesSchema.parse(value) })
  }

  return (
    <div className="flex gap-2">
      <div className="w-1/2">
        <Input
          type="text"
          id={field.name}
          name={field.name}
          onChange={handleChangeFieldName}
          placeholder="nome do campo"
          className="bg-white dark:bg-zinc-950"
          required
        />
      </div>

      <div className="flex-1 flex gap-2">
        <Select defaultValue="text" onValueChange={handleChangeFieldType}>
          <SelectTrigger className="flex-1 bg-white dark:bg-zinc-950">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {CAMPAIGN_FIELDS.map(([key, value]) => (
                <SelectItem key={key} value={key} className="bg-white dark:bg-zinc-950">
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button type="button" variant="outline" onClick={() => removeField(field.name)}>
          <XIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}
