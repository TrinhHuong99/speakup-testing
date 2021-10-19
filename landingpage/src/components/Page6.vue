<template>
    <div class="page6">
        <b-container>
            <div class="box_test">
                <div class="dotted">
                </div>
                <div class="container-test">
                    <h2>
                        Chúc mừng bạn đã hoàn thành qua 3 phần thi: Listening, Reading, Writing.<br>
Với phần thi Speaking, bài thi sẽ kéo dài trong vòng 10’ và giáo viên của Ican sẽ trực tiếp liên hệ với bạn trong thời gian sớm nhất.
                    </h2>
                    <h3>Bạn vui lòng trả lời câu hỏi sau:</h3>
                    <h4>Thời gian nào là thuận tiện nhất cho bạn để giáo viên Ican sẽ liên hệ với bạn để thực hiện bài kiểm tra Speaking:</h4>
                    <form action="" class="form-box">
                        <b-row class="">
                            <b-col md="4" sm="6">
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-1"
                                        v-model="status"
                                        name="checkbox-1"
                                        value="9 a.m - 10 a.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>9 a.m - 10 a.m</span>
                                    </b-form-checkbox>
                                    <!-- <slot name="slot1"></slot> -->
                                    <!-- <slot name="slot2"></slot> -->
                                </div>
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-2"
                                        v-model="status"
                                        name="checkbox-2"
                                        value="10 a.m - 11 a.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>10 a.m - 11 a.m</span>
                                    </b-form-checkbox>
                                    <!-- <slot name="slot1"></slot> -->
                                    <!-- <slot name="slot2"></slot> -->
                                </div>
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-3"
                                        v-model="status"
                                        name="checkbox-3"
                                        value="11 a.m - 12 a.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>11 a.m - 12 a.m</span>
                                    </b-form-checkbox>
                                    <!-- <slot name="slot1"></slot> -->
                                    <!-- <slot name="slot2"></slot> -->
                                </div>
                            </b-col>
                             <b-col md="4" sm="6">
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-4"
                                        v-model="status"
                                        name="checkbox-4"
                                        value="2 p.m - 3 p.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>2 p.m - 3 p.m</span>
                                    </b-form-checkbox>
                                    <!-- <slot name="slot1"></slot> -->
                                    <!-- <slot name="slot2"></slot> -->
                                </div>
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-5"
                                        v-model="status"
                                        name="checkbox-5"
                                        value="3 p.m - 4 p.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>3 p.m - 4 p.m</span>
                                    </b-form-checkbox>
                                    <!-- <slot name="slot1"></slot> -->
                                    <!-- <slot name="slot2"></slot> -->
                                </div>
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-6"
                                        v-model="status"
                                        name="checkbox-6"
                                        value="4 p.m - 5 p.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>4 p.m - 5 p.m</span>
                                    </b-form-checkbox>
                                    <!-- <slot name="slot1"></slot> -->
                                    <!-- <slot name="slot2"></slot> -->
                                </div>
                            </b-col>
                             <b-col md="4" sm="6">
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-7"
                                        v-model="status"
                                        name="checkbox-7"
                                        value="5 p.m - 6 p.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>5 p.m - 6 p.m</span>
                                    </b-form-checkbox>
                                    <!-- <slot name="slot1"></slot> -->
                                    <!-- <slot name="slot2"></slot> -->
                                </div>
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-8"
                                        v-model="status"
                                        name="checkbox-8"
                                        value="6 p.m - 7 p.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>6 p.m - 7 p.m</span>
                                    </b-form-checkbox>
                                    <!-- <slot name="slot1"></slot> -->
                                    <!-- <slot name="slot2"></slot> -->
                                </div>
                                <div class="check-box">
                                    <b-form-checkbox
                                        id="checkbox-9"
                                        v-model="status"
                                        name="checkbox-9"
                                        value="7 p.m - 8 p.m"
                                        unchecked-value="not_accepted"
                                        >
                                        <span>7 p.m - 8 p.m</span>
                                    </b-form-checkbox>
                                    <!-- <slot name="slot1"></slot> -->
                                    <!-- <slot name="slot2"></slot> -->
                                </div>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-invalid-feedback class="mb-0 mb-2" :state="checkState">Bạn vui lòng chọn khung giờ</b-form-invalid-feedback>
                            </b-col>
                        </b-row>
                        <b-row class="end-form">
                            <b-col lg="7">
                                <p>Điền lại chính xác số điện thoại để giáo viên liên hệ cho bạn nhé:</p>
                            </b-col>
                            <b-col lg="5">
                                <input type="text" ref="phone" v-model="phone_comfirm" :state ="phoneState" placeholder="Số điện thoại của bạn">
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col lg="7">
                            </b-col>
                            <b-col lg="5">
                                <b-form-invalid-feedback class="mb-0 mt-2" :state="phoneState">Bạn vui lòng nhập đúng số điện thoại</b-form-invalid-feedback>
                            </b-col>
                        </b-row>
                    </form>
                    <div class="end-test">
                     <img src="../assets/ican.png" alt="">
                    cảm ơn và chúc bạn có một bài thi thành công!
                </div>
                </div>
            </div>
            <div class="d-flex justify-content-center button-pg1 ">
                    <b-button @click="nextpage" variant="danger">End</b-button>
            </div>
        </b-container>
    </div>
</template>
<script>
    export default{
        data : function() {
            return{
                status: [],
                phone_comfirm: '',
                submited: false
            }
        },
        computed: {
            phoneState(){
                if (!this.submited) {
                    return null
                }

                if(!this.checkPhone(this.phone_comfirm)){
                    return false;
                } else {
                    return true
                }
            },
            checkState(){
                if (!this.submited) {
                    return null
                }

                if(this.status.length == 0){
                    return false;
                } else {
                    return true
                }
            },
        },
        methods: {
            nextpage() {
                console.log(this.checkState)
                this.submited = true
                if(!this.checkPhone(this.phone_comfirm)){
                    this.$refs.phone.focus()
                    return
                }

                // Push test
                const trackid = localStorage.getItem('_speakup_track')
                this.$http.post('/test-submit',{
                    trackid: trackid,
                    test_data: JSON.parse(localStorage.getItem('speakupTestData')),
                    time: JSON.stringify(this.status),
                    confirm_phone: this.phone_comfirm
                })
                .then(res => {
                    if (res.data.code === 1) {
                        localStorage.removeItem('speakupTestData')
                        localStorage.removeItem('speakupTestName')
                        localStorage.removeItem('speakupTestPage')
                        localStorage.removeItem('speakupTestPart')
                        localStorage.removeItem('_speakup_track')
                    }
                })
                this.$store.commit('SET_PAGE', 7);
            },
            checkPhone(mobile) {
                let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                if(mobile !==''){
                    if (vnf_regex.test(mobile) == false) {
                        return false
                    } else {
                        return true
                    }
                }
            },
        },
        watch: {
            status(value) {
                console.log(value)
            }
        }
    }
</script>
<style >
    .btn.btn-danger {
        background-color: #c7211d;
        text-transform: uppercase;
        color: #fff;
        font-weight: 900;
        font-size: 40px;
        border-radius: 25px;
        line-height: 45px;
        padding: 5px 35px;
        display: inline-block;
        border: 1px solid #94100d;
        box-shadow: 0px 4px 2px #94100d;
    }
    .button-pg1 {
        position: relative;
        top: -30px;
        z-index: 2;
    }
    .check-box span{
        background: #fee138;
        color: #1160a0;
        font-style: italic;
        padding: 5px 15px;
        border-radius: 10px;
        border: 2px solid #1160a0;
        margin-left: 30px;
    }
    .check-box{
        margin-bottom: 40px;
    }
    .check-box input[type="checkbox"]{
        width: 30px;
        height: 25px;
        /* -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        appearance: none; */
        border: 2px solid #1160a0;
        border-radius: 4px;
        outline: none;
        transition-duration: 0.3s;
        cursor: pointer;
        margin-right: 30px;
        margin-top: -3px;
    }

    .form-box input[type="text"]{
        border: 2px solid #1160a0;
        border-radius: 8px;
    }

    .custom-control {
        user-select: none;
    }
</style>
<style scoped>
    .box_test{
        /* height: 70vh; */
        background: #fff;
        border-radius: 20px;
        background: url(../assets/bg-box-test.png);
        background-repeat: repeat;
        overflow-y: auto;
        position: relative;
    }
    .dotted{
        position: absolute;
        width: 93%;
        top: -2px;
        background: url(../assets/dotted-box-test.png);
        background-repeat: repeat-x;
        height: 55px;
        left: 50%;
        transform: translateX(-50%);
    }
    .container-test{
        text-align: center;
        padding: 40px;

    }
    .container-test h2{
        margin-top: 20px;
        font-size: 20px;
        font-weight: 900;
        line-height: 1.5;
        color: #0057a7;
        
    }
    .container-test  h3{
        font-size: 20px;
        color: #0057a7;
        font-weight: 900;
    }
    .container-test  h4, .end-form p{
        font-size: 20px;
        color: #0057a7;
        margin-bottom: 0;
        font-style: italic;
    }
    .container-test form{
        max-width: 1000px;
        margin: 0 auto;
        margin-top: 30px;
    }
    .form-box .col-lg-4{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .box_test{
        margin-top: 30px;
    }
    .end-form input{
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 10px;
    }
    .end-form{
        display: flex;
        align-items: center;
    }
    .end-test{
        font-size: 30px;
        color: #0057a7;
        font-weight: 600;
        display: flex;
        align-items: baseline;
        justify-content: center;
        margin-top: 40px;
    }
    .end-test img{ margin-right: 20px;}
    /* custom scrollbar */
    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }
    @media only screen and (max-width: 768px){
        .box_title, .box_time {
            font-size: 16px;
        }
        .box_test{
            /* height: 415px; */
        }
        .dotted {
            width: 80%;
        }
        .container-test {
            padding: 10px;
        }
        .container-test h2 {
            font-size: 13px;
        }
        .end-test img {
            margin-right: 10px;
            margin-top: -15px;
        }
        .end-test {
            margin-top: 18px;
            margin-bottom: 32px;
            font-size: 17px;
            align-items: center;
        }
        .container-test h4, .end-form p{
            font-size: 16px;
        }
        .dotted{
            width: 100%;
            background-size: 30%;
        }
        .btn.btn-success{
            font-style: 25px;
        }
    }
    @media only screen and (max-width: 768px){
         /* .page6{
             height: 100vh;
         } */
         .form-box .col-lg-4{
            align-items: flex-start;
        }
        .box_test{
            /* height: 80vh; */
        }
     }
</style>
