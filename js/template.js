export { firstpage, loginpage, registerpage, classlistpage, classaddpage };

const firstpage = {
    template: `
    <div>
        메인페이지
    </div>`,

}

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
            },
            userInfo: {
                id: 'admin',
                pw: '1234'
            }
        }
    },
    methods: {
        pcheck_login() {                
            if(this.inputUserInfo.id === this.userInfo.id && this.inputUserInfo.pw === this.userInfo.pw) {
                this.$emit('checklogin', true);
            }else {
                alert('로그인 실패')
            }
        }
    }
}

const registerpage = {
    
}

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