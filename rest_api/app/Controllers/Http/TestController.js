'use strict'
const Database = use('Database');
const axios = use('axios');
const querystring = require('querystring');

class TestController {
    async runjob({ request, response }) {
        const list = await Database.table('test_history')
        .select('test_data', 'id')

        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            const data = JSON.parse(list[index].test_data);

            await Database.table('test_history')
            .where('id', element.id)
            .update({
                exam_id: data.id
            })

            console.log(index)
        }
        return response.json({
            message: 'Done !'
        })
    }
    async deleteExamPart({ request, response }) {
        const { id } = request.all()

        if (id) {
            // Delete answer
            // await Database.raw('delete answers from `exam_part` inner join `questions` on `questions`.`exam_part` = `exam_part`.`id` inner join `answers` on `answers`.`question_id` = `questions`.`id` where `questions`.`exam_part` = ' + id)
            await Database.raw('delete questions from `exam_part` inner join `questions` on `questions`.`exam_part` = `exam_part`.`id` where `questions`.`exam_part` = ' + id)
            await Database.raw('delete exam_part from `exam_part` where `id` = ' + id)
            
            return response.json({
                code: 1,
                msg: 'Thành công !'
            })
        }

        return response.json({
            code: 0,
            msg: 'Thiếu dữ liệu !'
        })
    }

    async createExamPart({ request, response }) {
        const { exam_id, name, description, status, time, part_type } = request.all()

        if (exam_id && name) {
            const exampPart = await Database.table('exam_part')
            .insert({
                name,
                exam_id,
                description,
                status,
                time,
                part_type,
            })

            return response.json({
                code: 1,
                data: {
                    id: exampPart[0],
                    exam_id,
                    name,
                    description,
                    time,
                    status,
                    questions: [],
                    part_type
                }
            })
        }

        return response.json({
            code: 0,
            msg: 'Thiếu dữ liệu !'
        })
    }

    async editExamPart({ request, response }) {
        const { id, name, description, status, time, part_type } = request.all()

        if (id && name) {
            const exampPart = await Database.table('exam_part')
            .where('id', id)
            .update({
                name,
                description,
                status,
                time,
                part_type
            })

            return response.json({
                code: 1,
                data: {
                    id,
                    name,
                    description,
                    time,
                    status,
                    part_type
                }
            })
        }

        return response.json({
            code: 0,
            msg: 'Thiếu dữ liệu !'
        })
    }

    async createExam({ request, response}) {
        const { name, description, level, status } = request.all()

        if (name) {
            const examId = await Database.table('exam')
            .insert({
                name,
                description,
                level,
                status
            })

            return response.json({
                code: 1,
                data: {
                    id: examId[0],
                    name,
                    description,
                    level,
                    status
                }
            })
        }

        return response.json({
            code: 0,
            msg: 'Thiếu dữ liệu !'
        })
    }

    async editExam({ request, response}) {
        const { id, name, description, level, status } = request.all()

        if (id && name) {
            const examId = await Database.table('exam')
            .where('id', id)
            .update({
                name,
                description,
                level,
                status
            })

            return response.json({
                code: 1,
                data: {
                    id,
                    name,
                    description,
                    level,
                    status
                }
            })
        }

        return response.json({
            code: 0,
            msg: 'Thiếu dữ liệu !'
        })
    }

    async getExamPart({ request, response }) {
        const { id } = request.all()

        if (id) {
            
            let examPart = await Database.table('exam_part')
            .where('exam_id', id)

            const questions = await Database.table('questions')
            .where('exam_id', id)
            .orderBy('position', 'esc')

            let questionId = []
            for (let index = 0; index < questions.length; index++) {
                questionId.push(questions[index].id)
            }

            // let answers = {}
            // if (questionId.length) {
            //     answers = await Database.table('answers')
            //     .whereIn('question_id', questionId)
            // }

            for (let index = 0; index < examPart.length; index++) {
                let questionPart = questions.filter(qs => qs.exam_part == examPart[index].id)
                
                // Add answer to question
                if (questionPart.length) {
                    for (let index = 0; index < questionPart.length; index++) {
                        questionPart[index].option = JSON.parse(questionPart[index].option_data)
                    }
                    if (!examPart[index].questions) {
                        examPart[index].questions = []
                    }
                    examPart[index].questions = questionPart
                } else {
                    examPart[index].questions = []
                }
            }

            return response.json({
                code: 1,
                data: examPart
            })
        }

        return response.json({
            code: 0,
            msg: 'Thiếu dữ liệu !'
        })
    }

    async getExamAdmin({ request, response }) {
        const { id } = request.all()

        const examList = Database.table('exam')

        if (id) {
            examList.where('id', id)
            .first()
        }

        return response.json({
            code: 1,
            data: await examList
        })
    }

    async deleteExam({ request, response}) {
        const { id } = request.all()

        if (id) {
            await Database.table('exam')
            .where('id', id)
            .delete()

            return response.json({
                code: 1,
                data: id
            })
        }

        return response.json({
            code: 0,
            msg: 'Thiếu dữ liệu !'
        })
    }

    async getHistory({ request, response }) {
        const {trackid} = request.all()
        if (trackid) {
            const history = await Database.table('test_history')
            .where('tracking_id', trackid)
            .where('status', 0)
            .first()

            if (history) {
                let exam = JSON.parse(history.data)

                if (exam) {
                    const questionsData = await Database.table('questions')
                    .where('exam_id', exam.id)

                    for (let index = 0; index < exam.part.length; index++) {
                        for (let index2 = 0; index2 < exam.part[index].questions.length; index2++) {
                            const question = questionsData.filter(qs => qs.id === exam.part[index].questions[index2].id)
                            if (question.length) {
                                exam.part[index].questions[index2].content = question[0].content;
                            }
                        }
                    }
                }
                
                // for (let index = 0; index < dataHistory.data.length; index++) {
                //     const element = dataHistory.data[index];
                //     questIdArr.push(element.question_id)
                // }

                // // Get list question
                // const questions = await Database.table('questions')
                // .leftJoin('answers', 'questions.id', 'answers.question_id')
                // .select('questions.id', 'questions.content_type', 'questions.content', 'answers.id as answer_id', 'answers.content as answer_content', 'answers.question_id')
                // .whereIn('questions.id', questIdArr)
                // .orderBy('questions.position', 'asc')

                // let dataOutput = []
                // if (questions) {
                //     questions.forEach(element => {
                //         const index = dataOutput.findIndex(data => { return data.id === element.id})

                //         if (index == -1) {
                //             const answerTemp = questions.filter(question => question.id == element.question_id)
                //             let answerOfQuest = []
                //             for (let index = 0; index < answerTemp.length; index++) {
                //                 const element = answerTemp[index];
                //                 answerOfQuest.push({
                //                     value: element.answer_id,
                //                     text: element.answer_content
                //                 })
                //             }
                            
                //             const questionHis = dataHistory.data.filter(data => { return data.question_id === element.id})
                //             dataOutput.push({
                //                 id: element.id,
                //                 question: element.content,
                //                 option: answerOfQuest,
                //                 answer: questionHis.length > 0 ? questionHis[0].answer : []
                //             })
                //         }
                        
                //     });
                // }

                return response.json({
                    code: 1,
                    data: exam
                })

            } else {
                return response.json({
                    code: 2,
                    msg: 'Không tìm thấy kết quả hoặc kết quả bài làm đang được xử lý !'
                })
            }
        }

        return response.json({
            code: 0,
            msg: 'Không tìm thấy tracking id'
        })
    }

    async getResult({ request, response }) {
        const {trackid} = request.all()
        if (trackid) {
            const history = await Database.table('test_history')
            .where('tracking_id', trackid)
            .where('status', 1)
            .orderBy('created_at', 'desc')
            .first()

            if (history) {
                const dataHistory = JSON.parse(history.data)
                
                // let questIdArr = []

                // for (let index = 0; index < dataHistory.data.length; index++) {
                //     const element = dataHistory.data[index];
                //     questIdArr.push(element.question_id)
                // }

                // // Get list question
                // const questions = await Database.table('questions')
                // .leftJoin('answers', 'questions.id', 'answers.question_id')
                // .select('questions.id', 'questions.content_type', 'questions.content', 'answers.id as answer_id', 'answers.content as answer_content', 'answers.question_id')
                // .whereIn('questions.id', questIdArr)
                // .orderBy('questions.position', 'asc')

                // let dataOutput = []
                // if (questions) {
                //     questions.forEach(element => {
                //         const index = dataOutput.findIndex(data => { return data.id === element.id})

                //         if (index == -1) {
                //             const answerTemp = questions.filter(question => question.id == element.question_id)
                //             let answerOfQuest = []
                //             for (let index = 0; index < answerTemp.length; index++) {
                //                 const element = answerTemp[index];
                //                 answerOfQuest.push({
                //                     value: element.answer_id,
                //                     text: element.answer_content
                //                 })
                //             }
                            
                //             dataOutput.push({
                //                 id: element.id,
                //                 question: element.content,
                //                 option: answerOfQuest,
                //             })
                //         }
                        
                //     });
                // }

                return response.json({
                    code: 1,
                    data: dataHistory
                })

            } else {
                return response.json({
                    code: 2,
                    msg: 'Không tìm thấy kết quả hoặc kết quả bài làm đang được xử lý !'
                })
            }
        }

        return response.json({
            code: 0,
            msg: 'Không tìm thấy tracking id'
        })
    }

    async submit({ request, response }) {
        const {trackid, time, confirm_phone} = request.all()

        if (trackid) {

            const tracking = await Database.table('tracking')
            .where('tracking_hash', trackid)
            .first()
            
            if(tracking) {

                // Get history
                const history = await Database.table('test_history')
                .where('tracking_id', tracking.id)
                .where('status', 0)
                .first()

                if (history) {

                    let exam = JSON.parse(history.test_data)
    
                    if (exam) {
    
                        const questionsData = await Database.table('questions')
                        .where('exam_id', exam.id)
                        
                        for (let index = 0; index < exam.part.length; index++) {
                            if (exam.part[index].part_type == 0) {
                                for (let index2 = 0; index2 < exam.part[index].questions.length; index2++) {
                                    if (exam.part[index].questions[index2].content_type != 5) {
                                        const question = questionsData.filter(qs => qs.id == exam.part[index].questions[index2].id)
                                        if (question.length != 0) {
                                            const optionData = JSON.parse(question[0].option_data)
                                            exam.part[index].questions[index2].option_data = optionData
                                        }
                                    }
                                }
                            }
                        }
    
                        // Save
                        await Database.table('test_history')
                        .where('id', history.id)
                        .update({
                            time,
                            confirm_phone,
                            test_result: JSON.stringify(exam),
                            status: 1,
                        })

                        const userInfo = await Database.table('contact')
                        .where('id', tracking.contact_id)
                        .first()

                        // send mail 
                        try {
                            await axios.post('https://hocmai.vn/cron/sendsms/send-mail-speakup-test/', 
                            querystring.stringify({
                                key: 'e9b17561cec698a089d2178056cd4d4c',
                                email: userInfo.email
                            }), {
                                headers: { 
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }
                            }).then(function(response) {
                                console.log(response);
                            });
                        } catch (error) {
                            console.log(error.message)
                        }
    
                        return response.json({
                            code: 1,
                            msg: 'success',
                        })
                    }
                }
            }
        }

        return response.json({
            code: 0,
            msg: 'Chưa làm bài',
        })
    }

    async updatePosition({ request, response}) {
        const {part_id, question_position} = request.all()

        if (question_position) {
            for (let index = 0; index < question_position.length; index++) {
                await Database.table('questions')
                .where('id', question_position[index])
                .update({
                    position: index
                })
            }

            return response.json({
                code: 1,
                msg: 'Thành công',
            })
        }

        return response.json({
            code: 0,
            msg: 'Thiếu dữ liệu',
        })
    }

    async saveTest ({ request, response }) {
        const { trackid, test_data, time, confirm_phone } = request.all()

        // Get history
        const tracking = await Database.table('tracking')
        .where('tracking_hash', trackid)
        .first()


        if (tracking && test_data) {
            const history = await Database.table('test_history')
            .where('tracking_id', tracking.id)
            .where('status', 0)
            .first()

            if (history) {
                await Database.table('test_history')
                .where('id', history.id)
                .update({
                    test_data: JSON.stringify(test_data),
                    time: JSON.stringify(time),
                    confirm_phone: confirm_phone,
                    exam_id: test_data.id
                })
            } else {
                await Database.table('test_history')
                .insert({
                    tracking_id: tracking.id,
                    contact_id: tracking.contact_id,
                    test_data: JSON.stringify(test_data),
                    time: JSON.stringify(time),
                    confirm_phone: confirm_phone,
                    exam_id: test_data.id
                })
            }
        }


        return response.json({
            code: 1,
            msg: 'success'
        })
    }

    async getTestDetail({request, response}) {
        const { id } = request.all()

        let testDetail = await Database.table('test_history')
        .where('id', id)
        .select('id', 'confirm_phone', 'created_at', 'updated_at', 'test_result', 'time', 'contact_id')
        .first();

        if (testDetail) {
            testDetail.test_result = JSON.parse(testDetail.test_result)
            testDetail.time = JSON.parse(testDetail.time)

            const userInfo = await Database.table('contact')
            .where('id', testDetail.contact_id)
            .first()

            return response.json({
                code: 1,
                data: {
                    userInfo: userInfo,
                    testData: testDetail
                }
            })
        } else {
            return response.json({
                code: 0,
                data: [],
                message: 'Không tìm thấy bài test'
            })
        }
    }

    async getTestHistory ({request, response}) {
        let { page, start, end, phone, email } = request.all()

        if (!page) {page = 1}
        const limit = 50;

        
        let testList = Database.table('test_history')
        .leftJoin('contact', 'test_history.contact_id', 'contact.id')
        .join('exam', 'exam.id', 'test_history.exam_id')
        .select('contact.id as contact_id', 'contact.name', 'contact.phone', 'exam.level as learned', 'contact.age', 'contact.email', 'test_history.created_at', 'test_history.id as test_id')
        .where('test_history.status', 1)
        .orderBy('test_history.created_at', 'desc')

        if (start) {
            testList.where('test_history.created_at', '>', start + ' 00:00:00')
        }

        if (end) {
            testList.where('test_history.created_at', '<', end + ' 23:59:59')
        }

        if (phone) {
            testList.where('contact.phone', phone)
        }

        if (email) {
            testList.where('contact.email', email)
        }

        return response.json({
            code: 1,
            data: await testList.paginate(page, limit)
        })

    }

    async getQuestion ({ request, response }) {

        const { tracking_id } = request.all()
        
        if (tracking_id) {
            try {

                // get Contact info with tracking_id

                const trackingInfo = await Database.table('contact')
                .join('tracking', 'tracking.contact_id', 'contact.id')
                .where('tracking.tracking_hash', tracking_id)
                .first()

                if (!trackingInfo) {
                    return response.json({
                        code: 2,
                        data: 'Chưa có thông tin người dùng'
                    })
                }

                const examData = await Database.table('exam')
                .select('id', 'name', 'description')
                .where('level', trackingInfo.learned)
                .where('exam.status', 1)
                .orderBy(Database.raw('RAND()'))
                .first()

                const examPart = await Database.table('exam_part')
                .where('exam_id', examData.id)
                .select('id', 'name', 'description', 'time', 'exam_id', 'part_type')
                .where('status', 1)

                const questionData = await Database.table('questions')
                .select('id', 'content_type', 'content', 'exam_part', 'option_data')
                .where('status', 1)
                .where('exam_id', examData.id)
                .orderBy('position', 'asc')

                let exam = examData;
                exam.part = examPart

                for (let index = 0; index < exam.part.length; index++) {

                    // Lay cau hoi cua part
                    const questOfPart = questionData.filter(question => question.exam_part == exam.part[index].id)

                    // Add dap an vao cau hoi
                    for (let index1 = 0; index1 < questOfPart.length; index1++) {
                        if (questOfPart[index1].content_type == 3) {
                            questOfPart[index1].option_data = null
                        } else {
                            const optionParse = JSON.parse(questOfPart[index1].option_data)
                            questOfPart[index1].number_answers = optionParse.filter(option => option.right_answer == true || option.right_answer == 'true').length
                            optionParse.map(option => { delete option.right_answer })
                            questOfPart[index1].option_data = optionParse
                        }
                        questOfPart[index1].answers = []
                    }
                    
                    exam.part[index].questions = questOfPart
                    
                }

                return response.json({
                    code: 1,
                    data: exam
                })

            } catch (error) {
                return response.json({
                    code: 0,
                    data: error.message
                })
            }
        }
        

        return response.json({
            code: 0,
            data: 'Có lỗi xảy ra !'
        })
    }

    async getQuestionAdmin ({ request, response }) {
        const questions = await Database.table('questions')
        .leftJoin('answers', 'questions.id', 'answers.question_id')
        .select('questions.id', 'questions.content_type', 'questions.content', 'questions.status', 'answers.id as answer_id', 'answers.content as answer_content', 'answers.question_id', 'answers.right_answer')
        .orderBy('questions.position', 'asc')

        let dataOutput = []
        if (questions) {
            for (let index = 0; index < questions.length; index++) {
                const element = questions[index];
                const indexQA = dataOutput.findIndex(data => { return data.id === element.id})

                if (indexQA == -1) {
                    const answerTemp = questions.filter(question => question.id == element.question_id)
                    let answerOfQuest = []
                    for (let index2 = 0; index2 < answerTemp.length; index2++) {
                        const element = answerTemp[index2];
                        answerOfQuest.push({
                            value: element.answer_id,
                            text: element.answer_content,
                            right_answer: element.right_answer
                        })
                    }
                    
                    dataOutput.push({
                        id: parseInt(element.id),
                        question: element.content.toString(),
                        option: answerOfQuest,
                        status: element.status,
                        content_type: element.content_type
                    })
                }
            }
        }

        return response.json({
            code: 1,
            data: dataOutput
        })
    }

    async deleteQuestion ({ request, response }) {
        let { id } = request.all()

        if (id) {
            // remove question
            await Database.table('questions')
            .where('id', id)
            .delete()

            return response.json({
                code: 1,
                msg: 'success'
            })
        }
        return response.json({
            code: 0,
            msg: 'failure'
        })
    }

    async editQuestion ({ request, response }) {
        let { content, option, id, content_type, position } = request.all()

        try {
            if (id) {
               
                if (content_type == 3) {
                    option = []
                    let contentTemp = content
                    while (true) {
                        const startIndex = contentTemp.indexOf('${')
                        const endIndex = contentTemp.indexOf('}')
    
                        if (startIndex == -1) {
                            break
                        }
                        const answer = contentTemp.substr(startIndex + 2, endIndex - startIndex - 2)
                        option.push({
                            content: contentTemp.substr(startIndex + 2, endIndex - startIndex - 2)
                        })
                        contentTemp = contentTemp.substr(endIndex + 1, contentTemp.length - endIndex)
                        content = content.replace('{' + answer + '}', '')
                    }
                }

                // Update Question 
                await Database.table('questions')
                .where('id', id)
                .update({
                    content: content,
                    content_type: content_type,
                    position: position,
                    option_data: JSON.stringify(option)
                })
                
                return response.json({
                    code: 1,
                    msg: 'success',
                    data: {
                        id: id,
                        question: content,
                        option: option,
                        content_type,
                        position
                    }
                }) 
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addQuestion ({ request, response }) {
        let { content, option, exam_part, exam_id, content_type } = request.all()
        
        try {
            // neu content_type === 3 thi tach dap an tu content
            if (content_type == 3) {
                option = []
                let contentTemp = content
                while (true) {
                    const startIndex = contentTemp.indexOf('${')
                    const endIndex = contentTemp.indexOf('}')

                    if (startIndex == -1) {
                        break
                    }
                    const answer = contentTemp.substr(startIndex + 2, endIndex - startIndex - 2)
                    option.push({
                        content: contentTemp.substr(startIndex + 2, endIndex - startIndex - 2)
                    })
                    contentTemp = contentTemp.substr(endIndex + 1, contentTemp.length - endIndex)
                    content = content.replace('{' + answer + '}', '')
                }
            }

            let answerId = '';
            // Add question
            const questionId = await Database.table('questions')
            .insert({
                content: content,
                content_type: content_type,
                position: 0,
                exam_part,
                exam_id,
                option_data: JSON.stringify(option)
            })

            return response.json({
                code: 1,
                msg: 'success',
                data: {
                    id: questionId[0],
                    question: content,
                    option: option,
                    status: 1,
                    content_type
                }
            }) 

        } catch (error) {
            console.log(error)
        }

        return response.json({
            code: 0,
            msg: 'failure',
        })
    }
}

module.exports = TestController
