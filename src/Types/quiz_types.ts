import React from 'react'

export type QuizType = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

export type QuestionType = {
    question: string
    answer: string
    option: string[]
    correct_answer: string
}

export type QuestionPropsType = {
    question: string
    options: string[]
    callback: (e: React.FormEvent<EventTarget>, ans:string) => void

}