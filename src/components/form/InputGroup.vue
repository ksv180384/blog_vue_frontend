<template>
    <div class="form-group" :class="{ error: error_message }">
        <label :for="id"><slot></slot></label>
        <input v-model.trim="model"
               :id="id"
               :type="type"
               :disabled="disabled"
               :placeholder="placeholder"

        />
        <small class="error" v-if="error_message">
            {{ error_message }}
        </small>
    </div>
</template>

<script>
//import { makeid } from "@/helpers";

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
        value: {
            type: String,
            default: ''
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
    }
}
</script>

<style scoped>

</style>