import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;

    if (!user) {
        const redirectUrl = new URL('/sign-in', request.url)
        redirectUrl.searchParams.set('redirect', request.nextUrl.pathname + request.nextUrl.search)
        return NextResponse.redirect(redirectUrl)
    }
}

export const config = {
    matcher: ["/my-books", "/my-borrows", "/add-book", "/profile"],
}
