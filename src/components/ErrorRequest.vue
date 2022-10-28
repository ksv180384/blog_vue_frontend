<template>
    <div v-if="error" class="error-container">
        <div>{{ error }}</div>
        <div @click="close" class="close">
            <i class="fa fa-times"></i>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
    name: "ErrorRequest",
    computed: {
        ...mapGetters(['error']),
    },
    methods: {
        ...mapMutations(['setError']),
        close(){
            this.setError('');
        }
    }
}
</script>

<style scoped>
.error-container{
    @apply fixed w-full p-6 bg-red-400 text-red-100 z-10 text-center text-3xl;
}
.close{
    @apply
        absolute flex h-full top-0 right-0 w-20 justify-center items-center
        cursor-pointer hover:text-white;
}
</style>