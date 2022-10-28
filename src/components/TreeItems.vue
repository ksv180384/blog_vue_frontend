<template>
    <div class="comment-children">
        <div class="comment-children-content">
            <div @click="toggleOpen" v-if="item.children.length" class="comment-children-toggle-open">
                <i v-if="!open" class="fa fa-plus"></i>
                <i v-else class="fa fa-minus"></i>
            </div>

            <div>
                <div class="post-comment-info">

                    <PostCommentRating :id="item.id"
                                       :rating="item.rating"
                                       :use_rating="item.use_rating"
                    />

                    <div class="post-comment-author">
                        <img :src="item.author.avatar" alt="Автор">
                        <a href="#" class="link">{{ item.author.name }}</a>
                    </div>
                    <div class="post-comment-date">{{ item.created_at_humans }}</div>
                </div>

                <div class="comment-container">
                    {{ item.comment }}
                </div>
            </div>

            <div class="message-control-container">
                <div @click="reply" v-if="auth && !show_reply" class="btn-reply">Ответить</div>
            </div>

            <PostCommentCreate v-if="auth && show_reply"
                               :branch_id="item.branch_id"
                               :parent_id="item.id"
                               :post_id="item.post_id"
                               @updateParentShowReply="onUpdateShowReply"
                               @updateChildrenComments="onUpdateChildrenComments"
            />

        </div>
        <div class="mt-3" v-if="item.children.length && open">
            <TreeItems v-for="ch in item.children"
                       :item="ch"
                       :key="ch.id"
                       @updateChildrenComments="onUpdateChildrenComments"
            />
        </div>
    </div>
</template>

<script>

import { mapGetters } from "vuex";

import PostCommentCreate from "@/components/PostCommentCreate";
import PostCommentRating from "@/components/PostCommentRating";

export default {
    components: {PostCommentCreate, PostCommentRating},
    name: "TreeItems",
    props: {
        item: {
            type: Object,
        }
    },
    data(){
        return {
            open: true,
            show_reply: false,
        }
    },
    computed: {
        ...mapGetters(['auth'])
    },
    methods: {
        toggleOpen() {
            this.open = !this.open;
        },
        reply(){
            this.show_reply = !this.show_reply;
        },
        onUpdateShowReply(){
            this.reply();
        },
        onUpdateUpCount(parentId){
            this.$emit('updateOneUpCount', parentId);
        },
        onUpdateChildrenComments(comments){
            this.$emit('updateChildrenComments', comments);
        },
    },
}
</script>