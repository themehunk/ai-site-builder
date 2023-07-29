import { useState  } from '@wordpress/element';


export default function BuilderIcon(props) {

  const [ bulderType, setbulderType ] = useState(null);

    const handelIconClick =(type)=>{
      props.builderclick(type);
      setbulderType(type);
    }

    return (<div className="aisb-builder-icon">
        <div className={`column-icon ${bulderType=='elementor'?'active':'icon'}`} id="elementor" onClick={()=>handelIconClick('elementor')}>
        <img src="https://themehunk.com/wp-content/uploads/icon/elementor.svg" alt="Image 1" />
        <div className="image-text-builder-icon">Elementor</div>
        </div>
      
        <div className={`column-icon ${bulderType=='gutenberg'?'active':'icon'}`} id="gutenberg" onClick={()=>handelIconClick('gutenberg')}>
        <img src="https://themehunk.com/wp-content/uploads/icon/gutenberg.svg" alt="Image 1" />
        <div className="image-text-builder-icon" >Gutenberg</div>
        </div>
      
        <div className={`column-icon ${bulderType=='customizer'?'active':'icon'}`} id="customizer" onClick={()=>handelIconClick('customizer')}>
        <img src="https://themehunk.com/wp-content/uploads/icon/brizy.svg" alt="Image 1" />
        <div className="image-text-builder-icon">Wordpress Customizer</div>
        </div>
      
      </div>
    );
  }