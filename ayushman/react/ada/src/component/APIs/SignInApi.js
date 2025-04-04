import axios from "axios";

const SignInApi=axios.create({
    baseURL:'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default SignInApi;