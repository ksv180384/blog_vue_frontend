<template>
    <div class="post-comment-rating">
        <i @click="up" class="fas fa-sort-up"></i>
        {{ comment_item.rating }}
        <i @click="down" class="fas fa-sort-down"></i>
    </div>
</template>

<script>
import { commentPostUp, commentPostDown } from '@/servises/post_servise';

export default {
    name: "PostCommentRating",
    props: {
        comment: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            comment_item: this.comment,
        }
    },
    methods: {
        async up(){
            if(!this.$store.state.auth){
                return true;
            }

            try {
                const resCommentPostUp = await commentPostUp(this.comment_item.id);
                this.comment_item.rating = resCommentPostUp.rating;
                this.comment_item.up_count = resCommentPostUp.up_count;
                this.comment_item.down_count = resCommentPostUp.down_count;
                this.comment_item.use_rating = resCommentPostUp.use_rating;
            }catch (e) {
                console.log(e);
            }
        },
        async down(){
            if(!this.$store.state.auth){
                return true;
            }

            try {
                const resCommentPostUp = await commentPostDown(this.comment_item.id);
                this.comment_item.rating = resCommentPostUp.rating;
                this.comment_item.up_count = resCommentPostUp.up_count;
                this.comment_item.down_count = resCommentPostUp.down_count;
                this.comment_item.use_rating = resCommentPostUp.use_rating;
            }catch (e) {
                console.log(e);
            }
        },
    }
}
</script>

<style scoped>

</style>