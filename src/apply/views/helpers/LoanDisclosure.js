import React from 'react';
import { InputGroup } from 'react-bootstrap/InputGroup';

const LoanDisclosure = () => {
  let agreed = false;
  return (
    <div>
      <InputGroup.Checkbox
        onChange={() => {
          agreed = !agreed;
        }}
      >
        Ég samþykki neðangreint:
      </InputGroup.Checkbox>
      <div>
        Umboð þetta veitir Jöfnu ehf. heimild til að sækja upplýsingar um lánshæfismat* (áhættumat) mitt til
Creditinfo Lánstrausts hf. Lánshæfismatið spáir fyrir um líkur á alvarlegum vanskilum í framtíðinni og byggir á
upplýsingum sem Creditinfo býr yfir, s.s. upplýsingum í vanskilaskrá (þ.m.t. hverjir hafa sótt slíkar upplýsingar),
hlutafélagaskrá, skattskrá o.fl. Lánshæfismatið byggir á samkeyrslu gagna og getur innihaldið sögulegar
upplýsingar, s.s. um stöðu vanskila og lánshæfismats.
Ég undirritaður/undirrituð samþykki og heimila að framangreindar upplýsingar verði nýttar og sóttar í tengslum við
ákvörðunartöku um lánsviðskipti, sem og við eftirlit í tengslum við slík viðskipti, enda hafi [NAFN LÁNVEITANDA]
lögvarða hagsmuni af notkun umræddra upplýsinga.
Afturköllun umboðs þessa skal taka gildi 30 dögum eftir að Jöfnu ehf. hefur sannanlega móttekið
afturköllun undirritaðs/undirritaðrar og/eða þegar lánsviðskiptum aðila lýkur. Fram til þess tíma hefur Jöfnu ehf. heimild til að sækja og nota þær upplýsingar sem umboð þetta tekur til.
      </div>
    </div>
  );
};

export default LoanDisclosure;
