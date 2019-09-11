import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Button } from 'react-bootstrap';
import { becomeJafnaMember } from '../actions/userActions';


const BecomeJafnaMember = ({ agreed, dispatch }) => {
  return (
    <div>
      <div>
        <h2>Má bjóða þér að gerast Jöfnufélagi</h2>
        <h4>Þér býðst að gerast Jöfnufélagi fyrir 800 krónur.  Upphæðin fer í að kaupa hlutabréf í Jöfnu ehf.
                Sem hluthafi í Jöfnu hefur þú rétt á að mæta á aðalfund félagsins með atkvæðisrétt.
                Velja 2 af 5 stjórnarmönnum félagsins í rafrænni kosningu.
                Jöfnufélagar fá úthlutað 80% af arðgreiðslum félagsins.
        </h4>
        <p>Aðrir hluthafar sem eru stofnendur og starfsmenn fá 20% af arðgreiðslum.
                Arðgreiðslur til hvers jöfnufélaga fara eftir virkni þeirra á vefnum,
                þannig að 1/3 af greiðslunum fá allir en 2/3 tengjast virkni.
        </p>
      </div>
      <div>
        <form
id="BecomeJafnaMember-form"
          onSubmit={() => {
            dispatch(becomeJafnaMember());
          }}
        >
          <Button id="BecomeJafnaMember-btn" type="submit" bsSize="large" variant="primary">
                    Sækja um að gerast Jöfnufélagi
          </Button>
        </form>
        <Checkbox
          onChange={() => {
            agreed = !agreed;
          }}
        >
                Ég samþykki að greiðsla fyrir félagsaðild sé tekin af reikningi mínum
        </Checkbox>
        <h3>Samþykktir Jöfnu</h3>
      </div>

    </div>
  );
};

BecomeJafnaMember.propTypes = {
  agreed: PropTypes.bool,
  dispatch: PropTypes.func
};

export default BecomeJafnaMember;
