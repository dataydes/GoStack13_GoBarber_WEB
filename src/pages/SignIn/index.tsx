import React, { useRef, useCallback, useContext } from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import Input from '../../components/Input';
import Button from '../../components/Button';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { AuthContext } from '../../context/AuthContext';


interface SignInFormData {
    email: string;
    password: string;
}


const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useContext(AuthContext);

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string().required('Email obrigatório').email(),
                    password: Yup.string().required('Senha obrigatória').min(6, 'Senha não confere.'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                signIn({
                    email: data.email,
                    password: data.password,
                });
            } catch (err) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }
        },
        [signIn],
    );

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>
                    <Input name="email" icon={FiMail} placeholder="Email" />
                    <Input name="password" icon={FiMail} type="password" placeholder="Senha" />
                    <Button type="submit">Entrar</Button>
                    <a href="forgot">Esqueci minha senha</a>
                </Form>
                <a href="">
                    <FiLogIn />
                Criar conta</a>
            </Content>
            <Background />
        </Container>

    )
};

export default SignIn;