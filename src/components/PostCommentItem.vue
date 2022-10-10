<template>
    <div class="post-comment-item">
        <div class="post-comment-info">

            <PostCommentRating :comment="comment_item"/>

            <div class="post-comment-author">
                <img :src="comment_item.author.avatar" alt="Автор">
                <a href="#" class="link">{{ comment_item.author.name }}</a>
            </div>
            <div class="post-comment-date">{{ comment_item.created_at_humans }}</div>
        </div>
        <div>
            {{ comment_item.comment }}
        </div>

        <div class="comment-control">
            <div>
                <div v-if="comment_item.children_count > 0" @click="openBranch" class="btn-open-reply">
                    <i v-if="!open_branch && !load_branch" class="fa fa-plus-square"></i>
                    <i v-else-if="load_branch" class="fa fa-spinner fa-pulse"></i>
                    <i v-else class="fa fa-minus-square"></i>
                    <span v-if="!open_branch">раскрыть ветку</span>
                    <span v-else>закрыть ветку</span>
                </div>
            </div>

            <div class="text-right">
                <div @click="reply" v-if="auth && !show_reply" class="btn-reply">Ответить</div>
            </div>
        </div>

        <PostCommentCreate v-if="auth && show_reply"
                           :branch_id="comment.id"
                           :parent_id="comment.id"
                           :post_id="comment.post_id"
                           @updateParentShowReply="onUpdateShowReply"
                           @updateChildrenComments="onUpdateChildrenComments"
        />

        <div v-if="open_branch && this.children_comments.length" class="comment-children-container">
            <TreeItems v-for="children_comment in children_comments"
                       :item="children_comment"
                       :key="children_comment.id"
                       @updateChildrenComments="onUpdateChildrenComments"
            />
        </div>

    </div>
</template>

<script>

import { mapGetters } from 'vuex';

import PostCommentCreate from "@/components/PostCommentCreate";
import PostCommentRating from "@/components/PostCommentRating";
import TreeItems from "@/components/TreeItems";
import { getCommentsBranch } from "@/services/post_service";

export default {
    components: {PostCommentRating, PostCommentCreate, TreeItems},
    props: {
        comment: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            comment_item: this.comment,
            show_reply: false,
            children_comments: [],
            open_branch: false,
            load_branch: false,
        }
    },
    computed: {
        ...mapGetters(['auth'])
    },
    methods: {
        reply(){
            this.show_reply = !this.show_reply;
        },
        onUpdateShowReply(){
            this.reply();
        },
        async openBranch(){

            this.open_branch = !this.open_branch;

            if(!this.open_branch){
                this.children_comments = [];
                return true;
            }

            this.load_branch = true;

            try {
                const resGetCommentsBranch = await getCommentsBranch(this.comment_item.id);
                this.children_comments = resGetCommentsBranch?.comments[0]?.children;
                this.load_branch = false;
            } catch (e) {
                this.load_branch = false;
                console.log(e);
            }
        },
        onUpdateChildrenComments(comments){
            this.children_comments = comments;
            this.comment_item.children_count = this.children_comments.length;
            this.open_branch = true;
        },
    }
}
</script>

<style scoped>

</style>