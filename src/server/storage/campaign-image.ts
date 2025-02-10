import axios from 'axios'
import sharp from 'sharp'

import { env } from '@/env'

import { generateNanoId } from '@/lib/nanoid'
import type { CampaignImage } from '@/utils/types'
import { getUploadUrl } from './get-upload-url'

export async function uploadCampaignImage(image: File) {
  const bannedMimeTypes = [
    '.exe', // (executáveis)
    '.dll', // (bibliotecas dinâmicas)
    '.bat', // (arquivos de lote)
    '.cmd', // (arquivos de comando)
    '.sh', // (scripts shell)
    '.cgi', // (scripts cgi)
    '.jar', // (arquivos jars)
    '.app', // (aplicativos)
  ]

  if (bannedMimeTypes.includes(image.type)) {
    throw new Error('Tipo de arquivo inválido')
  }

  const fileName = image.name
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/_/g, '-')
    .replace(/--+/g, '-')
    .replace(/-$/g, '')

  const fileKey = generateNanoId().concat('-').concat(fileName)
  const fileType = image.type
  // const fileName = image.name

  const signedUrl = await getUploadUrl({
    fileType,
    fileKey,
  })

  const buffer = Buffer.from(await image.arrayBuffer())
  const imageBuffer = await sharp(buffer)
    .webp({ quality: 80 })
    .resize(352, 448, {
      fit: 'cover',
    })
    .toBuffer()

  await axios.put(signedUrl, imageBuffer, {
    headers: {
      'Content-Type': fileType,
    },
  })

  const attachment: CampaignImage = {
    file: fileKey,
    url: String(env.ASSETS_URL).concat('/').concat(fileKey),
  }

  return attachment
}
