<template>
    <div v-if="top > 300" @click="scrollUp" class="scroll-up">
        <i class="fas fa-chevron-up"></i>
    </div>
</template>

<script>
export default {
    name: "ScrollUp",
    data() {
        return {
            top: window.scrollY,
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },
    methods: {
        onScroll(e) {
            this.top = window.scrollY;
        },
        scrollUp(){
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            });
        }
    },
    unmounted() {
        window.removeEventListener('scroll', this.onScroll);
    }
}
</script>

<style scoped>
.scroll-up{
    @apply
        rounded-full w-14 h-14 bg-white text-blue-400 hover:text-blue-500 shadow-2xl border border-blue-300
        fixed left-1/2 bottom-4 flex justify-center items-center cursor-pointer z-10;
    margin-left: 190px;
}
</style>