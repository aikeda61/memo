new Vue({
    el: "#app",
    data: {
        aisatsu: "Welcome",
        isLoggedIn: false,
        userPass: "",
        passInput: "",
        isError: false,
    },
    created() {
        const pass = document.querySelector("#pass")
        this.userPass = pass.getAttribute("data-pass")
        pass.remove()

    },
    mounted() {
        // ログインしたことあるかどうか
        if (sessionStorage.userPass === this.userPass) this.isLoggedIn = true
        //ログインしない状態
        var regex = /limited\/index02.html/;
        var str = window.location.pathname;
        if (regex.test(str) === true) {
            if (this.isLoggedIn == false) {
                window.location = "./index.html"
            } 
            // else {
            //     window.onload = () => {
            //         document.querySelector('.reserve a').setAttribute('href', window.location.href)
            //     }
            // }
        }
    },
    methods: {
        onLogin() {
            if (this.userPass === this.passInput) {
                this.isLoggedIn = true

                // 保存
                sessionStorage.userPass = this.passInput

                //redirect
                window.location = "./index02.html"
            } else {
                this.isError = true
                // setTimeout(() => {
                //     var pop = document.querySelector('.pop');
                //     pop.setAttribute("data-aos","flip-down")
                //  }, "1000")
            }
        },
        onLogout() {
            this.isLoggedIn = false
            sessionStorage.userPass = ""

            //redirect
            window.location = "./index.html"

        },
        onClose() {
            this.isError = false

        }

    },
})