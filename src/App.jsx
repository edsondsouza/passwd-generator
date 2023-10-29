import { useCallback, useEffect, useState, useRef } from "react";
// import "./App.css";

function App() {
  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "`~!@#$%^&*()_-+={}[]|?/><";

    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); // get index
      pass += str.charAt(char); // get character from index
    }
    setPassword(pass);

  }, [length, numberAllowed, characterAllowed]); // only re-run if these variables change. Talks about optimization in React

  const copypasswordToClipboard = useCallback(() => {
    passwordRef.current?.select() // select password
    passwordRef.current?.setSelectionRange(0,30) // set selection range
    window.navigator.clipboard.writeText(password) // copy password to clipboard
  }, [password])

  useEffect(() => { // run on first render and when length, numberAllowed, or characterAllowed changes
    passwordGenerator();
  },[length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-white mb-5">Password Generator</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={password}
            readOnly
            className="mr-2 p-2 border-2 border-gray-300 rounded"
            ref={passwordRef}
          />
          <button
            onClick={copypasswordToClipboard}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Copy
          </button>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="range"
            min="8"
            max="30"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            // bind to state variable for password length
            className="mr-2"
          />
          <span className="text-white mr-2">Length: {length}</span>
          <label className="mr-2 text-white">
            <input type="checkbox" className="mr-2" defaultChecked={numberAllowed} onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}/>
            Numbers
          </label>
          <label className="text-white">
            <input type="checkbox" className="mr-2" defaultChecked={characterAllowed} onChange={() => {
              setCharacterAllowed((prev) => !prev);
            }}/>
            Characters
          </label>
        </div>
        {/* <button
          className="px-4 py-2 bg-red-500 text-white rounded" onClick={passwordGenerator}
        >
          Generate Password
        </button> */}
      </div>
    </>
  );
}

export default App;
