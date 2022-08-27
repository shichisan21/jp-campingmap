import axios from "axios";

function FetchList(code) {
  console.log(code);
  return axios.get("/axios", {
    params: {
      prefCode: code,
    },
  });
}

export default FetchList;
