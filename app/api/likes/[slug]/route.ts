import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const likesFilePath = path.join(process.cwd(), 'data', 'likes.json')

function ensureLikesFile() {
  const dataDir = path.dirname(likesFilePath)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(likesFilePath)) {
    fs.writeFileSync(likesFilePath, JSON.stringify({}))
  }
}

function getLikesData(): Record<string, number> {
  ensureLikesFile()
  const data = fs.readFileSync(likesFilePath, 'utf-8')
  return JSON.parse(data)
}

function saveLikesData(data: Record<string, number>) {
  ensureLikesFile()
  fs.writeFileSync(likesFilePath, JSON.stringify(data, null, 2))
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const likesData = getLikesData()
  const likes = likesData[slug] || 0

  return NextResponse.json({ likes })
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const likesData = getLikesData()
  likesData[slug] = (likesData[slug] || 0) + 1
  saveLikesData(likesData)

  return NextResponse.json({ likes: likesData[slug] })
}
