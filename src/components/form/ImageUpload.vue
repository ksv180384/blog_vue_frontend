<template>
    <div class="form-image-upload-group-container">
        <label v-if="label">{{ label }}</label>
        <div class="drug-and-drop-container">
            <template v-if="!file_name">
                <div class="space-y-1 text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="drug-and-drop-content">
                        <label :for="id" class="image-upload-container">
                            <span>Откройте картинку</span>
                            <input :id="id"
                                   @change="handleChange"
                                   type="file"
                                   :accept="available_extensions"
                            />
                        </label>
                        <p class="pl-1">или перетащите</p>
                    </div>
                    <p v-if="description" class="text-xs text-gray-500">{{ description }}</p>
                    <small class="error-message" v-if="error">
                        {{ error }}
                    </small>
                </div>
            </template>

            <template v-else>
                <div class="drug-and-drop-content">
                    <img v-if="file_data" :src="file_data" :alt="file_name">
                    <div v-else class="img-spinner">
                        <i class="fa fa-spinner fa-pulse fa-fw"></i>
                    </div>
                    <label class="image-upload-container-info">
                        <span>{{ file_name }}</span> размер {{ file_size }} Мб

                        <small class="error-message" v-if="error_message">
                            {{ error_message }}
                        </small>
                    </label>
                    <div @click="removeImg" class="remove-img">
                        <div class="remove-img-info">
                            <span><i class="fas fa-times"></i></span>
                        </div>
                    </div>
                </div>
            </template>

        </div>
    </div>
</template>

<script>
export default {
    name: "ImageUpload",
    props: {
        id: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        max_size: {
            type: Number,
            default: 5,
        },
        accept:{
            type: Array,
            default: ['gif', 'jpg', 'jpeg', 'png'],
        },
        error_message: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            file_name: '',
            file_data: '',
            file_size: '',
            available_extensions: this.getAccept(),
            error: this.error_message
        }
    },
    methods: {
        handleChange(event) {

            const file = event?.target?.files[0];

            if(!this.validate(file)){
                return true;
            }

            this.file_name = file.name;
            this.file_size = (file.size/1024/1024).toFixed(2);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.file_data = reader.result;
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
            this.$emit('update:modelValue', event.target.files[0]);
        },
        removeImg(e){
            this.file_name = '';
            this.file_size = '';
            this.file_data = '';
            this.error = '';
            this.$emit('update:modelValue', '');
        },
        getAccept(){
            let resAccept = '';
            this.accept.forEach(item => {
                resAccept += `image/${item}, `;
            });
            return resAccept.slice(0, -2);
        },
        validate(file){
            if(!file){
                this.error = `Файл не задан.`;
                return false;
            }

            if(this.accept.indexOf( file.type.split('/')[1] ) === -1){
                this.error = 'Доступные расширения файлов ' + this.accept.join(', ');
                return false;
            }

            const fileSize = (file.size / 1024 / 1024).toFixed(2);
            if(this.max_size < fileSize){
                this.error = `Максимальный размер фвйла ${this.max_size} Мб (размер файла ${fileSize} Мб)`;
                return false;
            }

            return true;
        }
    },
}
</script>

<style scoped>
.form-image-upload-group-container{

}

.form-image-upload-group-container>label{
    @apply block text-sm font-medium text-gray-700
}

.drug-and-drop-container{
    @apply
        relative mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300
        px-6 pt-5 pb-6 overflow-hidden;
}

.drug-and-drop-content{
    @apply space-y-1 text-center;
}

.drug-and-drop-content img{
    @apply mx-auto rounded object-cover;
    width: 96px;
    height: 96px;
}

.image-upload-container{
    @apply
        cursor-pointer rounded-md bg-white font-medium text-blue-500
        focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-300
        focus-within:ring-offset-2 hover:text-blue-300;
}

.image-upload-container-info{
    @apply block mt-1;
}

.image-upload-container-info>span{
    @apply font-medium text-blue-500
}

.form-image-upload-group-container input[type="file"]{
    @apply absolute block w-full h-full top-0 left-0 opacity-0 cursor-pointer;
}

.remove-img{
    @apply
        absolute top-1 right-2 cursor-pointer z-10;
}

.remove-img .remove-img-info{
    @apply text-gray-50;
}

.remove-img .remove-img-info > span{
    @apply block text-2xl w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center;
}

.img-spinner{
    @apply mx-auto rounded text-blue-500 text-xl flex items-center justify-center;
    width: 96px;
    height: 96px;
}

.error-message{
    @apply block text-red-600
}
</style>