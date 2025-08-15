import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'

// Separando responsabilidades (Smell 1)
const hasToken = (token?: string): boolean => !!token

const isTokenValid = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token)

    // Checa se o token ainda é válido
    return decoded.exp > Date.now() / 1000
  } catch (error) {
    // Swallowing exceptions tratado com log (Smell 2)
    console.error('Token inválido ou erro ao decodificar:', error)
    return false
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!hasToken(token) || !isTokenValid(token!)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/area_logada/:path*'],
}


