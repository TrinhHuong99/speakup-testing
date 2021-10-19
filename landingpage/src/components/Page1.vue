<template>
    <div class="page1">
        <b-modal id="confirm-info" hide-footer centered>
            <template #modal-title>
            <h6>Xác nhận</h6>
            </template>
            <div class="d-block text-center">
                <p>Chúng tôi sẽ gửi kết quả và lịch Test Speaking qua SĐT và Email. Bạn có chắc chắn <code>{{ phone }}</code> là số của bạn</p>
                
                <b-form-group v-if="reInputPhone" id="input-group-3" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="confirmPhone"
                    name="phone"
                    ref="phone"
                    :state ="confirmPhoneState"
                    placeholder="* Hãy nhập số điện thoại của bạn"
                    required
                    ></b-form-input>
                </b-form-group>
                <b-form-invalid-feedback v-if="reInputPhone" :state="confirmPhoneState">Bạn vui lòng nhập đúng số điện thoại</b-form-invalid-feedback>
                <b-button class="mb-3" variant="primary" block @click="pushContact()">Xác nhận</b-button>
                <span v-if="!reInputPhone" style="cursor: pointer; color: rgb(162, 10, 10); font-weight: 700; display: block; border: 1px solid; width: -webkit-fit-content; width: -moz-fit-content; width: fit-content; margin: auto; padding: 10px; border-radius: 5px;" @click="reInputPhone = true">Số của tôi là số khác</span>
            </div>
        </b-modal>
        <!-- <Header/> -->
        <div class="row1 position-relative" >
            <b-container>
                <b-row class="info-teach">
                    <b-col cols="12" sm="6">
                        <span>
                            Trải nghiệm bài thi kiểm tra năng lực tiếng Anh chuẩn xác nhất được thiết kế bởi đội ngũ thầy cô, chuyên gia trong và ngoài nước.
                        </span>
                    </b-col>
                    <b-col cols="12" sm="6">
                        <div class="teacher-pg1">
                            <img src="@/assets/giao-vien.png">
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <div >
            <b-container>
                <div class="title-form ">
                    <h5>Để bắt đầu bài kiểm tra, bạn vui lòng trả lời các câu hỏi sau:</h5>
                </div>
                <div class="form-info ">
                    <b-form @submit="onSubmit"  v-if="show">
                    <b-form-group
                     id="input-group-1"
                     label-for="input-1"
                     >
                        <b-form-input
                        id="input-1"
                        v-model="name"
                        :state="nameSate"
                        name="name"
                        ref="hoten"
                        placeholder="*Họ và tên:"
                        required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-invalid-feedback :state="nameSate">Bạn vui lòng không để trống họ và tên</b-form-invalid-feedback>
                    <b-form-group id="input-group-2" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="age"
                        name="age"
                        ref="age"
                        :state="ageState"
                        placeholder="*Tuổi"
                        required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-invalid-feedback :state="ageState">Bạn vui lòng nhập tuổi</b-form-invalid-feedback>
                    <b-form-group id="input-group-3" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="phone"
                        name="phone"
                        ref="phone"
                        :state ="phoneState"
                        placeholder="*Số điện thoại"
                        required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-invalid-feedback :state="phoneState">Bạn vui lòng nhập đúng số điện thoại</b-form-invalid-feedback>
                    <b-form-group id="input-group-4" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="email"
                        name="email"
                        ref="email"
                        :state="emailState"
                        placeholder="*Email"
                        required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-invalid-feedback :state="emailState">Bạn vui lòng nhập đúng Email</b-form-invalid-feedback>
                    <b-form-radio-group ref="BasicCheckbox"
                        v-model="learned"
                        :state="checkState"
                        class="input-group-5 checkbox-form"
                        label-for="input-2">
                         <div class="learn-check custom-control custom-control-inline custom-checkbox" style="padding-left: 0px" >
                            <label >*Bạn đã học IELTS chưa:</label>
                        </div>
                        <div class="checkbox" >
                            <b-form-radio value="1" :state="checkState">Đã học</b-form-radio>
                        </div>
                        <div class="checkbox">
                            <b-form-radio value="2" :state="checkState">Chưa học</b-form-radio>
                        </div>

                    </b-form-radio-group>
                    <b-form-invalid-feedback :state="checkState">Bạn vui lòng chọn đã học hoặc chưa học</b-form-invalid-feedback>
                    <div class="w-100 text-center">
                        <b-button @click="checkInfo()" variant="success">Start</b-button>
                    </div>
                    </b-form>
                </div>
            </b-container>
        </div>
    </div>
</template>
<script>
// import Header from '@/components/Header'
export default {
    components: {
        // Header
    },
    data() {
      return {
        email: '',
        name: '',
        age: '',
        phone: '',
        learned: [],
        confirmPhone: '',
        show: true,
        submited: false,
        reInputPhone: false
      }
    },
    watch: {
    },
    created() {
    },
    computed: {
        nameSate() {

            if (!this.submited) {
                return null
            }

            if(this.name.trim().length == '' || !/[A-Z, a-z]/.test(this.name)){
                return false;
            } else {
                return true
            }
        },
        ageState() {
            if (!this.submited) {
                return null
            }

            if(this.age.trim().length > 0 && this.age.trim().length < 3 && /^[0-9 ]*$/.test(this.age) && parseInt(this.age) > 0){
                return true
            } else {
                return false;
            }
        },
        emailState(){

            if (!this.submited) {
                return null
            }

            if(!this.validEmail(this.email.trim())){
                return false;
            } else {
                return true
            }
        },
        phoneState(){
            if (!this.submited) {
                return null
            }

            if(!this.checkPhone(this.phone)){
                return false;
            } else {
                return true
            }
        },
        confirmPhoneState(){
            if (!this.submited) {
                return null
            }

            if(!this.checkPhone(this.confirmPhone)){
                return false;
            } else {
                return true
            }
        },
        checkState() {

            if (!this.submited) {
                return null
            }

            return this.learned.length === 1
        },
    },
    methods: {
        validEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
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
        onSubmit(event) {
            event.preventDefault()
            alert(JSON.stringify(this.form))
        },
        checkInfo () {
            this.submited = true
            if(!this.nameSate){
                this.$refs.hoten.focus()
                return
            }
            
            if(this.learned.length === 0){
                return
            }
            
            if(!this.ageState){
                this.$refs.age.focus()
                return
            }
            
            if(!this.emailState){
                this.$refs.email.focus()
                return
            }
            if(!this.checkPhone(this.phone)){
                this.$refs.phone.focus()
                return
            }

            this.reInputPhone = false
            this.$bvModal.show('confirm-info')
        },
        pushContact(){

            if (this.reInputPhone) {
                this.phone = this.confirmPhone
            }

            const trackid = localStorage.getItem('_speakup_track')

            this.$http.post('/track/push-contact',{
                trackid: trackid,
                data:{
                    source: document.location.href,
                    name: this.name,
                    email: this.email,
                    age: this.age,
                    phone: this.phone,
                    learned: this.learned,
                }
            })
            .then(res => {
                if (res.data.code === 1) {
                    this.$store.dispatch('Questions')
                    this.$store.commit('SET_PAGE', 2)
                    localStorage.setItem('speakupTestName', this.name)
                    localStorage.setItem('speakupTestLearned', this.learned)

                    this.$analytics.fbq.event('CompleteRegistration', {
                        value: 20.000,
                        currency: 'VND',
                        content_name: 'Signup',
                        status: 'complete'
                    });
                }
            })
        }
    },
    beforeUpdate() {
    },
    destroyed() {
    },
    updated() {
    }

}
</script>
<style>

.modal .form-control {
    box-shadow: none !important;
}

    .invalid-feedback {
        display: none;
        width: 100%;
        margin-top: -10px;
        margin-bottom: 11px;
        font-weight: 700;
        font-size: 16px;
        color: #dc3545;
    }
    input[type=radio].is-invalid{
        background-color: #dc3545;
    }
    .checkbox-form .checkbox>div {
        padding: 0;
        margin: 0;
        margin-top: 6px;
    }

    .checkbox-form .checkbox>div input {
        display: inline;
        width: 100%;
        height: 15px;
        top: -13px;
    }

    .checkbox-form .checkbox>div label {
        display: block;
        width: 100%;
    }

</style>
<style scoped>
    .page1{
        /* height: 100vh; */
        padding-bottom: 200px;
        position: relative;
    }
    .button-pg1 {
            top: -5px;
    }
    .info-teach{
        display: flex;
        align-items: center;
        width: 65%;
        margin: auto;
        margin-top: 30px;
        position:relative;
    }
    .info-teach span{
        color: #0158a8;
        font-size: 18px;
        font-weight: 700;
        top: -15px;
        position: relative;
    }
    .row1::before{
        content: '';
        position: absolute;
        background-color: #87d2fd;
        width: 100%;
        height: 135px;
        top: 30px;
    }
    .teacher-pg1{
        position: relative;
        top: -35px;
    }
    .form-info{
        width: 45%;
        margin: auto;
    }
    .title-form h5{
        text-align: center;
        color: white;
        font-weight: 700;
        margin-top: 15px;
    }
    .form-control {
        border-radius: 15px;
        color: #0158a8;
        line-height: 1.5;
        margin-bottom: 20px;
        font-weight: 600;
        box-shadow: 0px 4px 3px #1b96f2;
        height: 50px;
        padding: 15px;
    }
    .form-control::-webkit-input-placeholder {
        color: #0158a8;
    }
    .cloudy-pg1{
        position: absolute;
        z-index: 0;
        height: 143px;
        width: 100%;
        bottom: 100px;
    }
    .cloudy-pg1 img{
        width: 100%;
    }
    /* .cloudy-pg1::before{
        content: '';
        position: absolute;
        background-image: url('../assets/cloudy.png');
        height: 170px;
        width: 1920px;
        background-size: 100% 100%;
    } */
    .input-group-5{
        display: flex;
        align-items: center;
        border-radius: 15px;
        color: #0158a8;
        margin-bottom: 18px;
        font-weight: 600;
        box-shadow: 0px 4px 3px #1b96f2;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        -webkit-appearance: none;
        -moz-appearance: none;height: 50px;
        padding: 15px;
        appearance: none;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .learn-check{
        margin: 0 35px 0 10px;
    }
    .custom-control {
        height: 20px;
        margin-top: -6px;
        top: 6px;
    }
    .custom-control-input {
        top: 10px;
    }
    .checkbox {
        display:flex;
        flex-direction:column;
        align-items: center;
        margin-left: 40px;
    }

    @media only screen and (max-width: 1200px){
        .form-info {
            width: 50%;
        }
    }

    @media only screen and (max-width: 992px){
        .form-info {
            width: 65%;
        }
    }

    @media only screen and (max-width: 768px){

        .page1{
            height: auto;
        }
        .info-teach{
            width: 100%;
            top: 20px;
        }
        .row1::before {
            top: 15px;
        }
        .info-teach span {
            font-size: 11px;
            top: 0;
        }
        .teacher-pg1 {
            top: 0;
        }
        .form-info {
            width: 100%;
        }
        .learn-check {
            margin: 0 0px 0 10px;
        }
        .checkbox{
            margin-left: 10px;
        }
        .row1 {
            margin-bottom: 45px;
        }
        .title-form h5 {
            font-size: 18px;
        }
        .input-group-5{
            height: auto;
            display: block;
            text-align: center;
            box-shadow: 0px 5px 10px #bac1c5;
            z-index: 9;
            position: relative;
        }
        .learn-check {
            padding-left: 0px;
            display: block;
            margin-bottom: 20px;
        }
        .input-group-5 .checkbox{
            display: inline-block !important;
        }
        .input-group-5 .checkbox:last-child{
            margin-left: 30px;
        }
        .cloudy-pg1{
            bottom: -160px;
        }
        .btn.btn-success{
            font-size: 25px;
        }
    }
    @media only screen and (min-width: 1024px)  and (max-width: 1400px){
        .cloudy-pg1{
            bottom: -220px;
        }
    }
    @media only screen and (min-width: 1024px)  and (max-width: 1200px){
        .info-teach {
            width: 75%;
        }
    }

    @media only screen and (min-width: 1024px)  and (max-width: 1200px){
        .info-teach {
            width: 85%;
        }
    }
    @media only screen and (min-width: 768px)  and (max-width: 1023px){
        .info-teach span{
            font-size: 17px;
        }
        .info-teach {
            width: 100%;
            top: 16px;
        }
        .row1{
            margin-bottom: 10px;
        }
    }
    @media only screen and (min-width: 414px)  and (max-width: 735px){
        .info-teach span {
            font-size: 14px;
        }
    }

    @media only screen and (max-width: 1400px){
        .page1>.row1::before {
                top: 12px;
        }
    }
   
   @media only screen and (max-width: 1200px){
        .page1>.row1::before {
                top: 28px;
        }
    }
  
  @media only screen and (max-width: 1024px){
        .page1>.row1::before {
                top: 60px;
        }
    }

    @media only screen and (max-width: 955px){
        .page1>.row1::before {
                top: 45px;
        }
    }

    @media only screen and (max-width: 680px){
        .page1>.row1::before {
                top: 40px;
        }
    }

    @media only screen and (max-width: 576px){
        .page1>.row1::before {
                top: 28px;
        }
    }

    @media only screen and (max-width: 576px){
        .page1>.row1::before {
                top: 5px;
        }
    }


</style>