const initialState = {
  name: 'Jafna ehf.',
  address: 'Laugavegi 105',
  phone: '+354 8536999',
  founded: 'ágúst 2016'
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
