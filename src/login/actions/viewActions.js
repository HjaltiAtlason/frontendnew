import { aT } from '../../globals/constants';


export function selectView(viewKey) {  
  return {
    type: aT.login.store.CHANGE_VIEW_STORE,
    viewKey
  };
};

export default selectView