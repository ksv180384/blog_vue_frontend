<template>
    <div class="content-right-card">
        <div class="right-card-header">Авторизация</div>
        <div class="w-5/6 mx-auto">
            <form action="#" @submit.prevent="submitLogin">

                <InputGroup v-model.trim="email"
                            @change="handleChange(e, 'email')"
                            id="inputEmail"
                            label="Email"
                            placeholder="Введите email"
                            :disabled="isDisabled"
                            :error_message="error_message.email"
                />

                <InputGroup v-model.trim="password"
                            @change="handleChange(e, 'password')"
                            id="inputPassword"
                            label="Пароль"
                            type="password"
                            placeholder="Введите пароль"
                            :disabled="isDisabled"
                            :error_message="error_message.password"
                />

                <Checkbox v-model="remember" id="checkboxRemember">Запомнить</Checkbox>

                <div class="text-center mt-6">
                    <ButtonForm type="submit" :load="isDisabled">Войти</ButtonForm>
                </div>
            </form>

            <div class="text-center my-3">
                <a href="#"
                   @click.prevent="registrationToggle"
                   class="link font-semibold uppercase"
                >
                    Регистрация
                </a>
            </div>
            <hr>
            <SocialLogin/>
        </div>
    </div>
</template>

<script>

import { mapMutations } from "vuex";
import useVuelidate from '@vuelidate/core';
import {email, helpers, required} from "@vuelidate/validators";

import SocialLogin from "@/components/SocialLogin";
import Checkbox from "@/components/form/Checkbox";
import InputGroup from "@/components/form/InputGroup";

import {getResponseErrorFieldsMessage, getValidateErrorMessage} from "@/helpers";
import { userLogin } from "@/services/user_service";
import ButtonForm from "@/components/form/ButtonForm";


export default {
    name: "LoginRightCard",
    setup(){
        return { v$: useVuelidate() }
    },
    data(){
        return {
            email: '',
            password: '',
            remember: false,
            isDisabled: false,
            error_message: {},
        }
    },
    validations() {
        return {
            email: {
                required: helpers.withMessage(() => `Введите Email.`, required),
                email: helpers.withMessage(() => `Неверный Email.`, email)
            },
            password: {
                required: helpers.withMessage(() => `Введите Пароль.`, required),
            },
        }
    },
    methods: {
        ...mapMutations(['setAuth', 'setUser', 'registrationToggle']),
        async submitLogin(){
            this.error_message = {};
            if(this.v$.$invalid){
                this.v$.$touch();
                this.error_message = getValidateErrorMessage(this.v$);
                return true;
            }
            this.isDisabled = true;
            const dataForm = { email: this.email, password: this.password };

            try {
                const resUserLogin = await userLogin(dataForm);
                const user = resUserLogin.user;
                const token = resUserLogin.token;
                this.isDisabled = false;

                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
                this.setAuth(true);
                this.setUser(user);
            } catch (e) {
                this.error_message = getResponseErrorFieldsMessage(e);
                this.isDisabled = false;
            }

        },
        handleChange(e, field){
            this.v$[field].$touch();
            this.error_message = getValidateErrorMessage(this.v$);
        }
    },
    components: {ButtonForm, SocialLogin, InputGroup, Checkbox },
}
</script>