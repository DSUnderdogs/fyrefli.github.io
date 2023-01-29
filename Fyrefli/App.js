// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  //  const [optionsfs, setOptionsfs] = useState([{name:'Select',code:0},{name:'File',code:1},{name:'String',code:2}]);
  const [options, setOptions] = useState([{name:'Select',code:0},{name:'Hash',code:1},{name:'Encode',code:2}]);
  const [optionshash, setOptionshash] = useState([{name:'Select',code:0},{name:'md5',code:1},{name:'sha1',code:2},{name:'sha224',code:3},{name:'sha256',code:4},{name:'sha384',code:5},{name:'sha512',code:6},{name:'blake2p',code:7},{name:'blake2s',code:8},{name:'sha3_224',code:9},{name:'sha3_256',code:10},{name:'sha3_384',code:11},{name:'sha3_512',code:12}]);
  const [optionsencode, setOptionsencode] = useState([{name:'Select',code:0},{name:'utf8',code:1},{name:'utf16',code:2},{name:'utf32',code:3},{name:'ibm037',code:4}]);

  const [to, setTo] = useState('en');
  const [hash, setHash] = useState(false);
  const [encode, setEncode] = useState(false);

  const [from, setFrom] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const translate = () => {
    // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
   
    // const params = new URLSearchParams();
    // params.append('q', input);
    // params.append('source', from);
    // params.append('target', to);
    // params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    // axios.post('https://libretranslate.de/translate',params, {
    //   headers: {
    //     'accept': 'application/json',
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // }).then(res=>{
    //   console.log(res.data)
    //   setOutput(res.data.translatedText)
    // })

    var xhr = new XMLHttpRequest();
    xhr.open("POST" , "http://localhost:5000/backend");
    var parms = "";
    if(document.getElementById('typeencode') != null){
      parms = JSON.stringify({
        
        option: document.getElementById('option').value,
        typeencode: document.getElementById('typeencode').value,
        input: input,
      });
    }
    if(document.getElementById('typehash') != null){
      parms = JSON.stringify({
        
        option: document.getElementById('option').value,
        typehash: document.getElementById('typehash').value,
        input: input,
      });
    }
    xhr.setRequestHeader("Origin", "http://localhost:3000")
    
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.setRequestHeader("Content-length", parms.length);
    xhr.setRequestHeader("Connection", "close");

    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200){
        setOutput(JSON.parse(xhr.responseText).output)
      }
    }
    xhr.send(parms);
  };
  <img src='fyrefli_circle.jpeg'></img>
  // useEffect(() => {
  //   axios
  //     .get('https://libretranslate.de/languages', {
  //       headers: { accept: 'application/json' },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setOptions(res.data);
  //     });
  // }, []);
  return (
    <div className="App">
    <div>
    </div>
    <div>
      <textarea
        cols="50"
        rows="8"
        onInput={(e) => setInput(e.target.value)}
      ></textarea>
    </div>
    <select id="option" onClick={(e) =>{
     console.log("clicked",e.target.value)
     if(e.target.value==1){
     console.log("clicked hash")
     setEncode(false)
     
      setHash(true)
     }
     if(e.target.value==2){
      setHash(false)
      setEncode(true)
     console.log("clicked encode")

     }}}>
        {options.map((opt) => (
          
          <option key={opt.code} value={opt.code} onClick={()=>{
            console.log("clicked")
            setEncode(false)
            setHash(true)}}>
            {opt.name}
          </option>
        ))}
      </select>

      {hash && <select id="typehash" onClick={(e) => {
  console.log("clicked hash opt")

  console.log(e.target.value)
  setFrom(e.target.value)}}>
        {optionshash.map((opt) => (
          
          <option key={opt.code} value={opt.name} onClick={()=>setHash(true)}>
            {opt.name}
          </option>
        ))}
      </select>
}
{encode && <select id="typeencode" onClick={(e) => {
  console.log("clicked encode opt")

  console.log(e.target.value)
  setFrom(e.target.value)}}>
        {optionsencode.map((opt) => (
          
          <option key={opt.code} value={opt.name} onClick={()=>setHash(true)}>
            {opt.name}
          </option>
        ))}
      </select>
}
<div>{from}</div>
    <div>
      <textarea cols="50" rows="8" value={output}></textarea>
    </div>
    <div>
      <button onClick={e=>translate()}>Translate</button>
    </div>
  </div>
  );

}

export default App;
