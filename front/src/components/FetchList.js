import axios from "axios";

function FetchList(code) {
  console.log("Fetch code sended--->", code);
  return axios.get("/axios", {
    params: {
      prefCode: code,
    },
  });
}

export default FetchList;
