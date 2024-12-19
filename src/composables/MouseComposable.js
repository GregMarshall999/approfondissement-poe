import { onMounted, onUnmounted, ref } from "vue";

export function useMouse(domElement) {
    const x = ref(0);
    const y = ref(0);

    function update(event) {
        x.value = event.pageX;
        y.value = event.pageY;
    }

    onMounted(() => domElement.value.addEventListener('mousemove', update));
    onUnmounted(() => domElement.value.removeEventListener('mousemove', update));

    return { x, y };
}