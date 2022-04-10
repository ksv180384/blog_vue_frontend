<template>
    <section class="page-content">
        <h1 class="mb-5">Добавить новы пост</h1>

        <form @submit.prevent="addPost">
            <div>
                <textarea rows="10" v-model="post"></textarea>
            </div>

            <div class="mt-2 text-right">
                <button class="btn btn-primary"
                        type="submit"
                >Добавить</button>
            </div>
        </form>
    </section>
</template>

<script>
export default {
    name: "CreatePostPage",
    data(){
        return {
            post: '',
        }
    },
    methods: {
        addPost(){
            console.log(this.post);
        }
    }
}
</script>

<style scoped>

</style>