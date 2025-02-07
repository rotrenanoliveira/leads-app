'use client'

import {
  campaignFieldsTypesSchema,
  campaignOnSuccess,
  type CampaignFieldsTypes,
  type CampaignFormDataInput,
} from '@/utils/types'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { useRef, useState, useTransition } from 'react'
import { CampaignFieldInput } from './campaign-field-input'
import { Button } from '../ui/button'
import { CirclePlusIcon, Loader2Icon, PlusIcon } from 'lucide-react'
import { Separator } from '../ui/separator'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useRouter } from 'next/navigation'
import { CampaignInputImage } from './campaign-input-image'
import { actionCreateCampaign } from '@/server/actions/create-campaign'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export interface CampaignField {
  name: string
  field: string
  type: CampaignFieldsTypes
}

type OnSuccess = 'message' | 'redirect' | 'whatsapp'

export function CreateCampaignForm() {
  const [onSuccess, setOnSuccess] = useState<OnSuccess>('message')
  const [fields, setFields] = useState<CampaignField[]>([])
  const [isTransitioning, startTransition] = useTransition()

  const router = useRouter()
  const isPending = isTransitioning

  function handleAddField() {
    setFields(() =>
      [...fields, { name: `field-key-${fields.length + 1}`, field: '', type: 'text' }].map((field, index) => {
        return { ...field, name: `field-key-${index}`, type: campaignFieldsTypesSchema.parse(field.type) }
      }),
    )
  }

  function handleChangeField(field: CampaignField) {
    setFields((prev) => {
      const index = prev.findIndex((f) => f.name === field.name)
      if (index === -1) return prev

      prev[index] = field

      return [...prev]
    })
  }

  function handleRemoveField(fieldName: string) {
    setFields((prev) => prev.filter((field) => field.name !== fieldName))
  }

  function handleChangeOnSuccess(value: OnSuccess) {
    setOnSuccess(value)
  }

  const formRef = useRef<HTMLFormElement>(null)

  async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    startTransition(async () => {
      const campaign: CampaignFormDataInput = {
        name: data.campaign.toString(),
        title: data.title.toString(),
        description: data.description.toString(),
        callToAction: data['call-to-action'].toString(),
        fields: fields.map((field) => ({ name: field.field, type: field.type })),
        campaignImage: data['campaign-image'],
        onSuccess: campaignOnSuccess.parse({
          type: data['on-success'],
          data: data['on-success-data'].toString(),
        }),
        imageUrl: undefined,
      }

      const [result, error] = await actionCreateCampaign(campaign)

      if (result === null) {
        toast.error(error.message)
        return
      }

      toast.success(result.message)
      router.push('/campaigns')
    })
  }

  return (
    <form className="xl:w-1/2 mt-8 space-y-4" onSubmit={onFormSubmit} ref={formRef}>
      <div className="space-y-2">
        <Label htmlFor="campaign">Nome da campanha</Label>
        <Input
          type="text"
          id="campaign"
          name="campaign"
          placeholder="nome da sua campanha"
          className="bg-white dark:bg-zinc-950"
          required
        />
        <p className="font-medium text-sm text-muted-foreground">
          Escolha um nome curto e que seja de fácil identificação. Este campo não será visível pro usuário e servirá
          para você identificar a campanha.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título da campanha</Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="título da campanha"
          className="bg-white dark:bg-zinc-950"
          required
        />
        <p className="font-medium text-sm text-muted-foreground">
          Este será o título da campanha, que será visível para os usuários. Seja claro e fácil de identificar.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição da campanha</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Descreva o produto/campanha em até 450 caracteres."
          maxLength={450}
          className="bg-white dark:bg-zinc-950"
          required
        />
        <p className="font-medium text-sm text-muted-foreground">
          Este campo será visível para o usuário e será usado para descrever a campanha/produto. Seja claro e conciso.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="call-to-action">Call to Action</Label>
        <Input
          type="text"
          id="call-to-action"
          name="call-to-action"
          placeholder="call to action da campanha"
          className="bg-white dark:bg-zinc-950"
          required
        />
        <p className="font-medium text-sm text-muted-foreground">
          Call to Action é o texto que o usuário verá no botão, por exemplo "Adquira agora" ou "Saiba mais".
        </p>
      </div>

      <CampaignInputImage />

      <div className="space-y-2">
        <Label>Campos - Leads</Label>

        {fields.map((field) => {
          return (
            <CampaignFieldInput
              key={field.name}
              field={field}
              changeField={handleChangeField}
              removeField={handleRemoveField}
            />
          )
        })}

        <Button type="button" variant="outline" className="w-full" onClick={handleAddField}>
          Adicionar Campo
          <PlusIcon className="ml-1 size-3" />
        </Button>
        <p className="font-medium text-sm text-muted-foreground">
          Adicione campos das informações que você deseja coletar.
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label htmlFor="on-success">Estado de sucesso</Label>
        <p className="font-medium text-sm text-muted-foreground">
          Escolha qual o comportamento após o usuário completar o formulário.
        </p>

        <RadioGroup defaultValue={onSuccess} name="on-success">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="message" id="r1" onChange={() => handleChangeOnSuccess('message')} />
            <Label htmlFor="r1">Mensagem de sucesso</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="redirect" id="r2" onChange={() => handleChangeOnSuccess('redirect')} />
            <Label htmlFor="r2">Enviar usuário para outra página</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="whatsapp" id="r3" onChange={() => handleChangeOnSuccess('whatsapp')} />
            <Label htmlFor="r3">Enviar usuário para WhatsApp de contato</Label>
          </div>
        </RadioGroup>

        <Input
          id="on-success-data"
          name="on-success-data"
          placeholder="conteúdo do sucesso"
          className="bg-white dark:bg-zinc-950"
          required
        />

        <p className="font-medium text-sm text-muted-foreground">
          Insira o conteúdo do sucesso, se for "mensagem de sucesso" informe o texto a ser enviado, caso seja
          "redirecionar" informe a URL para onde o usuário será redirecionado e caso seja "WhatsApp" informe o número de
          WhatsApp.
        </p>

        <div className="flex flex-col gap-2">
          <span className="font-light text-sm text-muted-foreground">
            Para mensagem de sucesso escolha algo curto como "Obrigado por se cadastrar!".
          </span>
          <span className="font-light text-sm text-muted-foreground">
            Para redirecionamento informe a URL no padrão "https://www.google.com".
          </span>
          <span className="font-light text-sm text-muted-foreground">
            Para WhatsApp, informe o número do WhatsApp no padrão "11 99999999".
          </span>
        </div>
      </div>

      <Button type="submit" variant="default" disabled={isPending}>
        {isPending && <Loader2Icon strokeWidth={1.25} className="animate-spin size-4" />}
        <CirclePlusIcon className={cn('size-4', isPending && 'hidden')} />
        Criar campanha
      </Button>
    </form>
  )
}
