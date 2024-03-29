<template>
    <section class="page-content">
        <h1 class="mb-5">Добавить новы пост</h1>

        <form @submit.prevent="addPost">
            <div class="mb-3">
                <InputGroup v-model.trim="title"
                            @change="handleChange(e, 'title')"
                            id="inputTitle"
                            placeholder="Введите название поста"
                            :disabled="is_disabled"
                            :class="{ error: error_message.title }"
                            :error_message="error_message.title"
                />
            </div>
            <div>
                <TextareaGroup v-model="post"
                               @change="handleChange(e, 'post')"
                               id="textareaPost"
                               placeholder="Содержимое поста"
                               :rows=10
                               :disabled="is_disabled"
                               :class="{ error: error_message.post }"
                               :error_message="error_message.post"
                />
            </div>

            <div class="mb-3 mt-3">
                <Checkbox v-model="published" id="checkboxPublished">Опубликовать пост</Checkbox>
            </div>

            <div class="flex justify-between items-center mt-2 text-right">
                <div class="text-red-500">
                    <span v-if="error_message.images">{{ error_message.images }}</span>
                </div>
                <div>
                    <button @click="openLoadImg"
                            type="button"
                            class="btn btn-primary p-2 mr-2"
                    >
                        <i class="fas fa-image"></i>
                        <input @change="addImage" ref="loadInput" type="file" hidden/>
                    </button>
                    <ButtonForm type="submit" :load="is_disabled">Добавить</ButtonForm>
                </div>
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

import useVuelidate from '@vuelidate/core';
import { helpers, required, minLength } from "@vuelidate/validators";
import {getValidateErrorMessage, setMetaTags} from "@/helpers";
import { createPost } from "@/services/post_service";

import router from "@/router/indexRouter";
import ButtonForm from "@/components/form/ButtonForm";
import LoadImage from "@/components/LoadImage";
import Checkbox from "@/components/form/Checkbox";
import InputGroup from "@/components/form/InputGroup";
import TextareaGroup from "@/components/form/TextareaGroup";

export default {
    name: "CreatePostPage",
    setup(){
        return { v$: useVuelidate() }
    },
    async beforeRouteEnter(to, from, next) {
        setMetaTags(`Добавить новы пост - блог`, { description: `Добавить новы пост - блог` });
        next();
    },
    data(){
        return {
            title: '',
            post: '',
            images_form: [],
            images: [],
            published: true,
            is_disabled: false,
            error_message: {},
        }
    },
    validations() {
        return {
            title: {
                required: helpers.withMessage(() => `Введите название поста.`, required),
                minLength: helpers.withMessage(() => `Название поста доложно быть не короче 3 символов.`, minLength(3)),
            },
            post: {
                required: helpers.withMessage(() => `Введите текст поста.`, required),
                minLength: helpers.withMessage(() => `Текст поста должен быть не короче 10 символов.`, minLength(10)),
            },
        }
    },
    methods: {
        openLoadImg(){
            this.$refs.loadInput.click();
        },
        async addImage(e){
            this.error_message.images = '';
            const file = e.target.files[0];
            if(!this.validateFile(file)){
                return false;
            }
            const imageBase64 = await this.loadImage(file);
            this.images.push({ src: imageBase64 });
            this.images_form.push(file);
        },
        async addPost(){
            this.error_message = {};
            if(this.v$.$invalid){
                this.v$.$touch();
                this.error_message = getValidateErrorMessage(this.v$);
                return true;
            }

            const formData = new FormData();
            formData.append('title', this.title);
            formData.append('content', this.post);
            formData.append('published', this.published);
            for (let k in this.images_form){
                formData.append('images[]', this.images_form[k]);
            }
            this.is_disabled = true;
            try {
                const resCreatePost = await createPost(formData);
                this.is_disabled = false;
                router.push('/user/my-posts');
            }catch (e){
                console.log(e);
                this.is_disabled = false;
            }
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
        },
        handleChange(e, field){
            this.v$[field].$touch();
            this.error_message = getValidateErrorMessage(this.v$);
        },
        validateFile(file){
            const extValid = ['jpg', 'jpeg', 'png'];
            const fileSize = (file.size/1024/1024).toFixed(2);
            if(fileSize > 10){
                this.error_message.images = `Максимальный размер картинки 10 мб`;
                return false;
            }
            const ext = file.name.split('.').pop();
            if(extValid.indexOf(ext) === -1){
                this.error_message.images = `Доступные форматы картинок ${extValid.join(', ')}`;
                return false;
            }
            return true;
        }
    },
    components: { Checkbox, ButtonForm, LoadImage, InputGroup, TextareaGroup },
}
</script>

<style scoped>

</style>