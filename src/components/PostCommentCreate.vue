<template>
    <div>
        <div class="text-right">
            <button @click="showReply" class="btn-min-close">
                <i class="fa fa-times"></i>
            </button>
        </div>
        <form @submit.prevent="sendComment">
            <div>
                <TextareaGroup v-model="comment"
                               ref="textareaPostComment"
                               @change="handleChange(e, 'comment')"
                               id="textareaComment"
                               placeholder="Напишите текст комментария."
                               :rows=5
                               :disabled="load"
                               :class="{ error: error_message.comment }"
                               :error_message="error_message.comment"
                />
            </div>
            <div class="text-right mt-3">
                <ButtonForm type="submit" :load="load">Отправить</ButtonForm>
            </div>
        </form>
    </div>
</template>

<script>

import useVuelidate from '@vuelidate/core';
import {helpers, minLength, required} from "@vuelidate/validators";
import {getValidateErrorMessage} from "@/helpers";
import { createPostComment } from "@/services/post_service";
import ButtonForm from '@/components/form/ButtonForm';
import TextareaGroup from "@/components/form/TextareaGroup";

export default {
    name: "PostCommentCreate",
    setup(){
        return { v$: useVuelidate() }
    },
    props: {
        post_id: {
            type: Number,
            required: true,
        },
        parent_id: {
            type: Number,
        },
        branch_id: {
            type: Number,
        }
    },
    data(){
        return {
            comment: '',
            show_reply: false,
            load: false,
            error_message: {},
        }
    },
    validations() {
        return {
            comment: {
                required: helpers.withMessage(() => `Введите название поста.`, required),
                minLength: helpers.withMessage(() => `Комментарий поста должен быть не короче 2 символов.`, minLength(2)),
            },
        }
    },
    methods: {
        async sendComment(){
            this.error_message = {};
            if(this.v$.$invalid){
                this.v$.$touch();
                this.error_message = getValidateErrorMessage(this.v$);
                return true;
            }

            this.load = true;

            const commentData = {
                post_id: this.post_id,
                parent_id: this.parent_id,
                branch_id: this.branch_id,
                comment: this.comment,
            };

            try {
                const resCreatePostComment = await createPostComment(commentData);
                const comments = this.branch_id ? resCreatePostComment?.comments[0]?.children : resCreatePostComment?.comments;
                this.$emit('updateChildrenComments', comments);
                this.showReply();
                this.load = false;
            } catch (e) {
                this.load = false;
                this.error_message.comment = 'Ошибка попробуйте позже.';
                console.log(e);
            }
        },
        handleChange(e, field){
            this.v$[field].$touch();
            this.error_message = getValidateErrorMessage(this.v$);
        },
        showReply(){
            this.$emit('updateParentShowReply');
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.textareaPostComment.focus();
        })
    },
    components: {TextareaGroup, ButtonForm }
}
</script>

<style scoped>

</style>