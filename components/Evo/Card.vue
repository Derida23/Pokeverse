<script setup lang="ts">
import { generations } from '~/constants/filter';
import type { EvolvesTo } from '~/types/responses/Evolution';

const props = defineProps({
  evo: {
    type: Object as PropType<EvolvesTo>,
    required: true
  },
  item: {
    type: Boolean,
    default: true
  }
})

function getGen (gen: number): string {
  return generations[0].find((item) => item.id === gen)?.label ?? '' 
}
const itemMap: Record<string, string> = {
  'black-augurite': 'blackaugurite',
  'tart-apple': 'tartapple',
  'sweet-apple': 'sweetapple',
  'cracked-pot': 'crackedpot',
  'auspicious-armor': 'auspiciousarmor',
  'malicious-armor': 'maliciousarmor',
  'peat-block': 'peatblock'
};

const imgUrl = computed(() => {
  const item = props.evo.detail.item;
  const customItem = itemMap[item];
  
  return customItem
    ? `https://www.serebii.net/itemdex/sprites/sv/${customItem}.png`
    : `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/items/${item}.png`;
});

const borderClass = computed(() => {
  return !props.item ? `border-${getNameTypes(props.evo.detail.type[0])} border` : 'border';
});
</script>

<template>
  <div class="flex items-center gap-x-2 mr-2">
      <div v-if="item" class="z-10">
        <div 
          v-if="evo.detail.level"
          class="arrow-wrapper">
            Lv<br>
            {{ evo.detail.level }}
        </div>
  
        <div 
          v-if="evo.detail.item"
          class="arrow-wrapper">
          <img 
            :src="imgUrl" 
            :alt="evo.detail.item">
        </div>
  
        <div 
          v-if="!evo.detail.item && !evo.detail.level"
          class="arrow-dashed">
            <UIcon name="i-lucide-arrow-right" class="font-bold text-lg text-stone-700"/>
        </div>
      </div>

      <div v-if="item" class="w-10 h-0.5 bg-stone-700 mx-[-1rem]" />

      <section 
        class="pokemon-wrapper" 
        :class="borderClass">
       <img 
         :src="`https://pokemon-img.pages.dev/192x192/${props.evo.detail.id}.webp`" 
         class="w-14">
       <div>
         <p class="text-sm font-semibold first-letter:uppercase">
           {{ evo.detail.name }}
         </p>
   
         <div class="flex items-center gap-2 mt-1 text-xs">
           <div class="flex">
             <div class="flex items-end mr-1">
               <div 
                 class="pokemon-types-circle" 
                 :class="`bg-skill-${getNameTypes(evo.detail.type[0])}`" />
               <div
                 v-if="evo.detail.type.length > 1"
                 class="pokemon-types-circle-option"
                 :class="`bg-skill-${getNameTypes(evo.detail.type[1])}`" />
             </div>
           </div>
           <div>
             {{  getGen(evo.detail.generation) }}
           </div>
         </div>
       </div>
     </section>

  </div>
</template>


<style scoped lang="postcss">
.pokemon {

  &-wrapper {
    @apply flex items-center w-full gap-2 p-3 bg-white rounded-lg h-fit;
  }

  &-types {
    @apply flex items-center text-xs gap-x-1;

    &-circle {
      @apply w-4 h-4 border rounded-full border-black/20;
    }

    &-circle-option {
      @apply w-3.5 h-3.5 ml-[-4px] rounded-full border border-black/20;
    }

    &-icons {
      @apply pt-0.5 text-xs text-stone-600;
    }

    &-color {
      @apply flex items-center mt-1;
    }
  }
}

.arrow-wrapper {
  @apply bg-stone-700 text-white w-9 h-9;
  @apply flex justify-center items-center rounded-lg text-xs text-center
}

.arrow-dashed {
  @apply border-dashed border-stone-600 bg-zinc-50 border text-white w-9 h-9;
  @apply flex justify-center items-center rounded-lg text-xs text-center
}
</style>
