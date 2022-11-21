var devnet = require('devnet-js');
// let ciscodev1 = new devnet.Defaultclass({id:"any string here"});

function doSSH(){
//   var loginparam = {
//     credential:{  //see ssh2 documentation for other option
//         host: '10.69.1.200',
//         port: 22,
//         username: 'admin',
//         password: 'Lun@R4ck65$!',
//         algorithms: {
//             cipher: [ '3des-cbc' ],
//             kex: [ "diffie-hellman-group1-sha1" ]
//           }
//     }
//   }
// ciscodev1.openSshShell(loginparam);

// setTimeout(function(){ //Writing stream in a simple way some delay is required none common method; moments after openSshShell function.
//   ciscodev1.streamSendkeys("en\rLun@R4ck65$!\rconf t\rip domain-name mawson.com\rexit\rwr\exit",{autoenter:true,emit:true}).on('data',function(data) {  //other style
//     process.stdout.write(data);
//   });
// }, 3000);

// setTimeout(function(){  //terminate ssh session after 12 seconds
//     ciscodev1.end();
//   }, 12000);
}

export default doSSH;