import type { FilterKey, FilterValue } from "@/types/components/Pokemons"
import type { ApiResponse } from "@/types/responses/ApiResponse"
import type { Pokemons } from "@/types/responses/Pokemons"

export function useApiPokemon(){
  const getPokemons = async (offset=0, limit=21, filter: Record<FilterKey, FilterValue>)
  : Promise<ApiResponse<Pokemons[]>> => {
    return await $fetch(`/api/pokemons?offset=${offset}&limit=${limit}`, 
      { method: 'GET', query: filter }
    )
  }

  const getAll = async (offset=0, limit=21, filter: Record<FilterKey, FilterValue>) => {
    const { data, pagination } = await getPokemons(offset, limit, filter)
    return { data, pagination }
  }

  return {
    getAll,
    getPokemons
  }
}
