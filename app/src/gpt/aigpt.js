import { useState,useEffect  } from '@wordpress/element';
import axios from 'axios';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardMedia,
    __experimentalText as Text,
    __experimentalHeading as Heading,
  } from '@wordpress/components';

const AiGpt = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [output, setOutput] = useState({title:'Title',desc:'Description',finalword:'Final Word'});
  const apiKey = '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'; // Replace with your actual API key

  const generateText =  async  (idtext,textdata,count) => {
    await axios.post('https://api.openai.com/v1/chat/completions', {
        messages: [{ role: 'user', content: textdata }],
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: count,
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
       // return response.data.choices[0].text;

       if(idtext==='title'){
        setOutput({title:response.data.choices[0].message.content});

       }else if(idtext==='desc'){
        setOutput({desc:response.data.choices[0].message.content});

       }else if(idtext==='finalword'){
        setOutput({finalword:response.data.choices[0].message.content});

       }
        console.log(response.data.choices[0].message.content);

        setOutputText(response.data.choices[0].message.content);

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  useEffect(() => {
   // generateText('title','blutoothe speaker title',25);
    setTimeout(() => {
  //  generateText('desc','blutoothe speaker Description',150);

}, 2000);
}, []);

  return (
    <div>
      <h1>GPT-3 Text Generation</h1>
      <textarea
        placeholder="Enter text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={generateText}>Generate</button>
      <h2>Generated Text:</h2>
      <p>{outputText}</p>



      <Card>
      <CardHeader>
        <Heading level={ 4 }>{output.title}</Heading>
      </CardHeader>

      <CardMedia>
      <img
        alt="Card Media"
        style={{width:'20%'}}
        src="https://wpthemes.themehunk.com/electro-mania/wp-content/uploads/sites/213/2022/01/product27.png"
      />
    </CardMedia>
      <CardBody>
        <Text>{output.desc}</Text>
      </CardBody>
      <CardFooter>
        <Text>{output.finalword} </Text>
      </CardFooter>
    </Card>


    </div>
  );
};

export default AiGpt;
