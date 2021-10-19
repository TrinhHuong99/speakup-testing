<template>
    <div class="page3">
        <b-container>
             <b-row class="header-test d-flex align-items-center mb-3 mt-4">
                <b-col sm="6" class="left_header">
                    <div class="box_title">{{ this.partTitle }}</div>
                </b-col>
                <b-col sm="6" class="d-flex justify-content-end right_header">
                    <div class="box_time d-flex align-items-center">
                        <div class="icon_clock">
                            <img src="../assets/clock.png" alt="">
                        </div>
                        <div class="time-end">{{ secondToMinute(couter) }}</div>
                    </div>
                </b-col>
            </b-row>
            <div class="box_test">
                <div class="dotted">
                </div>
                <div class="part-descreption" v-html="Questions.description"></div>
                <div class="question-lock-list" v-if="Questions.part_type == 0">
                    <div class="question-block" v-for="(question) in Questions.questions" :key="question.id"  >
                        <type1 :content="question" v-if="question.content_type == 1 || question.content_type == 2">
                            <!-- <template v-slot:question-number>
                                <h2>Question {{ getQuestionNumber(Questions.questions, index) }}</h2>
                            </template> -->
                        </type1>
                        <type3 :content="question" v-if="question.content_type == 3">
                            <!-- <template v-slot:question-number>
                                <h2>Question {{ getQuestionNumber(Questions.questions, index) }}</h2>
                            </template> -->
                        </type3>
                        <div v-if="question.content_type == 5">
                            <b-container>
                                <b-row>
                                    <b-col lg="12">
                                        <div class="item_quesion">
                                            <div class="header_question">
                                                <div class="title_question ql-editor" style="" v-html="question.content"></div>
                                            </div>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </div>
                    </div>
                </div>

                <div v-if="Questions.part_type == 1" class="part-writing">
                    <editor/>
                </div>
                <!-- <type2/> -->
                <!-- <type4/> -->
            </div>
            <div class="d-flex justify-content-center button-pg1 ">
                    <b-button @click="nextpage" variant="success">Next</b-button>
            </div>
        </b-container>
    </div>
</template>
<script>
import type1 from '@/components/type_questions/type1'
import editor from '@/components/editor'
import type3 from '@/components/type_questions/type3'
// import type4 from '@/components/type_questions/type4'
export default {
    components : {
        type1,
        editor,
        type3,
        // type4
    },
    data() {
        return {
            couter: 0,
            start_timing: true,
        }
    },
    methods: {
        secondToMinute(time) {
            const minute = parseInt(time / 60, 0) < 10 ? `0${parseInt(time / 60, 0)}` : parseInt(time / 60, 0)
            const secord = time % 60 < 10 ? `0${time % 60}` : time % 60
            return `${minute}:${secord}`
        },
        countDownTimer() {
            setTimeout(() => {
                if (this.start_timing) {
                    this.couter -= 1
                    this.$store.commit('SET_TIME_REMAINING', this.couter)
                    if (this.couter == 0) { this.nextpage() }
                }
                this.countDownTimer()
            }, 1000)
        },
        nextpage(){
            const partCount = this.$store.getters['countPart']
            const partCurrent = this.$store.getters['getPartNumber'] + 1

            const self = this

            const trackid = localStorage.getItem('_speakup_track')
            self.$http.post('/test-save',{
                trackid: trackid,
                test_data: JSON.parse(localStorage.getItem('speakupTestData')),
            })
            .then(res => {
                if (res.data.code === 1) {
                    if (partCount > partCurrent) {
                        self.$store.commit('SET_PART', partCurrent)
                    } else {
                        this.start_timing = false
                        self.$store.commit('SET_PAGE', 6)
                    }
                }
            })
        },
        getQuestionNumber(question, questionIndex) {
            let amount = 1
            for (let index = 0; index < questionIndex; index++) {
                if (question[index].content_type !== 5) {
                    amount++
                }
            }
            return amount
        }
    },
    computed: {
        Questions(){
            return this.$store.getters['getQuestionPart'] || []
        },
        partTitle() {
            return this.$store.getters['getPartTitle'] || ''
        },
        questionAmount() {
            if (this.Questions.length == 0) {
                return 0
            }
            let amount = 0;
            for (let index = 0; index < this.Questions.questions.length; index++) {
                const element = this.Questions.questions[index];
                if (element.content_type !== 5) {
                    amount++
                }
            }
            return amount
        },
        partNumber() {
            return this.$store.getters['getPartNumber'] + 1
        },
        examPart() {
            return this.$store.getters['getExamPart'] || []
        }
    },
    created() {
        // this.$store.dispatch('Questions')
        if (this.Questions) {
            if(this.Questions.time_remaining) {
                this.couter = this.Questions.time_remaining
            } else {
                this.couter = this.Questions.time
            }
            this.countDownTimer()
        }
    },
    watch: {
        Questions(value){
            if (value) {
                if(this.Questions.time_remaining) {
                    this.couter = this.Questions.time_remaining
                } else {
                    this.couter = this.Questions.time
                }
                // if (!this.start_timing) {
                //     this.countDownTimer()
                // }
            }
        },
    },
}
</script>
<style scoped>
    .question-lock-list {
        margin-bottom: 30px;
    }
    .button-pg1 {
        top: -30px;
    }
    .box_test{
        /* height: 70vh; */
        background: #fff;
        border-radius: 20px;
        background: url(../assets/bg-box-test.png);
        background-repeat: repeat;
        /* overflow-y: scroll; */
        position: relative;
        padding-bottom: 50px !important;
        padding: 50px 20px;
        box-shadow: 0px 8px 0px #1990ef;
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
    .box_title, .box_time{
        background: #fee138;
        border: 1px solid #025dad;
        border-radius: 15px;
        padding: 5px 15px;
        width: fit-content;
        font-size: 28px;
        color: #025dad;
        font-weight: 700;
    }
    .icon_clock{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    .header-test img, svg {
        vertical-align: unset;
    }
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
    .part-descreption {
        /* border: 1px solid #e0e0e099;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 40px;
        background-color: #fff; */
    }
    .header_question .title_question{
        /* margin-bottom: 20px; */
        /* color: #0057a7; */
        /* font-weight: 600; */
        padding: 0px;
        overflow: hidden;
    }

    @media only screen and (min-width: 1024px)  and (max-width: 1400px){
       /* .page3{
            height: auto;
        } */
    }

    @media only screen and (max-width: 768px){
        /* .page3{
            height: 100vh;
        } */
        .box_test{
            /* height: 70vh !important; */
        }
        .box_title, .box_time {
            font-size: 16px;
            height: 40px;
        }
        .box_test{
            /* height: 350px; */
        }
        .dotted {
            width: 80%;
        }
        .left_header{
            width: 70%;
        }
        .right_header{
            width: 30%;
        }
        .dotted{
            width: 90%;
            background-size: 28%;
        }
        .box_test{
            padding: 20px 15px;
        }
        .part-descreption{
            margin-bottom: 10px;
        }

        .item_answer{
            width: 100% !important;
        }
        .btn.btn-success{
            font-style: 25px;
        }
    }

    @media only screen and (max-width: 400px){
        .box_title {
            width: 100%;
        }

        .left_header{
            width: 100%;
            margin-bottom: 10px;
        }
        .right_header{
            width: 100%;
            justify-content: start !important;
        }
    }
</style>
