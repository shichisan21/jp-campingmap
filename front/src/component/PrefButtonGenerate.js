import axios from 'axios';


function fetchList(code){
    console.log(code)
    return axios.get('/axios', {
        params: {
            prefCode: code
        }
    })
}

function PrefButtonGenerate(props) {
    const {setMessage, setPref} = props;
    

    return(
        <>
            <button onClick={() => fetchList('01')
            .then(res => {
                setMessage(res.data)
                setPref('北海道')
            })
            }>
                北海道
            </button>
            <button onClick={() => fetchList('02')
            .then(res => {
                setMessage(res.data)
                setPref('青森県')
            })
            }>
                青森県
            </button>
            <button onClick={() => fetchList('03')
            .then(res => {
                setMessage(res.data)
                setPref('岩手県')
            })
            }>
                岩手県
            </button>
        </>
    )
}

export default PrefButtonGenerate

