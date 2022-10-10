<template>
    <template v-if="post">
        <PostItem :post="post"/>

        <div v-if="auth" class="reply-container">
            <ButtonForm v-if="!show_reply"
                        @click="toggleShowReply"
                        :w_full="true"
            >
                Ответить
            </ButtonForm>
            <PostCommentCreate v-else
                               :post_id="post.id"
                               @updateParentShowReply="toggleShowReply"
                               @updateChildrenComments="updateComments"

            />
        </div>
    </template>

    <div v-if="comments">
        <PostCommentItem v-for="comment in comments" :comment="comment" :key="comment.id"/>
    </div>
</template>

<script>

import {mapGetters, mapMutations} from 'vuex';

import PostItem from '@/components/PostItem';
import PostCommentItem from '@/components/PostCommentItem';
import PostCommentCreate from '@/components/PostCommentCreate';
import ButtonForm from "@/components/form/ButtonForm";
import { getPost } from '@/services/post_service';

export default {
    data(){
        return {
            show_reply: false,
        }
    },
    computed: {
        ...mapGetters('storePostPage', ['post', 'comments']),
        ...mapGetters(['auth'])
    },
    methods: {
        ...mapMutations('storePostPage', ['setPost', 'setPostComments']),
        async loadPost(){
            try {
                const resGetPost = await getPost(this.$route.params.id);
                this.setPost(resGetPost.post);
                this.setPostComments(resGetPost.comments);
            } catch (e) {
                console.log(e);
            }
        },
        updateComments(comments){
            this.setPostComments(comments);
        },
        toggleShowReply(){
            this.show_reply = !this.show_reply;
        }
    },
    mounted() {
        this.loadPost();
    },
    components: {ButtonForm, PostCommentItem, PostItem, PostCommentCreate },
}
</script>

<style scoped>
.reply-container{
    @apply relative mb-3 bg-white rounded p-2;
}

.reply-container .btn-form{
    @apply block;
}
</style>