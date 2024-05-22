'use client'
import React, { useState, useRef, useEffect } from 'react';
import { FaUserAstronaut } from 'react-icons/fa6';
import { IoSendSharp } from 'react-icons/io5';
import Image from 'next/image';
import { LiaLanguageSolid } from "react-icons/lia";

import Englishdata from '../../../data.json';
import HindiData from '../../../Hindidata.json';

export default function ChatBot() {
    const [chatHistory, setChatHistory] = useState([
        { type: 'bot', message: 'Hello! Feel Free To Ask Anything!' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const chatHistoryRef = useRef(null);
    const inputRef = useRef(null);
    const [Translation, setTranslation] = useState('English');
    const [data, setdata] = useState(Englishdata);



    function HandleLanguage() {
        if (data === Englishdata) {
            setTranslation('Hindi');
            setdata(HindiData);
        } else {
            setTranslation('English');
            setdata(Englishdata);
        }
    }

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSend = (message) => {
        setUserInput(message);
        setUserInput('');
        setChatHistory([
            ...chatHistory,
            { type: 'user', message }
        ]);
        setTimeout(() => {
            const question = data.find(item =>
                item.Questions.toLowerCase() === message.toLowerCase()
            );

            const botResponse = question ? question.Answers : "<p><strong>For More Details! Contact To Your Customer Support Here: <a href=\"tel:+917015462356\">Vineet</a></strong></p>";

            setChatHistory(prevHistory => ([
                ...prevHistory,
                { type: 'bot', message: botResponse }
            ]));
        }, 1000);

        setSuggestions([]);
        let input_section = document.getElementById('input-section');
        if (input_section.style.background = 'white') {
            input_section.style.background = '#248991';
        } else {
            input_section.style.background = '#248991';
        }

    };

    const handleInputChange = (e) => {
        const inputText = e.target.value;
        setUserInput(inputText);
        let input_section = document.getElementById('input-section');
        input_section.style.background = 'white';

        if (inputText === '') {
            setSuggestions([]);
            input_section.style.background = '#248991';
            return;
        }

        if (Translation === 'English') {
            const filteredQuestions = data.filter(question =>
                question.Questions.toLowerCase().includes(inputText.toLowerCase()) ||
                question.tags.toLowerCase().includes(inputText.toLowerCase())
            );

            setSuggestions(filteredQuestions.map(question => question.Questions));
        } else {
            const filteredQuestions = data.filter(question =>
                question.Questions.includes(inputText) ||
                question.tags.includes(inputText)
            );

            setSuggestions(filteredQuestions.map(question => question.Questions));
        }
    };

    return (
        <div >
            <div className='justify-center flex items-center flex-col'>
                <div id="Chat-Containar" className={'rounded-lg border-2 border-[#248991] shadow-md sm:w-72 w-[100%] md:w-[50%] lg:w-[50%] h-[92vh] lg:h-[100vh] flex flex-col overflow-hidden' }>
                    <div id='Header' className='justify-center flex items-center min-h-14 w-auto bg-[#248991]'>
                        <p className='text-center text-xl w-[80%] text-white font-bold'>ArtMitra Helpdesk</p>
                        <div className='w-[50%] flex justify-center mr-2 ml-2'>
                            <button id='translatebtn' onClick={HandleLanguage} className='bg-[#248991] text-white px-2 py-0.5 border-[2px] flex items-center gap-2'><LiaLanguageSolid style={{ fontSize: '18px' }} />
                                {Translation}</button>
                        </div>
                    </div>
                    <div id='Chat-history' ref={chatHistoryRef} className="bg-white flex-grow overflow-y-auto h-auto scrollbar-thin scrollbar-thumb-[#248991] scrollbar-track-[#E5E7EB] scrollbar-thumb-rounded-full scrollbar-track-rounded-full" style={{ overflowX: 'hidden' }}>
                        {chatHistory.map((chat, index) => (
                            <div
                                key={index}
                                className={`flex justify-center items-center m-2 gap-2 h-auto p-2' ${chat.type === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                {chat.type === 'bot' ? (
                                    <>
                                        <Image
                                            className='h-10 w-10'
                                            src="/bot-logo.png"
                                            width={500}
                                            height={500}
                                            alt="Picture of the author"
                                        />
                                        <div id='bot-div' className={'bg-[#248991] p-2 h-auto w-[85%] rounded-t-lg rounded-r-lg'}>
                                            <p className='text-left text-white text-[13px]' dangerouslySetInnerHTML={{ __html: chat.message }}></p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <FaUserAstronaut style={{ fontSize: '30px', color: '#248991' }} />
                                        <div id='user-div' className={'bg-[#F2F2F2] p-2 h-fit w-[85%] rounded-t-lg rounded-l-lg'}>
                                            <p className='text-right text-[#248991] h-fit text-[13px]'>{chat.message}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div id="input-section" style={{ background: '#248991' }} className=' bg-white justify-center flex flex-col items-center border-t-2 border-[#248991] bottom-0 left-0 right-0'>
                        <div id='Suggestion' className='m-2  text-white text-[12px] overflow-y-auto max-h-[150px] flex-grow scrollbar-thin scrollbar-thumb-[#248991] scrollbar-track-[#E5E7EB] scrollbar-thumb-rounded-full scrollbar-track-rounded-full rounded-lg'>
                            {suggestions.map((suggestion, index) => (
                                <p key={index} className='p-1 cursor-pointer bg-[#248991] mt-1 mr-1 rounded-lg' onClick={() => handleSend(suggestion)}>{suggestion}</p>
                            ))}
                        </div>
                        <div className='flex rounded-md bg-white justify-center items-center gap-2 border-[2px] mt-1.5 border-[#248991] w-full mr-1  ml-1 pr-1 lg:pr-0 pl-1'>
                            <input
                                ref={inputRef}
                                className='outline-none px-1 py-1 w-[90%]'
                                placeholder={'Enter query'}
                                type="text"
                                value={userInput}
                                onChange={handleInputChange}
                                
                            />
                            <button id="sendbtn" onClick={() => handleSend(userInput)}><IoSendSharp style={{ fontSize: '20px', color: '#248991' }} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}