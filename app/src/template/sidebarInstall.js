import { useState } from '@wordpress/element';
import axios from 'axios';
import wpPlugins from '../../../json/plugins.json';
import { Button } from '@mui/material';
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
    return (<div>

        <div class="sb-top-close">
          <div class="sb-column-text"> Import Template<h3>{props.templateData.title} </h3></div>
          <div class="sb-column-close"><span class="close" onClick={()=>handelClose()}>&times;</span></div>
        </div>
        <div className='aisb-spacer'></div>
        {/* { 
            Object.entries(props.templateData.plugin).map(([key, value])=> (
                    <div><lable key={key}>Value = {value} key = {key}</lable><br></br></div>
            ))
       } */}
      <Button variant="contained" onClick={()=>nextInstall()}>Install & Import Website</Button>

  { apiUrl && <ImportAPI apiurl = {apiUrl}  />}
    </div>);
  }