'use client'

import React, { useState, useRef, useEffect } from 'react';
import { LiaRobotSolid } from 'react-icons/lia';
import { FaUserAstronaut } from 'react-icons/fa6';
import { IoSendSharp } from 'react-icons/io5';

// Assuming your JSON data is imported as questionsData
import questionsData from './data.json';

export default function ChatBot() {
    const [chatHistory, setChatHistory] = useState([
        { type: 'bot', message: 'Hello! Feel Free To Ask Anything!' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const chatHistoryRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the chat history when chat history changes
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
            // Find the question in the JSON data
            const question = questionsData.find(item =>
                item.Questions.toLowerCase() === message.toLowerCase()
            );

            // Set the bot's response based on the question, or a default response
            const botResponse = question ? question.Answers : "Sorry, I couldn't understand your question.";

            setChatHistory(prevHistory => ([
                ...prevHistory,
                { type: 'bot', message: botResponse }
            ]));
        }, 1000);

        setSuggestions([]); // Clear suggestions when a suggestion is clicked
    };

    const handleInputChange = (e) => {
        const inputText = e.target.value;
        setUserInput(inputText);

        if (inputText === '') {
            setSuggestions([]); // Clear suggestions when input is empty
            return;
        }

        // Filter relevant questions based on user input
        const filteredQuestions = questionsData.filter(question =>
            question.Questions.toLowerCase().includes(inputText.toLowerCase())
        );

        // Limit suggestions to a maximum of 3 questions
        setSuggestions(filteredQuestions.slice(0, 3));
    };

    return (
        <div className='m-5'>
            <div className='justify-center flex items-center flex-col'>
                <div id="Chat-Containar" className='rounded-t-lg shadow-md w-96 h-3/6 pb-1 flex flex-col overflow-hidden'>
                    <div className='justify-center flex items-center h-14 w-auto bg-[#248991] rounded-t-lg'>
                        <p className='text-center text-xl text-white font-bold'>Chatbot</p>
                    </div>
                    <div id='Chat-history' ref={chatHistoryRef} className="flex-grow overflow-y-auto h-80 scrollbar-thin scrollbar-thumb-[#248991] scrollbar-track-[#E5E7EB] scrollbar-thumb-rounded-full scrollbar-track-rounded-full rounded-lg " style={{ overflowX: 'hidden' }}>
                        {chatHistory.map((chat, index) => (
                            <div
                                key={index}
                                className={`flex justify-center items-center m-2 gap-2 h-auto p-2 ${chat.type === 'bot' ? 'flex-row' : 'flex-row-reverse'
                                    }`}
                            >
                                {chat.type === 'bot' ? (
                                    <>
                                        <LiaRobotSolid style={{ fontSize: '30px', color: '#248991' }} />
                                        <div id='bot-div' className={`bg-[#248991] p-2 h-auto w-[85%] rounded-t-lg rounded-r-lg`}>
                                            <p className='text-left text-white text-[13px]'>{chat.message}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <FaUserAstronaut style={{ fontSize: '30px', color: '#248991' }} />
                                        <div id='user-div' className={`bg-[#F2F2F2] p-2 h-fit w-[85%] rounded-t-lg rounded-l-lg`}>
                                            <p className='text-right text-[#248991] h-fit text-[13px]'>{chat.message}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div id="input-section" className='justify-center flex flex-col items-center shadow-inner'>
                        <div id='Suggestion' className='m-2 cursor-pointer text-white text-[12px]'> 
                            {suggestions.map((question, index) => (
                                <p key={index} className='p-1 bg-[#248991] mt-1 rounded-lg' onClick={() => handleSend(question.Questions)}>{question.Questions}</p>
                            ))}
                        </div>
                        <div className='flex rounded-lg justify-center items-center gap-2 border-[2px] mt-1.5 border-[#248991] w-full mr-1 ml-1 pe-1 pl-1'>
                            <input
                                className='outline-none px-1 py-1 w-[90%]'
                                placeholder="Enter Text!"
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
