import { Link, Spacer, Text, useTheme } from "@nextui-org/react"
import Image from "next/image"
import NextLink from 'next/link';

export const NavBar = () => {

    const { theme } = useTheme()

    return (
      
      <div style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'start',
          padding: '0px 20px',
          backgroundColor: theme?.colors.gray900.value
      }}>

          <Image 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            alt="icono de la app"
            width={70}
            height={70}
            priority
          />

          <NextLink href='/' passHref legacyBehavior>
            <Link>
              <Text color='white' h2>P</Text>
              <Text color='white' h3>okémon</Text>
            </Link>
          </NextLink>

          <Spacer css={{ flex: 1 }}/>

          <NextLink href='/favorites' passHref legacyBehavior>
            <Link>
              <Text color='white'>Favoritos</Text>
            </Link>
          </NextLink>


      </div>
    )
}
