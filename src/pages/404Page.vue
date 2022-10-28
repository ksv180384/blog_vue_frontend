<template>
    <div class="container-404">
        <div class="content-404">
            <h1>Ошибка 404</h1>
            <div class="section-info">
                <div v-if="message">
                    {{ message }}
                </div>
                <div>
                    Что-то пошло не так. <router-link to="/" class="link">Перейти на главную.</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "404",
    data(){
        return {
            message: '',
        }
    }
}
</script>

<style scoped>

h1{
    @apply text-4xl my-12
}

.container-404{
    @apply flex flex-col justify-center w-10/12 mx-auto;
    height: calc(100vh - 72px);

}

.content-404{
    @apply flex flex-col justify-around bg-white w-full shadow-2xl rounded text-center;
    height: calc(100% / 2);
}

.section-info{
    @apply my-12
}
</style>