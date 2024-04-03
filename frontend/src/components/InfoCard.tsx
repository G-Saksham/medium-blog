import {InputBox} from './InputBox'
import {Button} from './Button'
import { Heading } from './Heading'
import { SubHeading } from './SubHeading'
import { useState } from 'react'
import { SignupSchema } from '@shaks674/medium-blog-app'
import { BACKEND_URL } from '../config'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

export const InfoCard = ({type}: {type: 'signup' | 'signin'}) => {
    const [input, setInput] = useState<SignupSchema>({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate()

    async function userInfo() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? 'signup' : 'signin'}`,
                input,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            localStorage.setItem('auth', response.data.auth)
            navigate(type === "signup" ? "/signin" : "/blogs")
        } catch(e) {
            alert(e)
        }
    }

    return <div className='text-center flex flex-col h-screen justify-center max-w-3xl w-screen md:w-full'>
        <div className='flex justify-center'>
            <div>
                <Heading label={type === "signup" ? "Create an account" : "Enter your credentials"} />
                <SubHeading label={type === "signup" ? "Already have an account?" : "Don't have an account"} 
                            underline={type === "signup" ? "Login": "Signup"}
                            to={type === "signup" ? '/signin' : '/signup'}
                />
                <div className='text-left'>
                    {type === "signup" ? <InputBox label={"Username"} placeholder={"Enter your username"} onChange={(e) => {
                        setInput({
                            ...input,
                            name: e.target.value
                        })
                    }} /> : null }
                    <InputBox label={"Email"} placeholder={"m@example.com"} onChange={(e) => {
                        setInput({
                            ...input,
                            email: e.target.value
                        })
                    }} />
                    <InputBox label={"Password"} placeholder={"Atleat have 8 letters"} type={'password'} onChange={(e) => {
                        setInput({
                            ...input,
                            password: e.target.value
                        })
                    }}/>
                    <Button label = {type === "signup" ? "Sign Up" : "Sign In"}
                        onPress={userInfo}
                    />
                </div>
            </div>
        </div>
    </div>
}