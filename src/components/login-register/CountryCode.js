import React from 'react';
import './login-register.css';

const CountryCode = () => {
  return (
    <select name="countryCode" className="country-code">
  <option data-countrycode="DZ" value="213">Algeria (+213)</option>
  <option data-countrycode="AD" value="376">Andorra (+376)</option>
  <option data-countrycode="AO" value="244">Angola (+244)</option>
  <option data-countrycode="AI" value="1264">Anguilla (+1264)</option>
  <option data-countrycode="AG" value="1268">Antigua & Barbuda (+1268)</option>
  <option data-countrycode="AR" value="54">Argentina (+54)</option>
  <option data-countrycode="AM" value="374">Armenia (+374)</option>
  <option data-countrycode="AW" value="297">Aruba (+297)</option>
  <option data-countrycode="AU" value="61">Australia (+61)</option>
  <option data-countrycode="AT" value="43">Austria (+43)</option>
  <option data-countrycode="AZ" value="994">Azerbaijan (+994)</option>
  <option data-countrycode="BS" value="1242">Bahamas (+1242)</option>
  <option data-countrycode="BH" value="973">Bahrain (+973)</option>
  <option data-countrycode="BD" value="880">Bangladesh (+880)</option>
  <option data-countrycode="BB" value="1246">Barbados (+1246)</option>
  <option data-countrycode="BY" value="375">Belarus (+375)</option>
  <option data-countrycode="BE" value="32">Belgium (+32)</option>
  <option data-countrycode="BZ" value="501">Belize (+501)</option>
  <option data-countrycode="BJ" value="229">Benin (+229)</option>
  <option data-countrycode="BM" value="1441">Bermuda (+1441)</option>
  <option data-countrycode="BT" value="975">Bhutan (+975)</option>
  <option data-countrycode="BO" value="591">Bolivia (+591)</option>
  <option data-countrycode="BA" value="387">Bosnia Herzegovina (+387)</option>
  <option data-countrycode="BW" value="267">Botswana (+267)</option>
  <option data-countrycode="BR" value="55">Brazil (+55)</option>
  <option data-countrycode="BN" value="673">Brunei (+673)</option>
  <option data-countrycode="BG" value="359">Bulgaria (+359)</option>
  <option data-countrycode="BF" value="226">Burkina Faso (+226)</option>
  <option data-countrycode="BI" value="257">Burundi (+257)</option>
  <option data-countrycode="KH" value="855">Cambodia (+855)</option>
  <option data-countrycode="CM" value="237">Cameroon (+237)</option>
  <option data-countrycode="CA" value="1">Canada (+1)</option>
  <option data-countrycode="CV" value="238">Cape Verde Islands (+238)</option>
  <option data-countrycode="KY" value="1345">Cayman Islands (+1345)</option>
  <option data-countrycode="CF" value="236">Central African Republic (+236)</option>
  <option data-countrycode="CL" value="56">Chile (+56)</option>
  <option data-countrycode="CN" value="86">China (+86)</option>
  <option data-countrycode="CO" value="57">Colombia (+57)</option>
  <option data-countrycode="KM" value="269">Comoros (+269)</option>
  <option data-countrycode="CG" value="242">Congo (+242)</option>
  <option data-countrycode="CK" value="682">Cook Islands (+682)</option>
  <option data-countrycode="CR" value="506">Costa Rica (+506)</option>
  <option data-countrycode="HR" value="385">Croatia (+385)</option>
  <option data-countrycode="CU" value="53">Cuba (+53)</option>
  <option data-countrycode="CY" value="90392">Cyprus North (+90392)</option>
  <option data-countrycode="CY" value="357">Cyprus South (+357)</option>
  <option data-countrycode="CZ" value="42">Czech Republic (+42)</option>
  <option data-countrycode="DK" value="45">Denmark (+45)</option>
  <option data-countrycode="DJ" value="253">Djibouti (+253)</option>
  <option data-countrycode="DM" value="1809">Dominica (+1809)</option>
  <option data-countrycode="DO" value="1809">Dominican Republic (+1809)</option>
  <option data-countrycode="EC" value="593">Ecuador (+593)</option>
  <option data-countrycode="EG" value="20">Egypt (+20)</option>
  <option data-countrycode="SV" value="503">El Salvador (+503)</option>
  <option data-countrycode="GQ" value="240">Equatorial Guinea (+240)</option>
  <option data-countrycode="ER" value="291">Eritrea (+291)</option>
  <option data-countrycode="EE" value="372">Estonia (+372)</option>
  <option data-countrycode="ET" value="251">Ethiopia (+251)</option>
  <option data-countrycode="FK" value="500">Falkland Islands (+500)</option>
  <option data-countrycode="FO" value="298">Faroe Islands (+298)</option>
  <option data-countrycode="FJ" value="679">Fiji (+679)</option>
  <option data-countrycode="FI" value="358">Finland (+358)</option>
  <option data-countrycode="FR" value="33">France (+33)</option>
  <option data-countrycode="GF" value="594">French Guiana (+594)</option>
  <option data-countrycode="PF" value="689">French Polynesia (+689)</option>
  <option data-countrycode="GA" value="241">Gabon (+241)</option>
  <option data-countrycode="GM" value="220">Gambia (+220)</option>
  <option data-countrycode="GE" value="7880">Georgia (+7880)</option>
  <option data-countrycode="DE" value="49">Germany (+49)</option>
  <option data-countrycode="GH" value="233">Ghana (+233)</option>
  <option data-countrycode="GI" value="350">Gibraltar (+350)</option>
  <option data-countrycode="GR" value="30">Greece (+30)</option>
  <option data-countrycode="GL" value="299">Greenland (+299)</option>
  <option data-countrycode="GD" value="1473">Grenada (+1473)</option>
  <option data-countrycode="GP" value="590">Guadeloupe (+590)</option>
  <option data-countrycode="GU" value="671">Guam (+671)</option>
  <option data-countrycode="GT" value="502">Guatemala (+502)</option>
  <option data-countrycode="GN" value="224">Guinea (+224)</option>
  <option data-countrycode="GW" value="245">Guinea-Bissau (+245)</option>
  <option data-countrycode="GY" value="592">Guyana (+592)</option>
  <option data-countrycode="HT" value="509">Haiti (+509)</option>
  <option data-countrycode="HN" value="504">Honduras (+504)</option>
  <option data-countrycode="HK" value="852">Hong Kong (+852)</option>
  <option data-countrycode="HU" value="36">Hungary (+36)</option>
  <option data-countrycode="IS" value="354">Iceland (+354)</option>
  <option data-countrycode="IN" value="91" selected>India (+91)</option>
  <option data-countrycode="ID" value="62">Indonesia (+62)</option>
  <option data-countrycode="IR" value="98">Iran (+98)</option>
  <option data-countrycode="IQ" value="964">Iraq (+964)</option>
  <option data-countrycode="IE" value="353">Ireland (+353)</option>
  <option data-countrycode="IL" value="972">Israel (+972)</option>
  <option data-countrycode="IT" value="39">Italy (+39)</option>
  <option data-countrycode="JM" value="1876">Jamaica (+1876)</option>
  <option data-countrycode="JP" value="81">Japan (+81)</option>
  <option data-countrycode="JO" value="962">Jordan (+962)</option>
</select>
  )
}

export default CountryCode