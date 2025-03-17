import { useState, useCallback, useRef } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [length, setLength] = useState(6);
  const [isNumberAllowed, setNumberAllowed] = useState(false);
  const [isCharAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  useEffect(() => {
    generatePassword();
  },[length, isCharAllowed, isNumberAllowed]);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(isNumberAllowed) {
      str += "1234567890";
    }

    if(isCharAllowed) {
      str += "~!@#$%^&*()_+{};'?/><|"
    }

    for (let index = 1; index <= length; index++) {
      const _index = Math.floor((Math.random() * str.length) + 1);
      pass += str.charAt(_index);
    }

    setPassword(pass);
  }, [length, isNumberAllowed, isCharAllowed, setPassword]);


  const copyPasswordToClipboard = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }

  return (
    <div className='bg-gray-400 mx-auto mt-80 max-w-lg w-full flex-col justify-center rounded-sm px-5 py-3'>
      <div className="text-2xl font-medium text-center mt-2 mb-4">
        Pasword Generator
      </div>

      <div className="w-full flex mb-2">
        <input
          value={password}
          type="text"
          readOnly={true}
          ref={passwordRef}
          className='bg-amber-100 w-full rounded-l-sm outline-none px-2'
        />
        <button
          onClick={copyPasswordToClipboard}
          className='cursor-pointer bg-blue-600 px-3 py-2 rounded-r-sm text-white font-medium'
        >
          copy
        </button>

      </div>

      <div className="flex justify-between text-blue-950">
        <div className='flex gap-1 items-center'>
          <input
            className='cursor-pointer'
            value={length}
            onChange={(e) => {
              setLength(e.target.value)
            }} 
            max={25}
            type="range"
            name="range" 
          />
          <label htmlFor="range">Length: {length}</label>
        </div>

        <div className='flex gap-1 items-center'>
          <input 
            type="checkbox"
            className='cursor-pointer'
            onChange={() => {
              setNumberAllowed((prev) => {
                return !prev;
              })
            }}
            value={isNumberAllowed}
            name='check1'
          />
          <label htmlFor="check1">Numbers</label>
        </div>      
        
        <div className='flex gap-1 items-center'>
          <input 
            type="checkbox"
            className='cursor-pointer'
            onChange={() => {
              setCharAllowed((prev) => {
                return !prev;
              })
            }}
            value={isCharAllowed}
            name='check2'
          />
          <label htmlFor="check2">Special Characters</label>
        </div>
      </div>

    </div>
  )
}

export default App;
