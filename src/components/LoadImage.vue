<template>
    <div class="load-img">
        <div class="load-img-remove" @click="remove">
            <i class="fas fa-remove"></i>
        </div>
        <img :src="image.src" />
    </div>
</template>

<script>
export default {
    name: "LoadImage",
    props: ['image'],
    methods: {
        remove(){
            this.$emit('remove', this.image);
        },
    },
}
</script>

<style scoped>

</style>