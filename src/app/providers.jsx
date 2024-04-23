// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

const Providers = ({children}) =>{
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" forcedTheme="light">
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    )
}

export default Providers;