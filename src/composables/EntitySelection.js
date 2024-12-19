import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export function useEntitySelect(forAdmin) {
    
    const currentEntity = ref('product');

    const store = useStore();
    store.dispatch('setSelectedEntity', { forAdmin, entityName: currentEntity.value })
    
    watch(currentEntity, () => {
        store.dispatch('setSelectedEntity', { forAdmin, entityName: currentEntity.value });
    })
    
    const selectedEntity = computed(() => store.getters.getSelectedEntity(forAdmin));
    const selectedEntityCaps = computed(() => store.getters.getSelectedEntityCaps(forAdmin));

    return {
        currentEntity,
        selectedEntity, 
        selectedEntityCaps
    }
}