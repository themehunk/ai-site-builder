
import { createRoot, render, createElement,useState } from '@wordpress/element';
import Header from './template/header';
import BuilderIcon from './template/buildericon';
import AiBuilder from './template/aibuilder';
import { Switch } from '@mui/material';

export default function App() {

  const [ builder, setBuilder ] = useState(null);

  const builderHide = (builder_rs) => {
    setBuilder(builder_rs);
  }
    return (
      
      <div className="App">
      <Header/>
      <div className='heading'>
      <h1 >Welcome to ReactPress with React Router!!! hello friends </h1>

      </div>
      <BuilderIcon builderclick = {(builder_rs)=>builderHide(builder_rs)}/>
        <AiBuilder builder = {builder} />
      </div>
    );
  }