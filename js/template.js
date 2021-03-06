export { loginpage, registerpage, classlistpage, classaddpage };
import userInfo from './user_info.js'


// ###################### 로그인 페이지 ######################
const loginpage = {
    template: `
    <div>
        <h1>로그인</h1>
        <div class="login-wrap">
            <div class="login-item">
                <label for="id">ID</label>
                <input id="id" type="text" v-model="inputUserInfo.id" @keyup.enter="pcheck_login">
            </div>
            <div class="login-item">
                <label for="pw">PW</label>
                <input id="pw" type="password" v-model="inputUserInfo.pw" @keyup.enter="pcheck_login">
            </div>            
            <div class="login-btn-wrap">
                <button @click="pcheck_login">LOGIN</button>
            </div>
        </div>
    </div>`,
    data: function() {
        return {
            inputUserInfo: {
                id: '',
                pw: ''
            }
        }
    },
    methods: {
        pcheck_login() {       
            const user_info = userInfo[this.inputUserInfo.id];
            if(!user_info) return alert("해당 아이디가 존재하지 않습니다.");
            if(user_info.password !== this.inputUserInfo.pw) return alert("패스워드가 일치하지 않습니다.");
            this.$emit('checklogin', true);
        }
    }
}


// ###################### 회원가입 페이지 ######################
const registerpage = {
    template: `
    <div>
        <h1>회원가입</h1>
        <div class="login-wrap">
            <div class="login-item">
                <label for="id">ID</label>
                <input id="id" type="text" v-model="new_id" @keyup.enter="add_user">            
            </div>
            <div class="login-item">
                <label for="pw">PW</label>
                <input id="pw" type="password" v-model="new_pw" @keyup.enter="add_user">
            </div>            
            <div class="login-btn-wrap">
                <button @click="add_user">Submit</button>
            </div>
        </div>
    </div>`,
    data: function() {
        return {
            new_id: '',
            new_pw: ''
        }
    },
    methods: {
        add_user() { 
            if(userInfo[this.new_id]) return alert("이미 존재하는 아이디입니다.");        
            userInfo[this.new_id] = {
                'password' : this.new_pw
            }
            localStorage.setItem("user_info", JSON.stringify(userInfo));
            this.$router.push('login');            
        }
    }
}


// ###################### 강의목록 페이지 ######################
const classlistpage = {
    template: `
    <div style="width: 600px">        
        <div class="list-header">
            <h1>강의목록</h1>
            <router-link to="/classadd"><i class="fa fa-plus" aria-hidden="true"></i></router-link> 
        </div>
        <ul class="list-item" :key="index" v-for="(item, index) in classes">
            <li>
                <strong>강의명</strong>
                <input class="list-input name" type="text" v-model="item.name" disabled>
            </li>
            <li>
                <strong>가격</strong>
                <input class="list-input" type="number" step="100" v-model="item.price" placeholder="가격 입력" disabled>
            </li>
            <li>
                <strong>갯수</strong>
                <input class="list-input" type="number" v-model="item.quantity" placeholder="신청갯수 입력" disabled>
            </li>
            <li>
                <button class="update-btn" @click="update_class(index)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button class="trash-btn" @click="remove_class(index)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>    
            </li>
        </ul>
        <div class="total-info">
            <span><strong>총 가격</strong> {{ totalPrice1 }}</span>
            <span><strong>세금 가격</strong> {{ totalPrice2 }}</span>
            <span></span>
        </div>
    </div>`,
    data: function() {
        return {
            totalPrice: null
        }
    },
    props: {
        classes: []
    },
    methods: {
        remove_class: function(idx) {
            this.classes.splice(idx, 1);
            localStorage.setItem("classes",JSON.stringify(this.classes));
        },
        update_class: function(idx) {        
            const current_item = document.querySelectorAll('.list-item')[idx];        
            [...current_item.children].forEach(item => {
                const input = item.querySelector("input");
                if(input != null){
                    input.toggleAttribute("disabled")
                }
            })
        }
    },
    computed: {
        totalPrice1: function() {
            this.totalPrice = this.classes.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            return this.totalPrice.toLocaleString();
        },
        totalPrice2: function() {
            return Math.floor(this.totalPrice * 1.1).toLocaleString();
        }
    },
    watch: {
        classes: {
            deep: true,
            handler(newData) {            
                localStorage.setItem("classes", JSON.stringify(newData));
            }
        }
    }
}


// ###################### 강의등록 페이지 ######################
const classaddpage = {
    template: `
    <div>
        <h1>강의등록</h1>
        <div class="add-wrap">
            <div class="add-input">
                <label for="name">NAME</label>
                <input type="text" id="name" v-model="name" @keyup.enter="add_class" placeholder="강의명">
            </div>
            <div class="add-input">
                <label for="price">PRICE</label>
                <input type="number" step="100" id="price" v-model="price" @keyup.enter="add_class">
            </div>
            <div class="add-btn">
                <button @click="add_class">등록</button>
                <button @click="go_list">목록</button>
            </div>
        </div>
    </div>`,
    data: function() {
        return {
            'name': '',
            'price': 0,
        }
    },
    methods: {
        add_class() {
            this.$emit("add_class", { 'name': this.name, 'price': this.price, 'quantity': 0 });
            this.$router.push('classlist');
        },
        go_list() {
            this.$router.push('classlist');
        }
    }
}