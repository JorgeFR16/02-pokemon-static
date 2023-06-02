import { FC, PropsWithChildren } from "react"

import Head from "next/head"
import { NavBar } from "../ui";

interface Props extends PropsWithChildren {
  title?: string;
}

export const Layout: FC<Props> = ({ children, title}) => {
  return (
    <>
        <Head>
            <title>{ title || 'PokemonApp'}</title>
            <meta name="author" content="Jorge Flores"/>
            <meta name="description" content={`Información sobre el pokémon ${ title }`}/>
            <meta name="keywords" content={`${ title }, pokémon, pokedex`}/>
        </Head>

        <NavBar />

        <main style={{
          padding: '0px 20px'
        }}>
            { children }
        </main>

    
    </>
  )
}
