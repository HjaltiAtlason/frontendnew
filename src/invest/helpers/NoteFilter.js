import React from 'react';

const NoteFilter = () => {
  return (
    <div>
      <h4>Lánshæfisflokkur</h4>
      <label htmlFor="ASelected">
        A:
        <input name="ASelected" type="checkbox" />
      </label>
      <br />
      <label htmlFor="BSelected">
        B:
        <input name="BSelected" type="checkbox" />
      </label>
      <br />
      <label htmlFor="CSelected">
        C:
        <input name="CSelected" type="checkbox" />
      </label>
      <br />
      <label htmlFor="DSelected">
        D:
        <input name="DSelected" type="checkbox" />
      </label>
      <div>
        <button className="btn">Sía færslur</button>
      </div>
    </div>
  );
};

export default NoteFilter;
