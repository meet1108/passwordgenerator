import { useEffect, useRef } from "react";
import { useCallback, useState } from "react"


function App() {
  
  //All UseState
  //for Length 
  const[length,setLength] = useState(8);

  //for Number
  const[numberAllowed,setNumberAllowed] = useState(false);

  //for Charactor
  const[charartorAllowed,setCharactorAllowed] = useState(false);

  //for Password
  const[password,setPassword] = useState("");

  //useRef hook
  const passwordRef =useRef(null);

  //Generate Password  using useCallback hook

  const passwordGenerate = useCallback(() =>{
      //empty Password 
      let pass=""

      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numberAllowed) str += "0123456789"
      if(charartorAllowed) str += "!@#$%^&*()<>?"
      
      // create Rendom Password Indexs
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        //by index get the Charactor and push in the Pass
        pass += str.charAt(char);
  
      }
        setPassword(pass);
    },[length,numberAllowed,charartorAllowed,setPassword]);



    //copy the Password to the cilpboard 

    const copyPasswordToClipboard = useCallback(() => {
      //whenever Password is copy that's time it is selected
      passwordRef.current?.select();
      //we can select the range wise from the text
      passwordRef.current?.setSelectionRange(0, 999);
      //copy to clipboard
      window.navigator.clipboard.writeText(password)
    }, [password])
  

    //whenever any dependency change that's time this hook will be execute and in these hook method will be called
    useEffect(()=>{
      passwordGenerate()
    },[length,numberAllowed,charartorAllowed,passwordGenerate]);


  //These all the UI
  return (
    <>
    {/* Outer Box in Gray Color */}
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500"> 
    
        <h1 className="text-white text-center">Password Generator</h1>
        
        {/* PassWord InputField With Only ReadOnly */}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 "
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          {/* copy Button with Onclick Method */}
          <button  onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
           </div>

            {/*These Box For the select the Length of password and show the Length  */}
              <div className="flex text-sm gap-x-2">
                  <div className="flex items-center gap-x-1">
                    <input type="range"
                    min={6}
                    max={20}
                    value={length}
                    className="cursor-pointer"
                    onChange={(e) => {setLength(e.target.value)}}
                    />
                    <label>Length: {length}</label>
                  </div>

            {/* These Field For the Number is allowed in the Password or not */}
            <div className="flex items-center gap-x-1">
              <input type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={ () => {
                setNumberAllowed((prev) => !prev);            
              }} />
              <label htmlFor="numberInput">Numbers</label>

            </div>  
        
            {/* These Field For the Special charactor is allowed in the Password or not */}
            <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={charartorAllowed}
                  id="characterInput"
                  onChange={() => {
                      setCharactorAllowed((prev) => !prev )
                  }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
        </div>  
      </div>

    </>
  )
}

export default App


