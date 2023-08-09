import { useState  } from '@wordpress/element';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export default function BuilderIcon(props) {

  const [ bulderType, setbulderType ] = useState(null);

  const [builder, setBuilder] = useState('elementor');
  const [iscate, setisCate] = useState('all');


  const handleBuilder = (event) => {
    setBuilder(event.target.value);
  };


  const handleCate = (event) => {
    setisCate(event.target.value);
  };



    const handelIconClick =(type)=>{
      props.builderclick(type);
      setbulderType(type);
    }


    const BootstrapInput = styled(InputBase)(({ theme }) => ({
      'label + &': {
        marginTop: theme.spacing(3),
      },
      '& .MuiInputBase-input': {
        borderRadius: 25,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
          borderRadius: 25,
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
      },
    }));


    const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



    const category = ['all','business','ecommerce','free','education','all','business','ecommerce','free','education','all','business','ecommerce','free','education'];
    const handelCategory = (event) =>{
     props.categoryAddRemove(event.target.checked,event.target.value);
    }


    return (<div className="aisb-builder-icon">

      <FormControl sx={{ m: 1, minWidth: 260 }} variant="standard" >
        <Select
          labelId="demo-select-small-labe"
          id="demo-simple-select-helper"
          value={builder}
          label="Builder"
          onChange={handleBuilder}
          input={<BootstrapInput />}
        >
          <MenuItem value='elementor'>
          
          <div className={`column-icon ${bulderType=='elementor'?'active':'icon'}`} id="elementor" onClick={()=>handelIconClick('elementor')}>
        <img src={`${AISB.pluginpath}json/svg/elementor.svg`} alt="Elementor Template" />
        <div className="image-text-builder-icon">Elementor</div>
        </div>
          
          </MenuItem>
          <MenuItem value={'gutenberg'}>
          <div className={`column-icon ${bulderType=='gutenberg'?'active':'icon'}`} id="gutenberg" onClick={()=>handelIconClick('gutenberg')}>
        <img src={`${AISB.pluginpath}json/svg/block.svg`}  alt="Block Templates" />
        <div className="image-text-builder-icon" >Gutenberg</div>
        </div>
          </MenuItem>
          <MenuItem value={'customizer'}><div className={`column-icon ${bulderType=='customizer'?'active':'icon'}`} id="customizer" onClick={()=>handelIconClick('customizer')}>
        <img src={`${AISB.pluginpath}json/svg/customizer.svg`} alt="Customizer Template" />
        <div className="image-text-builder-icon">Customizer</div>
        </div></MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 260 }} variant="standard">
        <Select
          value={iscate}
          onChange={handleCate}
          labelId="demo-select-small-labe"
          id="demo-simple-select-helper"
          label="Builder"
          inputProps={{ 'aria-label': 'Without label' }}
          MenuProps={MenuProps}
          input={<BootstrapInput />}

        >
          {category.map((cate) => 
          <MenuItem onChange={handelCategory}  value={cate}> {cate} </MenuItem>

          )}
        </Select>
      </FormControl>
      
      </div>
    );
  }