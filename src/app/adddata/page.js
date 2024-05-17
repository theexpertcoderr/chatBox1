'use client'

import { useState } from "react"

export default function DataAdder() {
    const [Question, setQuestion] = useState('')
    const [Answers, setAnswers] = useState('')
    const [message, setmessage] = useState('')



    function SendData() {
        let Preview = document.getElementById('data-preview')
        Preview.style.display = 'block'
        const postData = JSON.stringify({
            "Question": Question,
            "Answers": Answers
        });

        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: postData
        })
            .then(response => response.json())
            .then(data => {

                setmessage('Data Submitted!');

                let textdisplay = document.getElementById('messagetext')
                textdisplay.style.display = "block"
                setTimeout(function () {
                    textdisplay.style.display = "none"
                    setQuestion('');
                    setAnswers('');
                    Preview.style.display = 'none'
                }, 5000);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }



    return (
        <main>
            <div className='w-[70%] h-auto ml-auto justify-center flex flex-col items-center mr-auto py-5  bg-slate-600'>
                <p className='text-white text-center text-2xl'>Insert Data</p>
                <div id="input-Questions" className='mt-5'>
                    <input className='px-1 py-1 outline-none w-full' onChange={(e) => setQuestion(e.target.value)} value={Question} placeholder="Enter Question" type="text" />
                </div>
                <div id="input-Answer" className='mt-5'>
                    <input className='px-1 py-1 outline-none' onChange={(e) => setAnswers(e.target.value)} value={Answers} placeholder="Enter Answer" type="text" />
                </div>
                <div className='mt-5 flex justify-center items-center gap-5'>
                    <button onClick={SendData} className='bg-white px-2 py-1 rounded-lg'>
                        Submit
                    </button>
                    <p id="messagetext" style={{ display: 'none' }} className='text-center text-white'>{message}</p>
                </div>
            </div>
            <div id="data-preview" style={{ display: 'none' }} className='w-[70%] border-t-2 h-auto ml-auto justify-center flex flex-col items-center mr-auto py-5 px-5  bg-slate-600'>
                <div><p className='text-white text-2xl'>Preview</p></div>
                <div className='text-white'>
                    <p>Question: {Question}</p>
                    <p>Answer: {Answers}</p>
                </div>
            </div>

        </main>
    )
}