<template>
    <div class="form-textarea-group-container" :class="{ error: error_message }">
        <label v-if="label" :for="id">{{ label }}</label>

        <div class="textarea-group-container">
            <textarea v-model.trim="model"
                      :id="id"
                      :placeholder="placeholder"
                      :disabled="disabled"
                      :rows="rows"
            />
        </div>

        <small class="error-message" v-if="error_message">
            {{ error_message }}
        </small>
    </div>
</template>

<script>
export default {
    name: "TextareaGroup",
    props: {
        id: {
            type: String,
            default: '',
        },
        modelValue: {
            type: String,
            default: '',
        },
        placeholder: {
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
        rows: {
            type: Number,
            default: 6
        },
        error_message: {
            type: String,
            default: ''
        }
    },
    computed: {
        model: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit("update:modelValue", value);
            }
        }
    },
    methods: {
        focus(){
            document.getElementById(this.id).focus();
        }
    }
}
</script>

<style scoped>
.form-textarea-group-container{

}

.form-textarea-group-container.error{

}

.form-textarea-group-container label{
    @apply block text-sm font-medium text-gray-700
}

.form-textarea-group-container.error label{
    @apply text-red-600
}

.form-textarea-group-container textarea{
    @apply mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring-blue-300
}

.form-textarea-group-container.error textarea{
    @apply border-red-600
}

.textarea-group-container{

}

.error-message{
    @apply block text-red-600
}
</style>