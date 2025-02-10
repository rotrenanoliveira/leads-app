import Image from 'next/image'
import { Image as ImageIcon, Upload } from 'lucide-react'
import { type ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function CampaignInputImage() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files

    if (!fileList) {
      return
    }

    if (fileList.length > 1) {
      toast.error('A quantidade máxima de imagem por campanha é 1.')

      return
    }

    const inputFile = fileList[0]

    if (inputFile.size > 1024 * 1024 * 2) {
      toast.error('O tamanho máximo da imagem é 2MB.')
      return
    }

    const isFileAnImage = inputFile.type.startsWith('image/')

    if (!isFileAnImage) {
      toast.error('O arquivo selecionado não é uma imagem.')

      return
    }

    setFileName(inputFile.name)

    const fileURL = URL.createObjectURL(inputFile)
    setImageUrl(fileURL)
  }

  return (
    <div className="space-y-2">
      <Label>Imagem da campanha</Label>
      <p className="font-medium text-sm text-muted-foreground">
        Carregue a imagem que deseja exibir na campanha. O tamanho ideal é de 640x768.
      </p>

      <div className="flex gap-4">
        <div className="w-1/2 lg:w-1/3 space-y-2">
          <Label
            htmlFor="campaign-image"
            className="min-h-[10rem] cursor-pointer flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed bg-zinc-50 dark:bg-zinc-950"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 transition-all duration-150 hover:bg-zinc-200">
              <Upload size={24} />
            </div>
            <span className="text-sm font-light text-gray-400">Carregue a imagem.</span>
          </Label>

          <Input
            onChange={handleSelectImages}
            type="file"
            accept="image/*"
            hidden={true}
            id="campaign-image"
            name="campaign-image"
            className="invisible h-0 w-0"
          />
        </div>

        {fileName && (
          <div className="flex-1">
            <div className="min-h-[10rem] cursor-pointer flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed">
              <div className="flex h-20 w-20 items-center justify-center rounded-md bg-zinc-100 transition-all duration-150">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={fileName}
                    width={80}
                    height={80}
                    className="size-20 object-cover rounded-md"
                  />
                ) : (
                  <ImageIcon size={24} />
                )}
              </div>
              <span className="text-sm font-light text-gray-900">{fileName.substring(0, 20).concat('...')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
