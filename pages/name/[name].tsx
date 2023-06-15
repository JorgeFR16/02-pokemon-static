import { useState } from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import confetti from 'canvas-confetti';

import { Layout } from "../../components/layouts";
import { pokeApi } from "@/api";
import { Pokemon, PokemonListResponse } from "@/interfaces";
import { getPokemonInfo, localFavorites } from "@/utils";

 interface Props {
    pokemon: Pokemon;
 }



const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

    // // Este console log es para poder ver que se redujo la cantidad de informacion que se extrae desde la api (solo tenemos la informacion que vamos a utilizar)
    // console.log({ pokemon });
    


    const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites( pokemon.id ) );



    // console.log(pokemon); // para ver la informacion que contiene el pokemon

    // Este console log da error porque el local storage no esta definido en el backend solo en frontend
    // console.log(localStorage.getItem('favorites'));
    

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite( pokemon.id );
        setIsInFavorites( !isInFavorites );

        if ( isInFavorites ) return;

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            }
        })

    }

    

    // console.log({ existeWindow: typeof window}); // Esto funciona para poder ver si es que estamos realizando algo en el lado del servidor o del cliente (ayuda ver los errores que manda el 500 es para servidor)

    

    return (
        <Layout title={pokemon.name.toUpperCase()}>

            <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
                <Grid xs={ 12 } sm={ 4 }>
                    <Card hoverable css={{ padding: '30px'}}>
                        <Card.Body>
                            <Card.Image 
                                src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={ pokemon.name }
                                width="100%"
                                height={ 200 }
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={ 12 } sm={ 8 }>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Text h1 transform="capitalize">{ pokemon.name}</Text>
                            <Button 
                                color='gradient'
                                ghost={ !isInFavorites }
                                onClick={ onToggleFavorite }
                            >
                                { isInFavorites ? 'En Favoritos' : 'Guardar en favoritos' }
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container direction="row" display="flex">
                                <Image 
                                    src={ pokemon.sprites.front_default }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image 
                                    src={ pokemon.sprites.back_default }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image 
                                    src={ pokemon.sprites.front_shiny }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image 
                                    src={ pokemon.sprites.back_shiny }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>

        </Layout>
    )
    
};





// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


// Los getsStaticPaths tiene que tener la data que son los parametros que tienen que mandarle a getStaticProps
export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    const pokemonNames: string[] = data.results.map( pokemon => pokemon.name )

    return {
        // Esto es como se podria hacer manualmente las rutas staticas
        // paths: [
        //     {
        //         params: { id: '1' }
        //     },
        //     {
        //         params: { id: '2' }
        //     },
        //     {
        //         params: { id: '3' }
        //     }
        // ],
        //fallback:false

        paths: pokemonNames.map( name => ({
            params: { name }
        })),
        fallback: 'blocking'
    }
}


// params viene de getStaticProps que esta arriba y le manda la data como parametros
export const getStaticProps: GetStaticProps = async ({ params }) => {
      
  
    const { name } = params as { name: string };

    const pokemon = await getPokemonInfo( name );


    if ( !pokemon ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

  
    return {
      props: {
        pokemon
      },
      revalidate: 86400 // Estos son segundos  que es lo mismo que 60*60*24 pero no se pone asi porque next realizaria esta operacion para todas las paginas y es una carga innecesaria
    }



    // Esto es como se ve de otra forma la definicion de los datos que se quieren extraer de data, pero se hace mas codigo

    // const { name } = params as { name: string };

    // const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ name }`);

    // // const pokemon = {
    // //     id: data.id,
    // //     name: data.name,
    // //     sprites: data.sprites
    // // }

  
    // return {
    //   props: {
    //     pokemon: {
    //         id: data.id,
    //         name: data.name,
    //         sprites: data.sprites
    //     }
    //   }
    // }


  }




export default PokemonByNamePage;
 