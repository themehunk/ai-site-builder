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
                <Button variant="primary" className='aisb-upgrade-btn'>
                <Icon icon={<svg  viewBox="0 0 1024 1024" class="icon"  version="1.1"><path d="M57 438.312l109.536 488.72h697.336l109.536-488.72-259.176 156.816-187.856-333.088-205.352 333.088z" fill="#EC9312" /><path d="M629.048 211.888c0 58.912-47.752 106.656-106.672 106.656-58.92 0-106.664-47.744-106.664-106.656 0-58.976 47.744-106.656 106.664-106.656s106.672 47.688 106.672 106.656z" fill="#CB1B5B" /><path d="M522.376 105.232c-58.92 0-106.664 47.68-106.664 106.656 0 58.912 47.744 106.656 106.664 106.656V105.232z" fill="#E5226B" /><path d="M57 438.312l109.536 488.72h697.336z" fill="#F4A832" /><path d="M973.408 438.312l-109.536 488.72H166.536z" fill="#F4A832" /><path d="M166.536 927.032h697.336L515.2 715.832z" fill="#F5B617" /><path d="M1017.856 409.44a55.2 55.2 0 0 1-55.264 55.208 55.184 55.184 0 0 1-55.216-55.208 55.2 55.2 0 0 1 55.216-55.264 55.2 55.2 0 0 1 55.264 55.264z" fill="#0472AF" /><path d="M962.592 354.176a55.2 55.2 0 0 0-55.216 55.264 55.184 55.184 0 0 0 55.216 55.208V354.176z" fill="#1A8DCC" /><path d="M116.656 409.44a55.216 55.216 0 0 1-55.272 55.208A55.208 55.208 0 0 1 6.144 409.44a55.208 55.208 0 0 1 55.24-55.264 55.224 55.224 0 0 1 55.272 55.264z" fill="#0472AF" /><path d="M61.384 354.176A55.216 55.216 0 0 0 6.144 409.44a55.2 55.2 0 0 0 55.24 55.208V354.176z" fill="#0092D2" /></svg>} />
                UPGRADE PRO</Button> <b>Version 1.0</b>
            </div>
              </FlexItem>
            </Flex>
    </div>);
  }