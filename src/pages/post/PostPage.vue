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

import { mapGetters, mapMutations } from 'vuex';
import { setMetaTags } from '@/helpers';
import store from "@/store/indexStore";

import PostItem from '@/components/PostItem';
import PostCommentItem from '@/components/PostCommentItem';
import PostCommentCreate from '@/components/PostCommentCreate';
import ButtonForm from "@/components/form/ButtonForm";

export default {
    async beforeRouteEnter(to, from, next) {
        const resStorePostPage = await store.dispatch('storePostPage/loadPost', to.params.id);
        setMetaTags(`${resStorePostPage.post.title} - блог`, { description: `${resStorePostPage.post.title} - блог` });
        next();
    },
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
        updateComments(comments){
            this.setPostComments(comments);
        },
        toggleShowReply(){
            this.show_reply = !this.show_reply;
        }
    },
    unmounted() {
        this.setPost(null);
        this.setPostComments(null);
    },
    components: { ButtonForm, PostCommentItem, PostItem, PostCommentCreate },
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