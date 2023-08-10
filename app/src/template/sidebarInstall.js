import { useState } from '@wordpress/element';
import axios from 'axios';
import { Button, Flex, FlexBlock, FlexItem } from '@wordpress/components';
import { Icon, arrowRight,chevronLeftSmall } from '@wordpress/icons';
import wpPlugins from '../../../json/plugins.json';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ImportAPI from './importapi';
import { useSelector, useDispatch } from 'react-redux';
import {addTrueFalse} from '../actions';
import { Upgrade } from '../aisb';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  
export default function sidebarInstall(props) {
  const dispatch = useDispatch();
  const myState = useSelector((state)=>state.trueFalse);

  const [ apiUrl, setApiUrl ] = useState(null);

const handelClose = ()=>{
     dispatch(addTrueFalse(false));
    console.log(props.templateData);
    var modalImg = document.getElementById("iframetmpl");
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    modalImg.src = '';
    urlReset();
    window.location.reload(); 
}

const urlReset = ()=>{
  apiUrl && setApiUrl(null);
}

const nextInstall = ()=>{
  props.installHandel();
}

console.log(props.templateData);
    return (<div className='iframe-footer'>
        <Flex>
              <FlexItem>
              <div class="aisb-back">
              <div class="sb-column-close"><Button variant="primary" className="close" onClick={()=>handelClose()}><Icon size ={12} icon={ <svg fill="#000000" width="800px" height="800px" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title/><path d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z"/></svg> } />Back</Button></div>
            </div>
              </FlexItem>
              <FlexBlock>
              <div>
              
              <span onClick={()=>nextInstall()} className='aisb-install-btn'>Create Website<b><Icon size ={22} icon={ arrowRight } /></b></span></div>
              </FlexBlock>
              <FlexItem>
              <div className="header-text">
                <Upgrade />
            </div>
              </FlexItem>
            </Flex>
    </div>);
  }