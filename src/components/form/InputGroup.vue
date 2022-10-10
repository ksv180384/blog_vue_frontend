<template>
    <div class="form-input-group-container" :class="{ error: error_message }">
        <label v-if="label" :for="id">{{ label }}</label>

        <div class="input-container" :class="{ 'input-container-text': left_text || right_text }">
            <input v-model.trim="model"
                   :id="id"
                   :type="type"
                   :disabled="disabled"
                   :placeholder="placeholder"
                   :class="{ 'rounded-left-no': left_text, 'rounded-right-no': right_text }"
            />
            <span v-if="left_text" class="left-text">{{ left_text }}</span>
            <span v-if="right_text" class="right-text">{{ right_text }}</span>
        </div>
        <small class="error-message" v-if="error_message">
            {{ error_message }}
        </small>
    </div>
</template>

<script>

export default {
    name: "InputGroup",
    props: {
        id: {
            type: String,
            default: '',
        },
        modelValue: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text'
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
        left_text: {
            type: String,
            default: '',
        },
        right_text: {
            type: String,
            default: '',
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
}
</script>

<style scoped>
.form-input-group-container{
    @apply flex flex-col mb-3
}

.form-input-group-container>label{
    @apply text-sm font-semibold
}

.form-input-group-container.error>label{
    @apply text-red-600
}

.form-input-group-container.error input{
    @apply border-red-600
}

.form-input-group-container.error .left-text,
.form-input-group-container.error .right-text{
    @apply border-red-600
}

.form-input-group-container small.error{
    @apply hidden
}

.input-container-text{
    @apply mt-1 flex rounded-md shadow-sm
}

.left-text{
    @apply
        inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3
        text-sm text-gray-500;
    order: -1;
}

.right-text{
    @apply
        inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50
        px-3 text-sm text-gray-500;
}

.form-input-group-container input:focus ~ span{
    @apply border-blue-300 !important
}

.rounded-left-no{
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}

.rounded-right-no{
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

input[type="text"],
input[type="password"]{
    @apply block flex-1 border border-gray-300 rounded p-2 w-full focus:border-blue-300 outline-none
}

.error-message{
    @apply block text-red-600
}
</style>