'use client'

import { useState } from "react"

export default function DataAdder() {
const [Question,setQuestion] = useState('')
const [Answers,setAnswers] = useState('')
const [message,setmessage] = useState('')



function SendData(){
    console.log([
        {
            "Question":Question,
            "Answers":Answers
        }
    ])
    setQuestion('')
    setAnswers('')
    setmessage('Data Submitted!')

    function resetmessage() {
        timeout = setTimeout(emptymessage, 3000);
      }

      function emptymessage(){
        setmessage('')
      }


}

    return (
        <main>
            <div className='w-[70%] h-auto ml-auto justify-center flex flex-col items-center mr-auto py-5  bg-slate-600'>
                <p className='text-white text-center text-2xl'>Insert Data</p>
                <div id="input-Questions" className='mt-5'>
                    <input className='px-1 py-1 outline-none w-full' onChange={(e)=>setQuestion(e.target.value)} value={Question} placeholder="Enter Question" type="text"/>
                </div>
                <div id="input-Answer" className='mt-5'>
                <input className='px-1 py-1 outline-none' onChange={(e)=>setAnswers(e.target.value)} value={Answers} placeholder="Enter Answer" type="text"/>
                </div>
                <div className='mt-5 flex justify-center items-center gap-5'>
                    <button onClick={SendData} className='bg-white px-2 py-1 rounded-lg'>
                        Submit
                    </button>
                    <p className='text-center text-white'>{message}</p>
                </div>
            </div>

        </main>
    )
}