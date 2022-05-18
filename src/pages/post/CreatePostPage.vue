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

            <div class="mb-3 mt-3">
                <label>
                    <input v-model="published" type="checkbox"/>
                    Опубликовать пост
                </label>
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
                   @remove="removeImg"

        />
    </section>
</template>

<script>
import LoadImage from "@/components/LoadImage";
import api from "@/api";
import router from "@/router/indexRouter";

export default {
    name: "CreatePostPage",
    components: {LoadImage},
    data(){
        return {
            title: '',
            post: '',
            images: [],
            published: true,
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
            const data = {
                title: this.title,
                content: this.post,
                images: this.images,
                published: this.published
            };
            api.post('/post/create', data)
                .then(function (response) {
                    router.push('/user/my-posts');
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        loadImage(file){
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = function() {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
            });
        },
        removeImg(img){
            const index = this.images.indexOf(img);
            this.images.splice(index, 1);
        }
    }
}
</script>

<style scoped>

</style>