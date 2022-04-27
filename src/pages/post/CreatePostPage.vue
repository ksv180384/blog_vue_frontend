<template>
    <section class="page-content">
        <h1 class="mb-5">Добавить новы пост</h1>

        <form @submit.prevent="addPost">
            <div class="mb-3">
                <input type="text" v-model="title" placeholder="Название поста"/>
            </div>
            <div>
                <textarea rows="10" v-model="post" placeholder="Содержимое поста"></textarea>
            </div>

            <div class="mt-2 text-right">
                <button @click="openLoadImg"
                        type="button"
                        class="btn btn-primary p-2 mr-2"
                >
                    <i class="fas fa-image"></i>
                    <input @change="addImage" ref="loadInput" type="file" hidden/>
                </button>
                <button class="btn btn-primary"
                        type="submit"
                >Добавить</button>
            </div>
        </form>
        <LoadImage v-for="(image, index) in images"
                   :image="image"
                   :key="index"
        />
    </section>
</template>

<script>
import LoadImage from "@/components/LoadImage";
import api from "@/api";
export default {
    name: "CreatePostPage",
    components: {LoadImage},
    data(){
        return {
            title: '',
            post: '',
            images: [],
        }
    },
    methods: {
        openLoadImg(){
            this.$refs.loadInput.click();
        },
        async addImage(){
            const file = this.$refs.loadInput.files[0];
            const imageBase64 = await this.loadImage(file);
            this.images.push({ src: imageBase64 });
        },
        addPost(){
            //console.log(this.post);
            api.post('/post/create', { title: this.title, content: this.post, images: this.images });
        },
        loadImage(file){
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = function() {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
            });
        }
    }
}
</script>

<style scoped>

</style>