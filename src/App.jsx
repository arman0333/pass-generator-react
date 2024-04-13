import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");

  const passwordRef = useRef(null);

  const passGenerator = useCallback (
()=>{
  let pass="";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" ;

  if (numberAllowed) str += "0123456789";
  if(charAllowed) str += "!@#$%^&*()+=_-><?/{}[]|~";

  for(let i=1;i<=length;i++){
    let char = Math.floor(Math.random()*str.length+1);
    pass += str.charAt(char);
  }

setPassword(pass);
}
  ,[length,numberAllowed,charAllowed,setPassword ]);


  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);

  },[password])

  // useEffect(()=>{passGenerator()},[length,numberAllowed,charAllowed,setPassword]);
  useEffect(() => {
    passGenerator();
  }, [length, numberAllowed, charAllowed, passGenerator]);

  
  return (
          <>
            <div className='w-full max-w-[50%]  mx-auto shadow-md rounded-lg px-4 my-8 text-gray-500 bg-gray-300 border-4 border-white'>
            <h1 className='text-gray-500 justify-center text-center text-5xl p-6 '>Password Generator</h1>
            <div className='flex shadow-lg overflow-hidden mb-4 py-10 w-full gap-10 '>
              <input
               type="text"
                value={password}
                className='outline-none w-[50%] py-2 px-3 rounded-md ml-10 '
                placeholder='password'
                readOnly
                ref={passwordRef}
              />
              <button
              onClick={copyPasswordToClipboard}
              className='outline-none border-4 border-gray-500 rounded-md p-2 text-gray-500 hover:bg-white hover:text-black '>Copy</button>
            </div>

            {/* <div className='flex text-sm gap-x-2 text-xl  p-3 w-[30%]'>
              <div className='flex items-center gap-x-1 mr-15'>
                <input
                type="range"
                min={8}
                max={50}
                value={length}
                className='cursor-pointer w-full'
                onChange={(e)=>{setLength(e.target.value)}}
                 />
                 <label className='text-xl' >length={length}</label>
              </div>
              <div className='flex items-center gap-x-4 ml-15 '>
                <input type="checkbox"
                defaultChecked={numberAllowed}
                
                onClick={()=>{setNumber(!numberAllowed)} }

                 />
                 <label>Numbers</label>
                <input type="checkbox"
                defaultChecked={charAllowed}
                
                onClick={()=>{setNumber(!charAllowed)} }

                 />
                 <label>characters</label>

              </div>
            </div> */}
              <div className='flex text-sm gap-x-2 text-xl p-3 w-full'>
  <div className='flex items-center gap-x-1 mr-15' style={{ width: "50%" }}>
    <input
      type="range"
      min={8}
      max={50}
      value={length}
      className='cursor-pointer w-full'
      style={{ '--range-color': 'black' }}
      onChange={(e)=>{setLength(e.target.value)}}
    />
    <label className='text-xl'>length={length}</label>
  </div>
  <div className='flex items-center gap-x-4 ml-15' style={{ width: "50%" }}>
    <input 
      type="checkbox"
      defaultChecked={numberAllowed}
      // onClick={()=>{setNumber(!numberAllowed)}}
      onChange={() => setNumberAllowed(prev => !prev)}
    />
    <label>Numbers</label>
    <input 
      type="checkbox"
      defaultChecked={charAllowed}
      // onChange={()=>{setNumber(!charAllowed)}}
      onChange={() => setCharAllowed(prev => !prev)}
    />
    <label>Characters</label>
  </div>
</div>

            </div>
          </>
  )
}

export default App
