<template>
    <div>
        <div class="text-right">
            <button @click="showReply" class="btn-min-close">
                <i class="fa fa-times"></i>
            </button>
        </div>
        <form @submit.prevent="sendComment">
            <div>
                <textarea ref="textareaPostComment" rows="5" v-model="comment"></textarea>
            </div>
            <div>
                <button class="btn btn-primary"
                        type="submit"
                        :disabled="load"
                >Отправить</button>
            </div>
        </form>
    </div>
</template>

<script>

import { createPostComment } from "@/servises/post_servise";

export default {
    name: "PostCommentCreate",
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
        }
    },
    methods: {
        async sendComment(){

            this.load = true;

            const commentData = {
                post_id: this.post_id,
                parent_id: this.parent_id,
                branch_id: this.branch_id,
                comment: this.comment,
            };

            try {
                const resCreatePostComment = await createPostComment(commentData);
                this.$emit('updateChildrenComments', resCreatePostComment?.comments[0]?.children);
                this.showReply();
                this.load = false;
            } catch (e) {
                this.load = false;
                console.log(e);
            }
        },
        showReply(){
            this.$emit('updateParentShowReply');
        }
    },
    created() {
        this.$nextTick(() => {
            const textareaPostComment = this.$refs.textareaPostComment;
            textareaPostComment.focus();
        })
    }
}
</script>

<style scoped>

</style>