import { FC, PropsWithChildren } from "react"

import Head from "next/head"

import { NavBar } from "../ui";

interface Props extends PropsWithChildren {
  title?: string;
}


const origin = (typeof window === 'undefined') ? '' : window.location.origin;


export const Layout: FC<Props> = ({ children, title}) => {


  // Este console log es para poder saber que info tenia la constante que se creo de origin arriba en la linea 12 y que nos da (origin: http://localhost:3000)
  // console.log({origin});
  

  

  return (
    <>
        <Head>
            <title>{ title || 'PokemonApp'}</title>
            <meta name="author" content="Jorge Flores"/>
            <meta name="description" content={`Información sobre el pokémon ${ title }`}/>
            <meta name="keywords" content={`${ title }, pokémon, pokedex`}/>
            <meta property="og:title" content={`Información sobre ${ title }`} />
            <meta property="og:description" content={`Esta es la página sobre ${ title }`} />
            <meta property="og:image" content={`${ origin }/img/banner.png`} />
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
