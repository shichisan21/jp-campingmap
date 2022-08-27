import { useState } from "react";

import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

function fetchList(code) {
  console.log(code);
  return axios.get("/axios", {
    params: {
      prefCode: code,
    },
  });
}

function PrefButtonGenerate(props) {
  const { setMessage, setPref } = props;
  const [prefCode, setPrefCode] = useState("");

  // prettier-ignore
  const prefArray = ["北海道", "青森県", "岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県",
    "埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県",
    "岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県",
    "鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県",
    "佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"];

  const handleChange = (e) => {
    console.log("handle", e.target.value);
    fetchList(e.target.value + 1).then((res) => {
      setMessage(res.data);
      setPref(prefArray[e.target.value]);
      setPrefCode(e.target.value);
      console.log("sended pref code", e.target.value + 1);
    });
  };

  return (
    <>
      <Box sx={{ minWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id='demo'>PREF</InputLabel>
          <Select
            labelId='demo'
            id='demo-select'
            value={prefCode}
            label='PREF'
            onChange={handleChange}
          >
            {prefArray.map((pref, index) => (
              <MenuItem key={index} value={index}>
                {pref}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* {prefArray.map((pref, index) => (
        <Button
          key={index}
          variant='outlined'
          onClick={() =>
            fetchList(index + 1).then((res) => {
              setMessage(res.data);
              setPref(pref);
              console.log("sended pref code", index + 1);
            })
          }
        >
          {pref}
        </Button>
      ))} */}
    </>
  );
}

export default PrefButtonGenerate;
