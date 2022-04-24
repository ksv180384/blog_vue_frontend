<template>
    <div class="load-img">
        <div class="load-img-remove">
            <i class="fas fa-remove"></i>
        </div>
        <img :src="image.src" />
    </div>
</template>

<script>
export default {
    name: "LoadImage",
    props: ['image'],
}
</script>

<style scoped>

</style>