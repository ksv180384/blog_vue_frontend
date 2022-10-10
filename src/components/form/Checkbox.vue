<template>
    <div class="form-check">
        <input :id="id"
               v-model="model"
               class="form-check-input"
               type="checkbox"
               :value="value"
        />
        <label class="form-check-label" :for="id">
            <slot></slot>
        </label>
    </div>
</template>

<script>

export default {
    name: "Checkbox",
    props: {
        id: {
            type: String,
            default: '',
        },
        modelValue: {
            type: Boolean,
            default: false,
        },
        value: {
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
    .form-check-input{
        @apply appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer relative
    }

    .form-check-input:checked:after{
        content: ' ';
        width: 8px;
        height: 8px;
        position: absolute;
        background-color: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 0.125rem;
        @apply absolute
    }

    .form-check-input:checked{
        border-radius: 0.25rem;
    }

    .form-check-label{
        @apply inline-block text-gray-800
    }
</style>