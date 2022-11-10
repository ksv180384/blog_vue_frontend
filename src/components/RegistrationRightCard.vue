<template>
    <div class="content-right-card">
        <div class="right-card-header">Регистрация</div>
        <div class="w-5/6 mx-auto">
            <form action="#" @submit.prevent="submitRegistration">

                <InputGroup v-model.trim="email"
                            @change="handleChange(e, 'email')"
                            id="inputEmail"
                            label="Email"
                            placeholder="Введите email"
                            :disabled="isDisabled"
                            :class="{ error: error_message.email }"
                            :error_message="error_message.email"
                />

                <InputGroup v-model.trim="name"
                            @change="handleChange(e, 'name')"
                            id="inputName"
                            label="Имя"
                            placeholder="Введите имя"
                            :disabled="isDisabled"
                            :class="{ error: error_message.name }"
                            :error_message="error_message.name"
                />

                <InputGroup v-model.trim="password"
                            @change="handleChange(e, 'password')"
                            id="inputPassword"
                            label="Пароль"
                            placeholder="Введите пароль"
                            type="password"
                            :disabled="isDisabled"
                            :class="{ error: error_message.password }"
                            :error_message="error_message.password"
                />

                <InputGroup v-model.trim="password_confirmation"
                            @change="handleChange(e, 'password_confirmation')"
                            id="inputPasswordConfirm"
                            label="Подтвердите пароль"
                            placeholder="Подтвердите пароль"
                            type="password"
                            :disabled="isDisabled"
                            :class="{ error: error_message.password_confirmation }"
                            :error_message="error_message.password_confirmation"
                />

                <div class="text-center mt-6">
                    <ButtonForm type="submit" :load="isDisabled">Зарегистрироваться</ButtonForm>
                </div>

                <div class="text-center my-3">
                    <a href="#"
                       @click.prevent="registrationToggle"
                       class="link font-semibold uppercase"
                    >
                        Авторизоваться
                    </a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import {mapMutations} from "vuex";
import { getResponseErrorFieldsMessage, getValidateErrorMessage } from "@/helpers";
import { userRegistration } from "@/services/user_service";
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators';
import SocialLogin from "@/components/SocialLogin";
import InputGroup from "@/components/form/InputGroup";
import ButtonForm from "@/components/form/ButtonForm";

export default {
    name: "RegistrationRightCard",
    setup(){
        return { v$: useVuelidate() }
    },
    components: { SocialLogin, InputGroup, ButtonForm },
    data(){
        return {
            email: '',
            name: '',
            password: '',
            password_confirmation: '',
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
            name: {
                required: helpers.withMessage(() => `Введите имя.`, required),
            },
            password: {
                required: helpers.withMessage(() => `Введите Пароль.`, required),
                minLength: helpers.withMessage(({$params}) => `Пароль должен содержать не менее ${$params.min} символов.`, minLength(6)),
            },
            password_confirmation: {
                sameAs: helpers.withMessage(() => 'Неверно подтвержден пароль.', sameAs(this.password))
            }
        }
    },
    methods: {
        ...mapMutations(['setAuth', 'setUser', 'registrationToggle']),
        async submitRegistration(){
            if(this.v$.$invalid){
                this.v$.$touch();

                this.error_message = getValidateErrorMessage(this.v$);
                return true;
            }

            const dataForm = {
                email: this.email,
                name: this.name,
                password: this.password,
                password_confirmation: this.password_confirmation
            };

            this.isDisabled = true;

            try {
                const resUserRegistration = await userRegistration(dataForm);
                const user = resUserRegistration.user;
                const token = resUserRegistration.token;
                this.setAuth(true);
                this.setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
                this.isDisabled = false;
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
}
</script>

<style scoped>

</style>