<template>
<div class="page2">
    <div>
        <b-container>
            <div class="rule box_test mb-4 mt-4">
                <div class="dotted">
                </div>
                    <div class="title-rule">
                        <span class="mt-4">QUY ĐỊNH LÀM BÀI</span>
                    </div>
                    <div class=" mt-4 content-rule">
                        <p>01. Bài thi bao gồm 4 phần: Listening, Reading, Writing và Speaking.</p>
                        <p v-if="learned == 1">02. Bài thi diễn ra trong thời gian 70 phút (chưa bao gồm 10 phút cho phần Speaking).</p>
                        <p v-if="learned != 1">02. Bài thi diễn ra trong thời gian 55 phút (chưa bao gồm 10 phút cho phần Speaking).</p>
                        <p>03. Hết thời gian làm bài, bài thi tự động kết thúc gửi về hệ thống.</p>
                        <p>04. Thí sinh làm bài trong môi trường yên tĩnh, có kết nối mạng ổn định.</p>
                    </div>
                    <div class="mt-4 mb-4 bottom-row">
                        <h3>Chúc các bạn hoàn thành bài thi thật tốt.</h3>
                    </div>
                    <div class="d-flex justify-content-center button-pg1 ">
                            <b-button @click="nextpage" variant="success">Start</b-button>
                    </div>
                </div>
        </b-container>
    </div>
</div>

</template>
<script>
export default {
    data() {
        return {
            learned: localStorage.getItem('speakupTestLearned')
        }
    },
    mounted() {
    },
    methods: {
        nextpage(){
            this.$store.commit('SET_PAGE', 3);
        }
    }
}
</script>
<style scoped>
    .page2 {
        /* height: 70vh;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center; */
        margin-top: 80px;
    }
    .button-pg1 {
        top: -5px;
    }
    .box_test{
        /* height: 375px; */
        background: #fff;
        border-radius: 20px;
        background: url(../assets/bg-box-test.png);
        background-repeat: repeat;
        position: relative;
        box-shadow: 0px 8px 0px #1990ef;
    }
    .dotted{
        position: absolute;
        width: 90%;
        top: -2px;
        background: url(../assets/dotted-box-test.png);
        background-repeat: repeat-x;
        height: 55px;
        left: 50%;
        transform: translateX(-50%);
    }
    .title-rule {
        margin-top: 2.5rem !important;
        display: inline-block;
        position: relative;
    }
    .title-rule span{
        font-weight: 900;
        color: #fff;
        font-size:35px;
        position: relative;
    }
    .title-rule::before{
        content: '';
        position: absolute;
        background-image: url('../assets/title-rule.png');
        height: 63px;
        width: 405px;
        left: 50%;
        transform: translateX(-50%);
        top: -7px;
        background-size: 100% 100%;
    }
    .bottom-row h3{
        text-transform: uppercase;
        font-weight: 800;
    }
    .cloudy-pg1{
        position: absolute;
        z-index: 0;
        height: 170px;
        border: 0;
        bottom: 30px;
    }
    .rule{
        width: 72%;
        margin: auto;
        color: #0057a7;
        text-align: center;
        position: relative;
        background-color: aliceblue;
    }
    .content-rule p{
        font-weight: 700;
        font-size: 18px;
    }
    .cloudy-pg1{
            bottom: -240px;
        }
    @media only screen and (max-width: 992px){
        .rule {
            width: 100%;
        }
    }

    @media only screen and (max-width: 768px){
        .page2{
            height: 78vh;
        }

        .rule{
            width: 100%;
            height: 400px;
        }
        .title-rule::before {
            top: -15px;
        }
        .title-rule span {
            font-size: 25px;
        }
        .content-rule p {
            font-size: 15px;
            margin-bottom: 5px;
        }
        .bottom-row h3{
            font-size: 18px;
        }
        .bottom-row {
            margin-top: 12px  !important;
        }
        .button-pg1 {
            /* top: -16px; */
        }
        .dotted{
            width: 100%;
            background-size: 30%;
            padding: 0 30px;
            /* padding-bottom: 50px; */
            text-align: justify;
        }
        .cloudy-pg1{
            bottom: -190px;
        }
        .btn.btn-success{
            font-size: 25px;
        }

    }
    @media only screen and (min-width: 1024px)  and (max-width: 1300px){
        /* .title-rule::before {
            left: 18%;
        } */
        .box_test {
            /* height: 350px; */
        }
        .bottom-row h3 {
            font-size: 23px;
        }
        .content-rule p {
            font-size: 15px;
        }
    }
    @media only screen and (min-width: 768px)  and (max-width: 1023px){
        .content-rule p {
            font-size: 17px;
            margin-bottom: 15px;
        }
        .bottom-row h3 {
            font-size: 25px;
        }
        /* .title-rule::before {
            left: 26%;
        } */
        .rule {
            height: 350px;
        }
        .button-pg1 {
            top: -5px;
        }
        .title-header span {
            font-size: 24px;
        }
    }
    @media only screen and (min-width: 414px)  and (max-width: 735px){
        /* .title-rule::before {
            left: 3%;
        } */
    }

    @media only screen and (max-width: 500px){
        .title-rule::before {
            top: -6px;
            height: 50px;
            width: 285px;
        }
    }
</style>