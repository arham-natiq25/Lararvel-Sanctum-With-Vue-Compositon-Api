import axios from 'axios'
import {reactive,computed,ref} from 'vue'

const state = reactive({
  authenticated:false,
  user:{}
})
export default function useAuth(){
  const errors = ref({})
  const getAuthencticated=computed(()=>state.authenticated)
  const getUser=computed(()=>state.user)
  const setAuthenticated =(authenticated)=>{
    state.authenticated=authenticated
  }
  const setUser =(user)=>{
    state.user=user
  }

  const attempt = async ()=>{
    try {
      let response = await axios.get('/api/user')

      setAuthenticated(true)
      setUser(response.data)


      return response

    } catch (e) {
      setAuthenticated(false)
      setUser({})
      
    }
  }

  const login = async (credentials) => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/login', credentials);
      attempt()
    } catch (error) {
    if (error.response.status==422) {
      errors.value = error.response.data.errors
    }      
    }
  };

  const logout = async ()=>{
    try {
      await axios.post('/logout')
      setAuthenticated(false)
      setUser({})
    } catch (error) {
      console.log(error)
    }
  }
  
 return {
  login,
  attempt,
  logout,
  getAuthencticated,
    getUser,
    errors

}
}