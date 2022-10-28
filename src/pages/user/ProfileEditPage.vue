<template>
    <div class="profile-edit-container">
        <form @submit.prevent="submitUserData">
            <div class="flex justify-between items-center pt-4 sm:p-6 sm:pb-0">
                <img v-if="avatar"
                     :src="avatar"
                     :alt="name"
                     class="rounded mx-auto w-32 h-32 shadow-lg mr-3 object-cover"
                />
                <div v-else class="rounded mx-auto w-32 h-32 shadow-lg mr-3"></div>

                <div class="grow">
                    <InputGroup :model-value="email"
                                id="inputEmail"
                                left_text="Email"
                                placeholder="Введите email"
                                :disabled="true"
                    />

                    <InputGroup v-model.trim="name"
                                id="inputName"
                                left_text="Имя"
                                placeholder="Введите ваше имя"
                                :error_message="error_message.name"
                                :class="{ error: error_message.name }"
                                :disabled="submit_load"
                    />
                </div>
            </div>
            <div class="space-y-6 sm:p-6">

                <TextareaGroup v-model="about"
                               id="about"
                               label="О себе"
                               placeholder="Напишите информацию о себе"
                               :disabled="submit_load"
                />

                <ImageUpload v-model="avatar_file"
                             ref="profile_image_upload"
                             id="uploadAvatar"
                             label="Загрузить фотографию"
                             :max_size=10
                             description="PNG, JPG, GIF максимальный размер 10Мб"
                             :error_message="error_message.avatar_file"
                />

            </div>
            <div class="bg-gray-50 py-3 text-right sm:px-6">
                <ButtonForm type="submit" :load="submit_load">Сохранить</ButtonForm>
            </div>
        </form>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { profileUpdate } from "@/services/user_service";
import { getResponseErrorFieldsMessage, getValidateErrorMessage, setMetaTags } from "@/helpers";

import InputGroup from '@/components/form/InputGroup';
import TextareaGroup from "@/components/form/TextareaGroup";
import ImageUpload from "@/components/form/ImageUpload";
import ButtonForm from "@/components/form/ButtonForm";
import store from "@/store/indexStore";


export default {
    name: "ProfileEdit",
    setup(){
        return { v$: useVuelidate() }
    },
    async beforeRouteEnter(to, from, next) {
        await store.dispatch('storeProfileEditPage/loaDataPage');
        setMetaTags(`Редактирование профиля - блог`, { description: `Редактирование профиля - блог` });
        next();
    },
    data(){
        return {
            email: store.getters["storeProfileEditPage/email"],
            name: store.getters["storeProfileEditPage/name"],
            avatar: store.getters["storeProfileEditPage/avatar"],
            about: store.getters["storeProfileEditPage/about"],
            avatar_file: '',
            error_message: {},
            submit_load: false,
        }
    },
    validations(){
        return {
            name: {
                required: helpers.withMessage(() => `Введите ваше имя.`, required),
            },
        }
    },
    methods: {
        ...mapMutations('storeProfileEditPage', ['setName', 'setAvatar', 'setAbout']),
        async submitUserData(){
            if(this.v$.$invalid){
                this.v$.$touch();

                this.error_message = getValidateErrorMessage(this.v$);
                return true;
            }

            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('name', this.name);
            formData.append('about', this.about);
            formData.append('avatar_file', this.avatar_file);

            this.error_message = '';
            this.submit_load = true;
            try{
                const resProfileUpdate = await profileUpdate(formData);
                const user = resProfileUpdate.user;
                localStorage.setItem('user', JSON.stringify(user));
                this.setName(user.name);
                this.setAvatar(user.avatar);
                this.setAbout(user.about);
                this.avatar = user.avatar;
                this.avatar_file = '';
                this.submit_load = false;
                this.$refs.profile_image_upload.removeImg();
            } catch (e) {
                this.submit_load = false;
                this.error_message = getResponseErrorFieldsMessage(e);
                console.log(this.error_message);
            }
        }
    },
    components: { ButtonForm, ImageUpload, TextareaGroup, InputGroup: InputGroup },
}
</script>

<style scoped>
.profile-edit-container{
    @apply shadow-lg bg-white relative mt-4 rounded ml-14 md:ml-0
}
</style>