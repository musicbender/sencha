import React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select';
import './style.scss'; 

export default (props) => {
  const { sites, handleSiteSelect, site, env } = props;

  const handleSelect = e => {
    handleSiteSelect(e.target.value);
  }

  return (
     <form className="site-selector" autoComplete="off">
       <FormControl className="site-select-wrapper">
         <InputLabel htmlFor="sites">Choose which product to test</InputLabel>
         <Select
           value={site}
           onChange={handleSelect}
           inputProps={{
             name: 'sites',
             id: 'sites',
           }}
         >
           <MenuItem value="">
             <em>Choose which product to test</em>
           </MenuItem>
           {
             sites.map((site, i) => {
               return <MenuItem value={site} key={Math.random()}>{site}</MenuItem>;
             })
           }
         </Select>
       </FormControl>
     </form>
  );
}
