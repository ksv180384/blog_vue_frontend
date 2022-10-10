<template>
    <div class="profile-edit-container">
        <form @submit.prevent="submitUserData">
            <div class="flex justify-between items-center pt-4 sm:p-6 sm:pb-0">
                <img v-if="avatar" :src="avatar"
                     :alt="name"
                     class="rounded mx-auto w-32 h-32 shadow-lg mr-3 object-cover">
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
                             description="PNG, JPG, GIF максимальный размер 10Мб"
                />

            </div>
            <div class="bg-gray-50 py-3 text-right sm:px-6">
                <ButtonForm type="submit" :load="submit_load">Сохранить</ButtonForm>
            </div>
        </form>
    </div>
</template>

<script>
import InputGroup from '@/components/form/InputGroup';
import TextareaGroup from "@/components/form/TextareaGroup";
import { profileEdit, profileUpdate } from "@/services/user_service";
import ImageUpload from "@/components/form/ImageUpload";
import ButtonForm from "@/components/form/ButtonForm";
import { mapMutations } from "vuex";

export default {
    name: "ProfileEdit",
    data(){
        return {
            email: '',
            name: '',
            avatar: '',
            about: '',
            avatar_file: '',
            submit_load: false,
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        ...mapMutations(['setUser']),
        async loadData(){
            try {
                const resProfileEdit = await profileEdit();
                const user = resProfileEdit.user;
                this.email = user.email;
                this.name = user.name;
                this.about = user.about;
                this.avatar = user.avatar;
            } catch (e) {
                console.log(e);
            }
        },
        async submitUserData(){
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('name', this.name);
            formData.append('about', this.about);
            formData.append('avatar', this.avatar_file);

            this.submit_load = true;
            try{
                const resProfileUpdate = await profileUpdate(formData);
                const user = resProfileUpdate.user;
                this.setUser(user);
                this.name = user.name;
                this.avatar = user.avatar;
                this.about = user.about;
                this.avatar_file = '';
                this.submit_load = false;
                this.$refs.profile_image_upload.removeImg();
            } catch (e) {
                this.submit_load = false;
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