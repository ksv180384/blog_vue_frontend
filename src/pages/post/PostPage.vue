<template>
    <PostItem v-if="post" :post="post"/>

    <div v-if="comments">
        <PostCommentItem v-for="comment in comments" :comment="comment" :key="comment.id"/>
    </div>
</template>

<script>

import {mapGetters, mapMutations} from 'vuex';

import PostItem from '@/components/PostItem';
import PostCommentItem from '@/components/PostCommentItem';
import { getPost } from '@/servises/post_servise';

export default {
    components: { PostCommentItem, PostItem },
    data(){
        return {}
    },
    computed: {
        ...mapGetters('storePostPage', ['post', 'comments']),
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
    },
    mounted() {
        this.loadPost();
    }
}
</script>