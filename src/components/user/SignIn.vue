<script setup>
import { ref, onMounted } from 'vue'
import { instance } from '@/util/http-common'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user-store'

const router = useRouter()
const userStore = useUserStore()

//모드 전환을 위한 변수
const signUpMode = ref(false)

//로그인 폼과 회원가입 폼의 데이터 관리
const loginEmail = ref('')
const loginPassword = ref('')
const signupEmail = ref('')
const signupName = ref('')
const signupPassword = ref('')
const signupBirth = ref('')

//로그인 버튼 클릭 시 실행되는 함수
const login = async (e) => {
  //로그인 로직
  const userInfo = {
    email: loginEmail.value,
    password: loginPassword.value
  }

  try {
    //post 요청 보내기
    await userStore.login(userInfo)
    //로그인 시, 홈 화면으로 라우팅
    router.push({ name: 'home' })
  } catch (error) {
    console.error('로그인 실패', error)
  }
  console.log('login')
}

//회원가입 버튼 클릭 시 실행되는 함수
const signup = async (e) => {
  //회원가입 로직
  const userInfo = {
    email: signupEmail.value,
    password: signupPassword.value,
    name: signupName.value,
    birth: signupBirth.value
  }

  try {
    await instance.post('/members/register', userInfo).then((response) => {
      switchToLogin()
    })
  } catch (error) {
    console.error('회원가입 실패', error)
  }
  console.log('signup')
}

//signup 버튼 클릭 시 실행되는 함수
const switchToSignup = () => {
  signUpMode.value = true
}

//login 버튼 클릭 시 실행되는 함수
const switchToLogin = () => {
  signUpMode.value = false
}

onMounted(() => {
  const sign_up_btn = document.querySelector('#sign-up-btn')
  const sign_in_btn = document.querySelector('#sign-in-btn')
  const container = document.querySelector('.container')

  sign_up_btn.addEventListener('click', () => {
    container.classList.add('sign-up-mode')
    switchToSignup()
  })

  sign_in_btn.addEventListener('click', () => {
    container.classList.remove('sign-up-mode')
    switchToLogin()
  })
})
</script>

<template>
  <div class="container" :class="{ 'sign-up-mode': signUpMode }">
    <div class="forms-container">
      <div class="signin-signup">
        <!-- 로그인 form -->
        <form action="" class="sign-in-form">
          <h2 class="title">Log In</h2>
          <div class="input-field">
            <font-awesome-icon class="icon" icon="user"></font-awesome-icon>
            <input type="text" placeholder="Email" v-model="loginEmail" />
          </div>
          <div class="input-field">
            <font-awesome-icon class="icon" icon="lock"></font-awesome-icon>
            <input type="password" placeholder="Password" v-model="loginPassword" />
          </div>
          <input type="submit" value="login" class="btn solid" @click.prevent="login" />
        </form>

        <!-- 회원가입 form -->
        <form action="" class="sign-up-form">
          <h2 class="title">Sign Up</h2>
          <div class="input-field">
            <font-awesome-icon class="icon" icon="envelope"></font-awesome-icon>
            <input type="text" placeholder="Email" v-model="signupEmail" />
          </div>
          <div class="input-field">
            <font-awesome-icon class="icon" icon="user"></font-awesome-icon>
            <input type="text" placeholder="Name" v-model="signupName" />
          </div>
          <div class="input-field">
            <font-awesome-icon class="icon" icon="lock"></font-awesome-icon>
            <input type="password" placeholder="Password" v-model="signupPassword" />
          </div>
          <div class="input-field">
            <font-awesome-icon class="icon" icon="calendar-days"></font-awesome-icon>
            <!-- 1999-10-04형태로 줘야함 -->
            <input type="text" placeholder="Birth" v-model="signupBirth" />
          </div>
          <input type="submit" value="signup" class="btn solid" @click.prevent="signup" />
        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>처음 방문하셨나요?</h3>
          <button class="btn transparent" id="sign-up-btn" @click="switchToSignup">Sign Up</button>
        </div>

        <img src="@/assets/loading.png" class="image" alt="" />
      </div>

      <div class="panel right-panel">
        <div class="content">
          <h3>이미 회원이신가요?</h3>
          <button class="btn transparent" id="sign-in-btn" @click="switchToLogin">Log In</button>
        </div>

        <img src="@/assets/loading.png" class="image" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: inherit;
  /* top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  overflow: hidden;
}

.container:before {
  content: '';
  position: absolute;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background: linear-gradient(-45deg, #4481eb, #04befe);
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  z-index: 6;
  transition: 1.8s ease-in-out;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  width: 50%;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
  transition: 1s 0.7s ease-in-out;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 5rem;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: 0.2s 0.7s ease-in-out;
}

form.sign-in-form {
  z-index: 2;
}

form.sign-up-form {
  z-index: 1;
  opacity: 0;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
}

.input-field {
  max-width: 390px;
  width: 100%;
  height: 55px;
  background-color: #f0f0f0;
  margin: 10px 0;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
}

.input-field .icon {
  text-align: center;
  line-height: 44px;
  color: #aaa;
  font-size: 1.3rem;
  margin-top: 0.9rem;
  margin-left: 1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.btn {
  width: 150px;
  height: 49px;
  border: none;
  outline: none;
  border-radius: 49px;
  cursor: pointer;
  background-color: #5995fd;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin-top: 30px;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}

.panels-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 7;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  margin-top: 30px;
  color: #fff;
  transition: 0.9s 0.6s ease-in-out;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 200px;
  height: 50px;
  font-weight: 600;
  font-size: 1.3rem;
}

.image {
  width: 100%;
  transition: 1.1s 0.4s ease-in-out;
}

.right-panel .content,
.right-panel .image {
  transform: translateX(1500px);
}

/* animation */
.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-1200px);
}

.container.sign-up-mode .right-panel .content,
.container.sign-up-mode .right-panel .image {
  transform: translateX(0px);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-in-form {
  z-index: 1;
  opacity: 0;
}

.container.sign-up-mode form.sign-up-form {
  z-index: 2;
  opacity: 1;
}
</style>
