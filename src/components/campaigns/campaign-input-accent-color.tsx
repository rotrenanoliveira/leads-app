import { useEffect, useState } from 'react'
import Sketch from '@uiw/react-color-sketch'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '../ui/label'

export function CampaignInputAccentColor() {
  const [hex, setHex] = useState('#FACC15')
  const [invertColor, setInvertColor] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  function invertColorHandler() {
    setInvertColor(!invertColor)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => invertColorHandler(), [hex])

  const getContrastColor = (hexColor: string) => {
    const threshold = 128 // Adjust this threshold as needed
    const r = Number.parseInt(hexColor.slice(1, 3), 16)
    const g = Number.parseInt(hexColor.slice(3, 5), 16)
    const b = Number.parseInt(hexColor.slice(5, 7), 16)
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b

    return luminance > threshold ? '#000000' : '#ffffff'
  }

  const invertStyle = {
    filter: invertColor ? 'invert(1)' : 'none',
    color: invertColor ? 'white' : getContrastColor(hex),
  }

  const btnBackgroundColor = {
    backgroundColor: isHovered ? `${hex}BF` : hex,
  }

  return (
    <div className="space-y-2 flex flex-col">
      <Label>Cor de destaque</Label>
      <div className="w-full inline-flex items-center justify-between gap-2 md:w-auto md:justify-normal">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Selecionar cor</Button>
          </PopoverTrigger>

          <PopoverContent className="w-fit p-0">
            <div className="w-fit">
              <Sketch color={hex} disableAlpha={true} onChange={(color) => setHex(color.hex)} />
            </div>
          </PopoverContent>
        </Popover>

        <div
          className="w-40 h-9 rounded-lg p-1 cursor-pointer flex items-center justify-center"
          style={btnBackgroundColor}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="text-center font-normal" style={invertStyle}>
            Exemplo
          </span>
        </div>

        <Input type="text" id="accent-color" name="accent-color" value={hex} className="hidden" readOnly required />
      </div>

      <p className="font-medium text-sm text-muted-foreground">
        Cor de destaque é a cor tema da campanha e será usada em diversos lugares, como o botão de chamada para a ação
        principal entre outros lugares de destaque.
      </p>
    </div>
  )
}
