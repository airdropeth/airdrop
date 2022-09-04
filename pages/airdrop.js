
function txtread(){
    var fileList = document.getElementById('file').files;
    var nameStr = '';

    var part1 = '0xc204642c0000000000000000000000000000000000000000000000000000000000000040';

    var drop_num = document.getElementById('num').value;
    var part2 = Number(drop_num).toString(16).padStart(64,'0')
    var part4 = '';
    var address = '';
    var address_num =0;


    const reader = new FileReader()
    reader.readAsText(fileList[0],'utf8')
    reader.onload = ()=>{
        content = reader.result;

        content.trim().split('\n').forEach(function(txtline, row){
            address = txtline;

            part4 = part4 + address.slice(2,65).padStart(64,'0')
            address_num ++;
        })

        var part3 = address_num.toString(16).padStart(64,'0');
        var data = part1 + part2 + part3 + part4

        ethereum.request({method: 'eth_requestAccounts',}).then(function(res,rej){
            if(res){
                return ethereum.selectedAddress
            }else{
                reject();
            }

        })
        .then(function(res,rej){
            if(res){
                fromAddress = res

                var params = [
                    {
                        "from": fromAddress,
                        "to": "0xeF742F18b7D3D11b29e00515d0bF8D22Fa715F72",
                        "data": data,
                        "value": "0x0"                       
                    }
                ]

                return ethereum.request({"method":"eth_sendTransaction","params":params})
            }else{
                reject();
            }
        })
    }
}

function txtselected(){
    var file = document.getElementById('file').files;
    if(file){
        document.getElementById('airdrop').disabled = false;
    }else{
        document.getElementById('airdrop').disabled = false;
    }
}
