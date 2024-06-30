import * as Yup from 'yup'


const loginFormSchema = Yup.object().shape({
  email: Yup.string().email('Email is not valid').required('Email is required'),
  password: Yup.string().min(8, 'Password must contain min 8 charactors').required('Password is required')
})

export default loginFormSchema
