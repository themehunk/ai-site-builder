
import { createRoot, render, createElement,useState } from '@wordpress/element';
import Header from './template/header';
import BuilderIcon from './template/buildericon';
import AiBuilder from './template/aibuilder';

export default function App() {

  const [ builder, setBuilder ] = useState(null);

  const builderHide = (builder_rs) => {
    setBuilder(builder_rs);
  }
    return (
      
      <div className="App">
      <div className="aisb-app-wrap">
      <Header/>
      <div className='heading'>
      <h1 >Select Template to Build Your Website ! </h1>

      </div>
      <BuilderIcon builderclick = {(builder_rs)=>builderHide(builder_rs)}/>
        <AiBuilder builder = {builder} />

        </div>
      </div>
    );
  }