import { aT } from '../../../globals/constants';
import * as actions from '../viewActions';

describe('selectView', () => {
  it('should return an action when passed the viewKeyFromShortName', () => {
    const viewKey = 'TEST_KEY';    
    const expectedAction = {
      type: aT.login.store.CHANGE_VIEW_STORE,
      viewKey
    };
    expect(actions.selectView(viewKey)).toEqual(expectedAction);
  });
});
