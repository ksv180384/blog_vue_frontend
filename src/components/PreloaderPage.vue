<template>
    <div class="preloader-page"></div>
</template>

<script>
export default {
    name: "PreloaderPage"
}
</script>

<style scoped>
.preloader-page{
    @apply h-1 fixed w-full;
    background: rgb(99,102,241);
    background: linear-gradient(90deg, rgba(99,102,241,1) 0%, rgba(168,85,247,1) 20%, rgba(236,72,153,1) 40%, rgba(234,179,8,1) 70%, rgba(132,204,22,1) 100%);
    background-size: 400%;
    -webkit-animation: preloaderPage 3s ease infinite;
    -moz-animation: preloaderPage 3s ease infinite;
    animation: preloaderPage 3s ease infinite;
}

@keyframes preloaderPage {
    0%,
    100% {
        background-position: 0 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}
</style>