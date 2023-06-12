

import { Grid } from '@nextui-org/react';
import { NextPage } from 'next';
import React, { FC } from 'react'
import { FavoriteCardPokemon } from './';

interface props {
    pokemons: number[];
  }

// aqui sirve al parecer para lo mismo el Nextpage o el FC aun no comprendo bien la diferencia entre ellos
// Tambien se puede poner el props en cualquiera de los dos lados que se pone en el codigo de abajo NextPage<props> ó { pokemons }: props)
export const FavoritePokemons: NextPage<props> = ({ pokemons }: props) => {
  return (
    <Grid.Container gap={ 2 } direction="row" justify="flex-start">
            {
              pokemons.map( id => (
                <FavoriteCardPokemon key={ id } pokemonId={ id } />
              ) )
            }
          </Grid.Container>
  )
}



