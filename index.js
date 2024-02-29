let express = require('express');
let app = express();
const path = require("path");
const homedir = require("os").homedir();
const port = 3015;
let fetch = require("node-fetch");

let nearAPI = require('near-api-js');
var request = require('request').defaults({ encoding: null });

const fs = require('fs').promises;

const nfts = [
    {
        image: 'path_to_image1.jpg',
        title: 'NFT Title 1',
        buttonLink: '/action1',
        buttonText: 'Action 1'
    },
    {
        image: 'path_to_image2.jpg',
        title: 'NFT Title 2',
        buttonLink: '/action2',
        buttonText: 'Action 2'
    },
    // Add more NFT objects as needed
];

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('images', './images');
app.set('styles', './styles');
app.set('scripts', './scripts');

app.get('/nfts', (req, res) => {
    res.render('nft_gallary.ejs', { nfts: nfts });
});

app.get('/bulk_mint', (req, res) => {
    res.render('bulk_mint.ejs', { nfts: nfts });
});

app.get('/store_file', (req, res) => {
    res.render('store_file.ejs', { nfts: nfts });
});
app.get('/nft_mint', (req, res) => {
	var metadata_media = {};
	var nft_media ="https://images.unsplash.com/photo-1541680670548-88e8cd23c0f4";
	
	
	if (req.query && req.query.metadata_media) {		
	metadata_media = req.query.metadata_media;
    nft_media	= metadata_media.replace("?", "%3F").replace(/[&]/g, "%26");
	}
	console.log("value1="+req.query.metadata_media);
	console.log("value2="+nft_media);
    res.render('nft_mint.ejs', { nft_media:nft_media  });
});

app.get('/nft_transfer', (req, res) => {
	const metadata = {
		token_id : req.query.token_id,
		metadata_media : req.query.metadata_media,
		owner_id : req.query.owner_id,
		metadata_description : req.query.metadata_description,
		metadata_title : req.query.metadata_title,
		metadata_copies : req.query.metadata_copies,
		metadata_media_hash : req.query.metadata_media_hash,
		metadata_issued_at : req.query.metadata_issued_at,
		metadata_expires_at : req.query.metadata_expires_at,
		metadata_starts_at : req.query.metadata_starts_at,
		metadata_updated_at : req.query.metadata_updated_at,
		metadata_reference : req.query.metadata_reference,
		metadata_reference_hash : req.query.metadata_reference_hash,
		metadata_extra : req.query.metadata_extra,
		metadata_reference : req.query.metadata_reference,
		approved_account_ids : req.query.approved_account_ids,
	};
	console.log("value2="+metadata);
    res.render('nft_transfer.ejs', { metadata:metadata  });
});

app.get('/home', (req, res) => {
	var options = {
    "method": "GET"
  };
	var jsontokens = [];

fetch('https://3.91.12.12/view_nft?account_id=saurabhksinha900.testnet', options).then(res => res.json())
    .then((jsontoken) => {
	console.log(jsontoken[0]);
	res.render('home.ejs', {jsontoken:jsontoken});
		
	});
	console.log("length="+jsontokens.length);console.log("second="+jsontokens[1]);
	
});





app.get('/detectOffensiveImages', (req, res) => {
  const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
  credentials: {
   client_email: 'ravi-sa1@iconic-nation-410817.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyO3qCuDoTyV+m\nYbfNUVf/z5+jEsOP3FBOft+UvkebF6SyH+i7Ek0r/fQPk/1sihmk55A6MHOp2jeW\navlHodRRd/ZeYAK/1bJlDcfDD1xGnLGmJ5sjl9bAQwH0OEGZu0xQpdwfoq5b6qiy\nQSzYCKI3H547sd0E/itODh+10WUk76l+Grb47qoBuOlxzfwXzv9UsNR97B8q52Kk\nUo6fVxG2sq4KJMku18FHZH+UGbMSw67bQxY+zowKtWPWN5MZ+a5sciEDaQ0ZSA0c\n0ryzTAnrsCQve4cjeN56NvZ8VF3dFwQEPbsOakGA7MqEKI61bhIV2aQoXe0LS9Uz\nKZ5Ajb11AgMBAAECggEAKvHX6A1ZuRDJYj6jWe5ipLmzPki0JEKyeudpGd7rQ/xj\na6PyoLidLZ9oIiTHaFKyMSC2iL7J78Arqqul2tOsY+Di1QSPRQfJjz3Nxzs5Qa5Z\nw65BXEcmsHa0ztKLQ+50Se5c5qZ9GpqlASZhFsClzWBp8Po/Rge0CX+vtlB47XgG\nOlUUauYWZgNeHPlJy5eHp3VL9Th/hs0prN6kc9c+5ORv/ksl5pvpJwSv+r0JJXNn\nJBycRWCgmcPKnAQFv34s066FkmjBYKSIwEABDdWDRHFTiIicDx1lq9U1eofCZD7c\nWDcYjFSCsehCJZiasdlrRp7CpmXDXN628JxBPmbt1QKBgQDtnINUzDCIpTJdO/zX\n3iGtl7pezg3pSTvQ0mIJbT+IjP9r8ZEwHZzmT0eCpC7r0lVojpLu/V0b3xJb9FQc\neiYvizmA2bXcl8du8LDVAr8+u3ebi8Ali4Mqo1hL8BIaJsjXR3cvACGpOG28mOCU\nB37yMjHC1LADVCJReQ4x9ELV3wKBgQDABpC9oC2x4z/IAohauzADujD6Odrsb/dF\nVRqRgj9v72W4GxZLRV64OoDFgJMO7qZTRt9CLv7rKas6ViYpk+Ebux4uHT533RWI\nYySXXOulqKolbQPSbpR3wTqhaJ8cTR6NHXi8BP5Hm06IHAizMcQtdTh8GRl7XjDU\nQwMoCSxPKwKBgQC3lDb7qw7MZCW3VwOQnLSUdCev269vz/8A5aqM8fUmQRmOgoLU\nE+0HG7V6P/Noi4clUxI+x03KnNyIYwshPVaHYR+6Z3pUxod1NUzKJmcvxpMwgBai\na1mZ9b3gXcj+n3yIp1Rz4bwgC9Ls5YiNlgUEhrdfegfLapNhMxA+lCOXLQKBgCeS\nss2BbylTzdcoPnWEUhbSjjljJuzG/kx5h2opT22ABpR0cJm+iBCrbdJF9wiCwiAz\nYNtA2CQaiEETc/XpleCjJUsXl8IX+9IJrIbNDXssUTQ5TSpWw54SYkTVTMUGV595\nTWJiHQ0gwoRmUpyrSuSbXbKlcYztEl8MGGBt04XVAoGACZueLqgH5j39beR/SbCN\n2bJotadwsXPHKAsg7djFhpRbjes1ORLTHBSULZ7ltiKVu6M+N1Us+Tn2O1dp+2MK\nC9csPG7NtB8xjZTMcJv31KF48gFrRGxGFUN/ArTDLn4a9V7sCc9lRYFoVq2q0/4P\n2z2a48Db3fJF2ngOGxO5pB8=\n-----END PRIVATE KEY-----\n',
  },
});

async function detectOffensiveImages(inputFile) {
  const [result] = await client.safeSearchDetection(inputFile);
  const detections = result.safeSearchAnnotation;

 // console.log(`Adult: ${detections.adult}`);
 // console.log(`Medical: ${detections.medical}`);
 // console.log(`Spoof: ${detections.spoof}`);
 // console.log(`Violence: ${detections.violence}`);
//  console.log(`Racy: ${detections.racy}`);
		
    res.send("<img src='https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rf/eg/va/nft5.jpeg'/></br>"+JSON.stringify(detections));
}

detectOffensiveImages('https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rf/eg/va/nft5.jpeg');
  
  
});

app.get('/detectFaces', (req, res) => {
  const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: 'ravi-sa1@iconic-nation-410817.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyO3qCuDoTyV+m\nYbfNUVf/z5+jEsOP3FBOft+UvkebF6SyH+i7Ek0r/fQPk/1sihmk55A6MHOp2jeW\navlHodRRd/ZeYAK/1bJlDcfDD1xGnLGmJ5sjl9bAQwH0OEGZu0xQpdwfoq5b6qiy\nQSzYCKI3H547sd0E/itODh+10WUk76l+Grb47qoBuOlxzfwXzv9UsNR97B8q52Kk\nUo6fVxG2sq4KJMku18FHZH+UGbMSw67bQxY+zowKtWPWN5MZ+a5sciEDaQ0ZSA0c\n0ryzTAnrsCQve4cjeN56NvZ8VF3dFwQEPbsOakGA7MqEKI61bhIV2aQoXe0LS9Uz\nKZ5Ajb11AgMBAAECggEAKvHX6A1ZuRDJYj6jWe5ipLmzPki0JEKyeudpGd7rQ/xj\na6PyoLidLZ9oIiTHaFKyMSC2iL7J78Arqqul2tOsY+Di1QSPRQfJjz3Nxzs5Qa5Z\nw65BXEcmsHa0ztKLQ+50Se5c5qZ9GpqlASZhFsClzWBp8Po/Rge0CX+vtlB47XgG\nOlUUauYWZgNeHPlJy5eHp3VL9Th/hs0prN6kc9c+5ORv/ksl5pvpJwSv+r0JJXNn\nJBycRWCgmcPKnAQFv34s066FkmjBYKSIwEABDdWDRHFTiIicDx1lq9U1eofCZD7c\nWDcYjFSCsehCJZiasdlrRp7CpmXDXN628JxBPmbt1QKBgQDtnINUzDCIpTJdO/zX\n3iGtl7pezg3pSTvQ0mIJbT+IjP9r8ZEwHZzmT0eCpC7r0lVojpLu/V0b3xJb9FQc\neiYvizmA2bXcl8du8LDVAr8+u3ebi8Ali4Mqo1hL8BIaJsjXR3cvACGpOG28mOCU\nB37yMjHC1LADVCJReQ4x9ELV3wKBgQDABpC9oC2x4z/IAohauzADujD6Odrsb/dF\nVRqRgj9v72W4GxZLRV64OoDFgJMO7qZTRt9CLv7rKas6ViYpk+Ebux4uHT533RWI\nYySXXOulqKolbQPSbpR3wTqhaJ8cTR6NHXi8BP5Hm06IHAizMcQtdTh8GRl7XjDU\nQwMoCSxPKwKBgQC3lDb7qw7MZCW3VwOQnLSUdCev269vz/8A5aqM8fUmQRmOgoLU\nE+0HG7V6P/Noi4clUxI+x03KnNyIYwshPVaHYR+6Z3pUxod1NUzKJmcvxpMwgBai\na1mZ9b3gXcj+n3yIp1Rz4bwgC9Ls5YiNlgUEhrdfegfLapNhMxA+lCOXLQKBgCeS\nss2BbylTzdcoPnWEUhbSjjljJuzG/kx5h2opT22ABpR0cJm+iBCrbdJF9wiCwiAz\nYNtA2CQaiEETc/XpleCjJUsXl8IX+9IJrIbNDXssUTQ5TSpWw54SYkTVTMUGV595\nTWJiHQ0gwoRmUpyrSuSbXbKlcYztEl8MGGBt04XVAoGACZueLqgH5j39beR/SbCN\n2bJotadwsXPHKAsg7djFhpRbjes1ORLTHBSULZ7ltiKVu6M+N1Us+Tn2O1dp+2MK\nC9csPG7NtB8xjZTMcJv31KF48gFrRGxGFUN/ArTDLn4a9V7sCc9lRYFoVq2q0/4P\n2z2a48Db3fJF2ngOGxO5pB8=\n-----END PRIVATE KEY-----\n',
  },
});

async function detectFaces(inputFile) {
  const [result] = await client.faceDetection(inputFile);
  const faces = result.faceAnnotations;
  console.log('Faces:');
  faces.forEach(face => {
    console.log(`Joy: ${face.joyLikelihood}`);
    console.log(`Anger: ${face.angerLikelihood}`);
    console.log(`Sorrow: ${face.sorrowLikelihood}`);
    console.log(`Surprise: ${face.surpriseLikelihood}`);
  });
  res.send("<img src='https://th.bing.com/th/id/OIP.jBgDNqoKGeZTtevc98xmwQHaLH?pid=ImgDet&rs=1'/></br>"+JSON.stringify(result));
}

detectFaces('https://th.bing.com/th/id/OIP.jBgDNqoKGeZTtevc98xmwQHaLH?pid=ImgDet&rs=1');

});

app.get('/detectLabels', (req, res) => {
  const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
   credentials: {
    client_email: 'ravi-sa1@iconic-nation-410817.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyO3qCuDoTyV+m\nYbfNUVf/z5+jEsOP3FBOft+UvkebF6SyH+i7Ek0r/fQPk/1sihmk55A6MHOp2jeW\navlHodRRd/ZeYAK/1bJlDcfDD1xGnLGmJ5sjl9bAQwH0OEGZu0xQpdwfoq5b6qiy\nQSzYCKI3H547sd0E/itODh+10WUk76l+Grb47qoBuOlxzfwXzv9UsNR97B8q52Kk\nUo6fVxG2sq4KJMku18FHZH+UGbMSw67bQxY+zowKtWPWN5MZ+a5sciEDaQ0ZSA0c\n0ryzTAnrsCQve4cjeN56NvZ8VF3dFwQEPbsOakGA7MqEKI61bhIV2aQoXe0LS9Uz\nKZ5Ajb11AgMBAAECggEAKvHX6A1ZuRDJYj6jWe5ipLmzPki0JEKyeudpGd7rQ/xj\na6PyoLidLZ9oIiTHaFKyMSC2iL7J78Arqqul2tOsY+Di1QSPRQfJjz3Nxzs5Qa5Z\nw65BXEcmsHa0ztKLQ+50Se5c5qZ9GpqlASZhFsClzWBp8Po/Rge0CX+vtlB47XgG\nOlUUauYWZgNeHPlJy5eHp3VL9Th/hs0prN6kc9c+5ORv/ksl5pvpJwSv+r0JJXNn\nJBycRWCgmcPKnAQFv34s066FkmjBYKSIwEABDdWDRHFTiIicDx1lq9U1eofCZD7c\nWDcYjFSCsehCJZiasdlrRp7CpmXDXN628JxBPmbt1QKBgQDtnINUzDCIpTJdO/zX\n3iGtl7pezg3pSTvQ0mIJbT+IjP9r8ZEwHZzmT0eCpC7r0lVojpLu/V0b3xJb9FQc\neiYvizmA2bXcl8du8LDVAr8+u3ebi8Ali4Mqo1hL8BIaJsjXR3cvACGpOG28mOCU\nB37yMjHC1LADVCJReQ4x9ELV3wKBgQDABpC9oC2x4z/IAohauzADujD6Odrsb/dF\nVRqRgj9v72W4GxZLRV64OoDFgJMO7qZTRt9CLv7rKas6ViYpk+Ebux4uHT533RWI\nYySXXOulqKolbQPSbpR3wTqhaJ8cTR6NHXi8BP5Hm06IHAizMcQtdTh8GRl7XjDU\nQwMoCSxPKwKBgQC3lDb7qw7MZCW3VwOQnLSUdCev269vz/8A5aqM8fUmQRmOgoLU\nE+0HG7V6P/Noi4clUxI+x03KnNyIYwshPVaHYR+6Z3pUxod1NUzKJmcvxpMwgBai\na1mZ9b3gXcj+n3yIp1Rz4bwgC9Ls5YiNlgUEhrdfegfLapNhMxA+lCOXLQKBgCeS\nss2BbylTzdcoPnWEUhbSjjljJuzG/kx5h2opT22ABpR0cJm+iBCrbdJF9wiCwiAz\nYNtA2CQaiEETc/XpleCjJUsXl8IX+9IJrIbNDXssUTQ5TSpWw54SYkTVTMUGV595\nTWJiHQ0gwoRmUpyrSuSbXbKlcYztEl8MGGBt04XVAoGACZueLqgH5j39beR/SbCN\n2bJotadwsXPHKAsg7djFhpRbjes1ORLTHBSULZ7ltiKVu6M+N1Us+Tn2O1dp+2MK\nC9csPG7NtB8xjZTMcJv31KF48gFrRGxGFUN/ArTDLn4a9V7sCc9lRYFoVq2q0/4P\n2z2a48Db3fJF2ngOGxO5pB8=\n-----END PRIVATE KEY-----\n',
  },
});

async function detectLabels(inputFile) {
  const [result] = await client.labelDetection(inputFile);
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.description));
    res.send("<img src='https://storage.googleapis.com/gcds-oht33907u9-2023.appspot.com/Sample.jpg'/></br>"+JSON.stringify(result));
}

detectLabels('https://storage.googleapis.com/gcds-oht33907u9-2023.appspot.com/Sample.jpg');


});

app.get('/detectObjects', (req, res) => {
  const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: 'ravi-sa1@iconic-nation-410817.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyO3qCuDoTyV+m\nYbfNUVf/z5+jEsOP3FBOft+UvkebF6SyH+i7Ek0r/fQPk/1sihmk55A6MHOp2jeW\navlHodRRd/ZeYAK/1bJlDcfDD1xGnLGmJ5sjl9bAQwH0OEGZu0xQpdwfoq5b6qiy\nQSzYCKI3H547sd0E/itODh+10WUk76l+Grb47qoBuOlxzfwXzv9UsNR97B8q52Kk\nUo6fVxG2sq4KJMku18FHZH+UGbMSw67bQxY+zowKtWPWN5MZ+a5sciEDaQ0ZSA0c\n0ryzTAnrsCQve4cjeN56NvZ8VF3dFwQEPbsOakGA7MqEKI61bhIV2aQoXe0LS9Uz\nKZ5Ajb11AgMBAAECggEAKvHX6A1ZuRDJYj6jWe5ipLmzPki0JEKyeudpGd7rQ/xj\na6PyoLidLZ9oIiTHaFKyMSC2iL7J78Arqqul2tOsY+Di1QSPRQfJjz3Nxzs5Qa5Z\nw65BXEcmsHa0ztKLQ+50Se5c5qZ9GpqlASZhFsClzWBp8Po/Rge0CX+vtlB47XgG\nOlUUauYWZgNeHPlJy5eHp3VL9Th/hs0prN6kc9c+5ORv/ksl5pvpJwSv+r0JJXNn\nJBycRWCgmcPKnAQFv34s066FkmjBYKSIwEABDdWDRHFTiIicDx1lq9U1eofCZD7c\nWDcYjFSCsehCJZiasdlrRp7CpmXDXN628JxBPmbt1QKBgQDtnINUzDCIpTJdO/zX\n3iGtl7pezg3pSTvQ0mIJbT+IjP9r8ZEwHZzmT0eCpC7r0lVojpLu/V0b3xJb9FQc\neiYvizmA2bXcl8du8LDVAr8+u3ebi8Ali4Mqo1hL8BIaJsjXR3cvACGpOG28mOCU\nB37yMjHC1LADVCJReQ4x9ELV3wKBgQDABpC9oC2x4z/IAohauzADujD6Odrsb/dF\nVRqRgj9v72W4GxZLRV64OoDFgJMO7qZTRt9CLv7rKas6ViYpk+Ebux4uHT533RWI\nYySXXOulqKolbQPSbpR3wTqhaJ8cTR6NHXi8BP5Hm06IHAizMcQtdTh8GRl7XjDU\nQwMoCSxPKwKBgQC3lDb7qw7MZCW3VwOQnLSUdCev269vz/8A5aqM8fUmQRmOgoLU\nE+0HG7V6P/Noi4clUxI+x03KnNyIYwshPVaHYR+6Z3pUxod1NUzKJmcvxpMwgBai\na1mZ9b3gXcj+n3yIp1Rz4bwgC9Ls5YiNlgUEhrdfegfLapNhMxA+lCOXLQKBgCeS\nss2BbylTzdcoPnWEUhbSjjljJuzG/kx5h2opT22ABpR0cJm+iBCrbdJF9wiCwiAz\nYNtA2CQaiEETc/XpleCjJUsXl8IX+9IJrIbNDXssUTQ5TSpWw54SYkTVTMUGV595\nTWJiHQ0gwoRmUpyrSuSbXbKlcYztEl8MGGBt04XVAoGACZueLqgH5j39beR/SbCN\n2bJotadwsXPHKAsg7djFhpRbjes1ORLTHBSULZ7ltiKVu6M+N1Us+Tn2O1dp+2MK\nC9csPG7NtB8xjZTMcJv31KF48gFrRGxGFUN/ArTDLn4a9V7sCc9lRYFoVq2q0/4P\n2z2a48Db3fJF2ngOGxO5pB8=\n-----END PRIVATE KEY-----\n',
  },
});


async function detectObjects(inputFile) {
  const [result] = await client.objectLocalization(inputFile);
  const objects = result.localizedObjectAnnotations;
  console.log('Objects:');
  objects.forEach(object => {
    console.log(object.name);
    console.log(`Confidence: ${object.score}`);
    const vertices = object.boundingPoly.normalizedVertices;
    vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
  });
     res.send("<img src='https://th.bing.com/th/id/OIP.-rlXQZyb25WAoXAxmhvQ-wHaE7?w=273&h=182&c=7&r=0&o=5&dpr=1.5&pid=1.7'/></br>"+JSON.stringify(result));
}

detectObjects('https://th.bing.com/th/id/OIP.-rlXQZyb25WAoXAxmhvQ-wHaE7?w=273&h=182&c=7&r=0&o=5&dpr=1.5&pid=1.7');

});

app.get('/detectText', (req, res) => {
  const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  credentials: {
   client_email: 'ravi-sa1@iconic-nation-410817.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyO3qCuDoTyV+m\nYbfNUVf/z5+jEsOP3FBOft+UvkebF6SyH+i7Ek0r/fQPk/1sihmk55A6MHOp2jeW\navlHodRRd/ZeYAK/1bJlDcfDD1xGnLGmJ5sjl9bAQwH0OEGZu0xQpdwfoq5b6qiy\nQSzYCKI3H547sd0E/itODh+10WUk76l+Grb47qoBuOlxzfwXzv9UsNR97B8q52Kk\nUo6fVxG2sq4KJMku18FHZH+UGbMSw67bQxY+zowKtWPWN5MZ+a5sciEDaQ0ZSA0c\n0ryzTAnrsCQve4cjeN56NvZ8VF3dFwQEPbsOakGA7MqEKI61bhIV2aQoXe0LS9Uz\nKZ5Ajb11AgMBAAECggEAKvHX6A1ZuRDJYj6jWe5ipLmzPki0JEKyeudpGd7rQ/xj\na6PyoLidLZ9oIiTHaFKyMSC2iL7J78Arqqul2tOsY+Di1QSPRQfJjz3Nxzs5Qa5Z\nw65BXEcmsHa0ztKLQ+50Se5c5qZ9GpqlASZhFsClzWBp8Po/Rge0CX+vtlB47XgG\nOlUUauYWZgNeHPlJy5eHp3VL9Th/hs0prN6kc9c+5ORv/ksl5pvpJwSv+r0JJXNn\nJBycRWCgmcPKnAQFv34s066FkmjBYKSIwEABDdWDRHFTiIicDx1lq9U1eofCZD7c\nWDcYjFSCsehCJZiasdlrRp7CpmXDXN628JxBPmbt1QKBgQDtnINUzDCIpTJdO/zX\n3iGtl7pezg3pSTvQ0mIJbT+IjP9r8ZEwHZzmT0eCpC7r0lVojpLu/V0b3xJb9FQc\neiYvizmA2bXcl8du8LDVAr8+u3ebi8Ali4Mqo1hL8BIaJsjXR3cvACGpOG28mOCU\nB37yMjHC1LADVCJReQ4x9ELV3wKBgQDABpC9oC2x4z/IAohauzADujD6Odrsb/dF\nVRqRgj9v72W4GxZLRV64OoDFgJMO7qZTRt9CLv7rKas6ViYpk+Ebux4uHT533RWI\nYySXXOulqKolbQPSbpR3wTqhaJ8cTR6NHXi8BP5Hm06IHAizMcQtdTh8GRl7XjDU\nQwMoCSxPKwKBgQC3lDb7qw7MZCW3VwOQnLSUdCev269vz/8A5aqM8fUmQRmOgoLU\nE+0HG7V6P/Noi4clUxI+x03KnNyIYwshPVaHYR+6Z3pUxod1NUzKJmcvxpMwgBai\na1mZ9b3gXcj+n3yIp1Rz4bwgC9Ls5YiNlgUEhrdfegfLapNhMxA+lCOXLQKBgCeS\nss2BbylTzdcoPnWEUhbSjjljJuzG/kx5h2opT22ABpR0cJm+iBCrbdJF9wiCwiAz\nYNtA2CQaiEETc/XpleCjJUsXl8IX+9IJrIbNDXssUTQ5TSpWw54SYkTVTMUGV595\nTWJiHQ0gwoRmUpyrSuSbXbKlcYztEl8MGGBt04XVAoGACZueLqgH5j39beR/SbCN\n2bJotadwsXPHKAsg7djFhpRbjes1ORLTHBSULZ7ltiKVu6M+N1Us+Tn2O1dp+2MK\nC9csPG7NtB8xjZTMcJv31KF48gFrRGxGFUN/ArTDLn4a9V7sCc9lRYFoVq2q0/4P\n2z2a48Db3fJF2ngOGxO5pB8=\n-----END PRIVATE KEY-----\n',
  },
});

async function detectText(inputFile) {
  const [result] = await client.textDetection(inputFile);
  const detections = result.textAnnotations;
  console.log('Text:');
  detections.forEach(text => console.log(text.description));
  res.send("<img src='https://th.bing.com/th/id/R.3dd9e7260c5072ca09385f789c9832cc?rik=%2fxeX7G4YlPgHWg&pid=ImgRaw&r=0'/></br>"+JSON.stringify(result));
}

detectText('https://th.bing.com/th/id/R.3dd9e7260c5072ca09385f789c9832cc?rik=%2fxeX7G4YlPgHWg&pid=ImgRaw&r=0');
});

app.get('/analyzeVideo', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
    client_email: 'ravi-sa1@iconic-nation-410817.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyO3qCuDoTyV+m\nYbfNUVf/z5+jEsOP3FBOft+UvkebF6SyH+i7Ek0r/fQPk/1sihmk55A6MHOp2jeW\navlHodRRd/ZeYAK/1bJlDcfDD1xGnLGmJ5sjl9bAQwH0OEGZu0xQpdwfoq5b6qiy\nQSzYCKI3H547sd0E/itODh+10WUk76l+Grb47qoBuOlxzfwXzv9UsNR97B8q52Kk\nUo6fVxG2sq4KJMku18FHZH+UGbMSw67bQxY+zowKtWPWN5MZ+a5sciEDaQ0ZSA0c\n0ryzTAnrsCQve4cjeN56NvZ8VF3dFwQEPbsOakGA7MqEKI61bhIV2aQoXe0LS9Uz\nKZ5Ajb11AgMBAAECggEAKvHX6A1ZuRDJYj6jWe5ipLmzPki0JEKyeudpGd7rQ/xj\na6PyoLidLZ9oIiTHaFKyMSC2iL7J78Arqqul2tOsY+Di1QSPRQfJjz3Nxzs5Qa5Z\nw65BXEcmsHa0ztKLQ+50Se5c5qZ9GpqlASZhFsClzWBp8Po/Rge0CX+vtlB47XgG\nOlUUauYWZgNeHPlJy5eHp3VL9Th/hs0prN6kc9c+5ORv/ksl5pvpJwSv+r0JJXNn\nJBycRWCgmcPKnAQFv34s066FkmjBYKSIwEABDdWDRHFTiIicDx1lq9U1eofCZD7c\nWDcYjFSCsehCJZiasdlrRp7CpmXDXN628JxBPmbt1QKBgQDtnINUzDCIpTJdO/zX\n3iGtl7pezg3pSTvQ0mIJbT+IjP9r8ZEwHZzmT0eCpC7r0lVojpLu/V0b3xJb9FQc\neiYvizmA2bXcl8du8LDVAr8+u3ebi8Ali4Mqo1hL8BIaJsjXR3cvACGpOG28mOCU\nB37yMjHC1LADVCJReQ4x9ELV3wKBgQDABpC9oC2x4z/IAohauzADujD6Odrsb/dF\nVRqRgj9v72W4GxZLRV64OoDFgJMO7qZTRt9CLv7rKas6ViYpk+Ebux4uHT533RWI\nYySXXOulqKolbQPSbpR3wTqhaJ8cTR6NHXi8BP5Hm06IHAizMcQtdTh8GRl7XjDU\nQwMoCSxPKwKBgQC3lDb7qw7MZCW3VwOQnLSUdCev269vz/8A5aqM8fUmQRmOgoLU\nE+0HG7V6P/Noi4clUxI+x03KnNyIYwshPVaHYR+6Z3pUxod1NUzKJmcvxpMwgBai\na1mZ9b3gXcj+n3yIp1Rz4bwgC9Ls5YiNlgUEhrdfegfLapNhMxA+lCOXLQKBgCeS\nss2BbylTzdcoPnWEUhbSjjljJuzG/kx5h2opT22ABpR0cJm+iBCrbdJF9wiCwiAz\nYNtA2CQaiEETc/XpleCjJUsXl8IX+9IJrIbNDXssUTQ5TSpWw54SYkTVTMUGV595\nTWJiHQ0gwoRmUpyrSuSbXbKlcYztEl8MGGBt04XVAoGACZueLqgH5j39beR/SbCN\n2bJotadwsXPHKAsg7djFhpRbjes1ORLTHBSULZ7ltiKVu6M+N1Us+Tn2O1dp+2MK\nC9csPG7NtB8xjZTMcJv31KF48gFrRGxGFUN/ArTDLn4a9V7sCc9lRYFoVq2q0/4P\n2z2a48Db3fJF2ngOGxO5pB8=\n-----END PRIVATE KEY-----\n',
  },
});



async function analyzeVideo(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['LABEL_DETECTION'],
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const labels = operationResult.annotationResults[0].segmentLabelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.entity.description));
  
   res.send('<video width="320" height="240" controls>  <source src="https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

//analyzeVideo('gs://cloud-samples-data/video/cat.mp4');

analyzeVideo('https://storage.cloud.google.com/cloud-samples-data2/EM.mp4?authuser=1');
});

app.get('/annotateVideo', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
   client_email: 'ravi-sa1@iconic-nation-410817.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyO3qCuDoTyV+m\nYbfNUVf/z5+jEsOP3FBOft+UvkebF6SyH+i7Ek0r/fQPk/1sihmk55A6MHOp2jeW\navlHodRRd/ZeYAK/1bJlDcfDD1xGnLGmJ5sjl9bAQwH0OEGZu0xQpdwfoq5b6qiy\nQSzYCKI3H547sd0E/itODh+10WUk76l+Grb47qoBuOlxzfwXzv9UsNR97B8q52Kk\nUo6fVxG2sq4KJMku18FHZH+UGbMSw67bQxY+zowKtWPWN5MZ+a5sciEDaQ0ZSA0c\n0ryzTAnrsCQve4cjeN56NvZ8VF3dFwQEPbsOakGA7MqEKI61bhIV2aQoXe0LS9Uz\nKZ5Ajb11AgMBAAECggEAKvHX6A1ZuRDJYj6jWe5ipLmzPki0JEKyeudpGd7rQ/xj\na6PyoLidLZ9oIiTHaFKyMSC2iL7J78Arqqul2tOsY+Di1QSPRQfJjz3Nxzs5Qa5Z\nw65BXEcmsHa0ztKLQ+50Se5c5qZ9GpqlASZhFsClzWBp8Po/Rge0CX+vtlB47XgG\nOlUUauYWZgNeHPlJy5eHp3VL9Th/hs0prN6kc9c+5ORv/ksl5pvpJwSv+r0JJXNn\nJBycRWCgmcPKnAQFv34s066FkmjBYKSIwEABDdWDRHFTiIicDx1lq9U1eofCZD7c\nWDcYjFSCsehCJZiasdlrRp7CpmXDXN628JxBPmbt1QKBgQDtnINUzDCIpTJdO/zX\n3iGtl7pezg3pSTvQ0mIJbT+IjP9r8ZEwHZzmT0eCpC7r0lVojpLu/V0b3xJb9FQc\neiYvizmA2bXcl8du8LDVAr8+u3ebi8Ali4Mqo1hL8BIaJsjXR3cvACGpOG28mOCU\nB37yMjHC1LADVCJReQ4x9ELV3wKBgQDABpC9oC2x4z/IAohauzADujD6Odrsb/dF\nVRqRgj9v72W4GxZLRV64OoDFgJMO7qZTRt9CLv7rKas6ViYpk+Ebux4uHT533RWI\nYySXXOulqKolbQPSbpR3wTqhaJ8cTR6NHXi8BP5Hm06IHAizMcQtdTh8GRl7XjDU\nQwMoCSxPKwKBgQC3lDb7qw7MZCW3VwOQnLSUdCev269vz/8A5aqM8fUmQRmOgoLU\nE+0HG7V6P/Noi4clUxI+x03KnNyIYwshPVaHYR+6Z3pUxod1NUzKJmcvxpMwgBai\na1mZ9b3gXcj+n3yIp1Rz4bwgC9Ls5YiNlgUEhrdfegfLapNhMxA+lCOXLQKBgCeS\nss2BbylTzdcoPnWEUhbSjjljJuzG/kx5h2opT22ABpR0cJm+iBCrbdJF9wiCwiAz\nYNtA2CQaiEETc/XpleCjJUsXl8IX+9IJrIbNDXssUTQ5TSpWw54SYkTVTMUGV595\nTWJiHQ0gwoRmUpyrSuSbXbKlcYztEl8MGGBt04XVAoGACZueLqgH5j39beR/SbCN\n2bJotadwsXPHKAsg7djFhpRbjes1ORLTHBSULZ7ltiKVu6M+N1Us+Tn2O1dp+2MK\nC9csPG7NtB8xjZTMcJv31KF48gFrRGxGFUN/ArTDLn4a9V7sCc9lRYFoVq2q0/4P\n2z2a48Db3fJF2ngOGxO5pB8=\n-----END PRIVATE KEY-----\n',
  },
});
async function annotateVideo(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['LABEL_DETECTION'],
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const labels = operationResult.annotationResults[0].segmentLabelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.entity.description));
  res.send('<video width="320" height="240" controls>  <source src="https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

annotateVideo('https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4');
});

app.get('/detectVideoExplicitContent', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
    client_email: 'ravi-sa1@iconic-nation-410817.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyO3qCuDoTyV+m\nYbfNUVf/z5+jEsOP3FBOft+UvkebF6SyH+i7Ek0r/fQPk/1sihmk55A6MHOp2jeW\navlHodRRd/ZeYAK/1bJlDcfDD1xGnLGmJ5sjl9bAQwH0OEGZu0xQpdwfoq5b6qiy\nQSzYCKI3H547sd0E/itODh+10WUk76l+Grb47qoBuOlxzfwXzv9UsNR97B8q52Kk\nUo6fVxG2sq4KJMku18FHZH+UGbMSw67bQxY+zowKtWPWN5MZ+a5sciEDaQ0ZSA0c\n0ryzTAnrsCQve4cjeN56NvZ8VF3dFwQEPbsOakGA7MqEKI61bhIV2aQoXe0LS9Uz\nKZ5Ajb11AgMBAAECggEAKvHX6A1ZuRDJYj6jWe5ipLmzPki0JEKyeudpGd7rQ/xj\na6PyoLidLZ9oIiTHaFKyMSC2iL7J78Arqqul2tOsY+Di1QSPRQfJjz3Nxzs5Qa5Z\nw65BXEcmsHa0ztKLQ+50Se5c5qZ9GpqlASZhFsClzWBp8Po/Rge0CX+vtlB47XgG\nOlUUauYWZgNeHPlJy5eHp3VL9Th/hs0prN6kc9c+5ORv/ksl5pvpJwSv+r0JJXNn\nJBycRWCgmcPKnAQFv34s066FkmjBYKSIwEABDdWDRHFTiIicDx1lq9U1eofCZD7c\nWDcYjFSCsehCJZiasdlrRp7CpmXDXN628JxBPmbt1QKBgQDtnINUzDCIpTJdO/zX\n3iGtl7pezg3pSTvQ0mIJbT+IjP9r8ZEwHZzmT0eCpC7r0lVojpLu/V0b3xJb9FQc\neiYvizmA2bXcl8du8LDVAr8+u3ebi8Ali4Mqo1hL8BIaJsjXR3cvACGpOG28mOCU\nB37yMjHC1LADVCJReQ4x9ELV3wKBgQDABpC9oC2x4z/IAohauzADujD6Odrsb/dF\nVRqRgj9v72W4GxZLRV64OoDFgJMO7qZTRt9CLv7rKas6ViYpk+Ebux4uHT533RWI\nYySXXOulqKolbQPSbpR3wTqhaJ8cTR6NHXi8BP5Hm06IHAizMcQtdTh8GRl7XjDU\nQwMoCSxPKwKBgQC3lDb7qw7MZCW3VwOQnLSUdCev269vz/8A5aqM8fUmQRmOgoLU\nE+0HG7V6P/Noi4clUxI+x03KnNyIYwshPVaHYR+6Z3pUxod1NUzKJmcvxpMwgBai\na1mZ9b3gXcj+n3yIp1Rz4bwgC9Ls5YiNlgUEhrdfegfLapNhMxA+lCOXLQKBgCeS\nss2BbylTzdcoPnWEUhbSjjljJuzG/kx5h2opT22ABpR0cJm+iBCrbdJF9wiCwiAz\nYNtA2CQaiEETc/XpleCjJUsXl8IX+9IJrIbNDXssUTQ5TSpWw54SYkTVTMUGV595\nTWJiHQ0gwoRmUpyrSuSbXbKlcYztEl8MGGBt04XVAoGACZueLqgH5j39beR/SbCN\n2bJotadwsXPHKAsg7djFhpRbjes1ORLTHBSULZ7ltiKVu6M+N1Us+Tn2O1dp+2MK\nC9csPG7NtB8xjZTMcJv31KF48gFrRGxGFUN/ArTDLn4a9V7sCc9lRYFoVq2q0/4P\n2z2a48Db3fJF2ngOGxO5pB8=\n-----END PRIVATE KEY-----\n',
  },
});



async function detectExplicitContent(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['EXPLICIT_CONTENT_DETECTION'],
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const explicitContent = operationResult.annotationResults[0].explicitAnnotation;
  console.log('Explicit content:');
  console.log(`Adult: ${explicitContent.frames.adult}`);
  console.log(`Violent: ${explicitContent.frames.violent}`);
  res.send('<video width="320" height="240" controls>  <source src="https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

detectExplicitContent('https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4');

});

app.get('/detectVideoFaces', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
    client_email: 'ravi-sa1@iconic-nation-410817.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyO3qCuDoTyV+m\nYbfNUVf/z5+jEsOP3FBOft+UvkebF6SyH+i7Ek0r/fQPk/1sihmk55A6MHOp2jeW\navlHodRRd/ZeYAK/1bJlDcfDD1xGnLGmJ5sjl9bAQwH0OEGZu0xQpdwfoq5b6qiy\nQSzYCKI3H547sd0E/itODh+10WUk76l+Grb47qoBuOlxzfwXzv9UsNR97B8q52Kk\nUo6fVxG2sq4KJMku18FHZH+UGbMSw67bQxY+zowKtWPWN5MZ+a5sciEDaQ0ZSA0c\n0ryzTAnrsCQve4cjeN56NvZ8VF3dFwQEPbsOakGA7MqEKI61bhIV2aQoXe0LS9Uz\nKZ5Ajb11AgMBAAECggEAKvHX6A1ZuRDJYj6jWe5ipLmzPki0JEKyeudpGd7rQ/xj\na6PyoLidLZ9oIiTHaFKyMSC2iL7J78Arqqul2tOsY+Di1QSPRQfJjz3Nxzs5Qa5Z\nw65BXEcmsHa0ztKLQ+50Se5c5qZ9GpqlASZhFsClzWBp8Po/Rge0CX+vtlB47XgG\nOlUUauYWZgNeHPlJy5eHp3VL9Th/hs0prN6kc9c+5ORv/ksl5pvpJwSv+r0JJXNn\nJBycRWCgmcPKnAQFv34s066FkmjBYKSIwEABDdWDRHFTiIicDx1lq9U1eofCZD7c\nWDcYjFSCsehCJZiasdlrRp7CpmXDXN628JxBPmbt1QKBgQDtnINUzDCIpTJdO/zX\n3iGtl7pezg3pSTvQ0mIJbT+IjP9r8ZEwHZzmT0eCpC7r0lVojpLu/V0b3xJb9FQc\neiYvizmA2bXcl8du8LDVAr8+u3ebi8Ali4Mqo1hL8BIaJsjXR3cvACGpOG28mOCU\nB37yMjHC1LADVCJReQ4x9ELV3wKBgQDABpC9oC2x4z/IAohauzADujD6Odrsb/dF\nVRqRgj9v72W4GxZLRV64OoDFgJMO7qZTRt9CLv7rKas6ViYpk+Ebux4uHT533RWI\nYySXXOulqKolbQPSbpR3wTqhaJ8cTR6NHXi8BP5Hm06IHAizMcQtdTh8GRl7XjDU\nQwMoCSxPKwKBgQC3lDb7qw7MZCW3VwOQnLSUdCev269vz/8A5aqM8fUmQRmOgoLU\nE+0HG7V6P/Noi4clUxI+x03KnNyIYwshPVaHYR+6Z3pUxod1NUzKJmcvxpMwgBai\na1mZ9b3gXcj+n3yIp1Rz4bwgC9Ls5YiNlgUEhrdfegfLapNhMxA+lCOXLQKBgCeS\nss2BbylTzdcoPnWEUhbSjjljJuzG/kx5h2opT22ABpR0cJm+iBCrbdJF9wiCwiAz\nYNtA2CQaiEETc/XpleCjJUsXl8IX+9IJrIbNDXssUTQ5TSpWw54SYkTVTMUGV595\nTWJiHQ0gwoRmUpyrSuSbXbKlcYztEl8MGGBt04XVAoGACZueLqgH5j39beR/SbCN\n2bJotadwsXPHKAsg7djFhpRbjes1ORLTHBSULZ7ltiKVu6M+N1Us+Tn2O1dp+2MK\nC9csPG7NtB8xjZTMcJv31KF48gFrRGxGFUN/ArTDLn4a9V7sCc9lRYFoVq2q0/4P\n2z2a48Db3fJF2ngOGxO5pB8=\n-----END PRIVATE KEY-----\n',
  },
});


async function detectFaces(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['FACE_DETECTION'],
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const faces = operationResult.annotationResults[0].faceDetectionAnnotations;
  console.log('Faces:');
  faces.forEach(face => console.log(face.name));
  
    res.send('<video width="320" height="240" controls>  <source src="https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

detectFaces('https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4');

});

app.get('/detectVideoLogo', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
   client_email: 'ravi-sa1@iconic-nation-410817.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyO3qCuDoTyV+m\nYbfNUVf/z5+jEsOP3FBOft+UvkebF6SyH+i7Ek0r/fQPk/1sihmk55A6MHOp2jeW\navlHodRRd/ZeYAK/1bJlDcfDD1xGnLGmJ5sjl9bAQwH0OEGZu0xQpdwfoq5b6qiy\nQSzYCKI3H547sd0E/itODh+10WUk76l+Grb47qoBuOlxzfwXzv9UsNR97B8q52Kk\nUo6fVxG2sq4KJMku18FHZH+UGbMSw67bQxY+zowKtWPWN5MZ+a5sciEDaQ0ZSA0c\n0ryzTAnrsCQve4cjeN56NvZ8VF3dFwQEPbsOakGA7MqEKI61bhIV2aQoXe0LS9Uz\nKZ5Ajb11AgMBAAECggEAKvHX6A1ZuRDJYj6jWe5ipLmzPki0JEKyeudpGd7rQ/xj\na6PyoLidLZ9oIiTHaFKyMSC2iL7J78Arqqul2tOsY+Di1QSPRQfJjz3Nxzs5Qa5Z\nw65BXEcmsHa0ztKLQ+50Se5c5qZ9GpqlASZhFsClzWBp8Po/Rge0CX+vtlB47XgG\nOlUUauYWZgNeHPlJy5eHp3VL9Th/hs0prN6kc9c+5ORv/ksl5pvpJwSv+r0JJXNn\nJBycRWCgmcPKnAQFv34s066FkmjBYKSIwEABDdWDRHFTiIicDx1lq9U1eofCZD7c\nWDcYjFSCsehCJZiasdlrRp7CpmXDXN628JxBPmbt1QKBgQDtnINUzDCIpTJdO/zX\n3iGtl7pezg3pSTvQ0mIJbT+IjP9r8ZEwHZzmT0eCpC7r0lVojpLu/V0b3xJb9FQc\neiYvizmA2bXcl8du8LDVAr8+u3ebi8Ali4Mqo1hL8BIaJsjXR3cvACGpOG28mOCU\nB37yMjHC1LADVCJReQ4x9ELV3wKBgQDABpC9oC2x4z/IAohauzADujD6Odrsb/dF\nVRqRgj9v72W4GxZLRV64OoDFgJMO7qZTRt9CLv7rKas6ViYpk+Ebux4uHT533RWI\nYySXXOulqKolbQPSbpR3wTqhaJ8cTR6NHXi8BP5Hm06IHAizMcQtdTh8GRl7XjDU\nQwMoCSxPKwKBgQC3lDb7qw7MZCW3VwOQnLSUdCev269vz/8A5aqM8fUmQRmOgoLU\nE+0HG7V6P/Noi4clUxI+x03KnNyIYwshPVaHYR+6Z3pUxod1NUzKJmcvxpMwgBai\na1mZ9b3gXcj+n3yIp1Rz4bwgC9Ls5YiNlgUEhrdfegfLapNhMxA+lCOXLQKBgCeS\nss2BbylTzdcoPnWEUhbSjjljJuzG/kx5h2opT22ABpR0cJm+iBCrbdJF9wiCwiAz\nYNtA2CQaiEETc/XpleCjJUsXl8IX+9IJrIbNDXssUTQ5TSpWw54SYkTVTMUGV595\nTWJiHQ0gwoRmUpyrSuSbXbKlcYztEl8MGGBt04XVAoGACZueLqgH5j39beR/SbCN\n2bJotadwsXPHKAsg7djFhpRbjes1ORLTHBSULZ7ltiKVu6M+N1Us+Tn2O1dp+2MK\nC9csPG7NtB8xjZTMcJv31KF48gFrRGxGFUN/ArTDLn4a9V7sCc9lRYFoVq2q0/4P\n2z2a48Db3fJF2ngOGxO5pB8=\n-----END PRIVATE KEY-----\n',
  },
});


async function detectLogo(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['LOGO_RECOGNITION'],
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const logos = operationResult.annotationResults[0].logoRecognitionAnnotations;
  console.log('Logos:');
  logos.forEach(logo => console.log(logo.entity.description));
  res.send('<video width="320" height="240" controls>  <source src="https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

detectLogo('https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4');

});

app.get('/detectVideoPerson', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
    client_email: 'ravi-sa1@iconic-nation-410817.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyO3qCuDoTyV+m\nYbfNUVf/z5+jEsOP3FBOft+UvkebF6SyH+i7Ek0r/fQPk/1sihmk55A6MHOp2jeW\navlHodRRd/ZeYAK/1bJlDcfDD1xGnLGmJ5sjl9bAQwH0OEGZu0xQpdwfoq5b6qiy\nQSzYCKI3H547sd0E/itODh+10WUk76l+Grb47qoBuOlxzfwXzv9UsNR97B8q52Kk\nUo6fVxG2sq4KJMku18FHZH+UGbMSw67bQxY+zowKtWPWN5MZ+a5sciEDaQ0ZSA0c\n0ryzTAnrsCQve4cjeN56NvZ8VF3dFwQEPbsOakGA7MqEKI61bhIV2aQoXe0LS9Uz\nKZ5Ajb11AgMBAAECggEAKvHX6A1ZuRDJYj6jWe5ipLmzPki0JEKyeudpGd7rQ/xj\na6PyoLidLZ9oIiTHaFKyMSC2iL7J78Arqqul2tOsY+Di1QSPRQfJjz3Nxzs5Qa5Z\nw65BXEcmsHa0ztKLQ+50Se5c5qZ9GpqlASZhFsClzWBp8Po/Rge0CX+vtlB47XgG\nOlUUauYWZgNeHPlJy5eHp3VL9Th/hs0prN6kc9c+5ORv/ksl5pvpJwSv+r0JJXNn\nJBycRWCgmcPKnAQFv34s066FkmjBYKSIwEABDdWDRHFTiIicDx1lq9U1eofCZD7c\nWDcYjFSCsehCJZiasdlrRp7CpmXDXN628JxBPmbt1QKBgQDtnINUzDCIpTJdO/zX\n3iGtl7pezg3pSTvQ0mIJbT+IjP9r8ZEwHZzmT0eCpC7r0lVojpLu/V0b3xJb9FQc\neiYvizmA2bXcl8du8LDVAr8+u3ebi8Ali4Mqo1hL8BIaJsjXR3cvACGpOG28mOCU\nB37yMjHC1LADVCJReQ4x9ELV3wKBgQDABpC9oC2x4z/IAohauzADujD6Odrsb/dF\nVRqRgj9v72W4GxZLRV64OoDFgJMO7qZTRt9CLv7rKas6ViYpk+Ebux4uHT533RWI\nYySXXOulqKolbQPSbpR3wTqhaJ8cTR6NHXi8BP5Hm06IHAizMcQtdTh8GRl7XjDU\nQwMoCSxPKwKBgQC3lDb7qw7MZCW3VwOQnLSUdCev269vz/8A5aqM8fUmQRmOgoLU\nE+0HG7V6P/Noi4clUxI+x03KnNyIYwshPVaHYR+6Z3pUxod1NUzKJmcvxpMwgBai\na1mZ9b3gXcj+n3yIp1Rz4bwgC9Ls5YiNlgUEhrdfegfLapNhMxA+lCOXLQKBgCeS\nss2BbylTzdcoPnWEUhbSjjljJuzG/kx5h2opT22ABpR0cJm+iBCrbdJF9wiCwiAz\nYNtA2CQaiEETc/XpleCjJUsXl8IX+9IJrIbNDXssUTQ5TSpWw54SYkTVTMUGV595\nTWJiHQ0gwoRmUpyrSuSbXbKlcYztEl8MGGBt04XVAoGACZueLqgH5j39beR/SbCN\n2bJotadwsXPHKAsg7djFhpRbjes1ORLTHBSULZ7ltiKVu6M+N1Us+Tn2O1dp+2MK\nC9csPG7NtB8xjZTMcJv31KF48gFrRGxGFUN/ArTDLn4a9V7sCc9lRYFoVq2q0/4P\n2z2a48Db3fJF2ngOGxO5pB8=\n-----END PRIVATE KEY-----\n',
  },
});


async function detectPerson(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['PERSON_DETECTION'],
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const people = operationResult.annotationResults[0].personDetectionAnnotations;
  console.log('People:');
  people.forEach(person => console.log(person.name));
  
    res.send('<video width="320" height="240" controls>  <source src="https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

detectPerson('https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4');

});

app.get('/detectVideoText', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
    client_email: 'ravi-sa1@iconic-nation-410817.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyO3qCuDoTyV+m\nYbfNUVf/z5+jEsOP3FBOft+UvkebF6SyH+i7Ek0r/fQPk/1sihmk55A6MHOp2jeW\navlHodRRd/ZeYAK/1bJlDcfDD1xGnLGmJ5sjl9bAQwH0OEGZu0xQpdwfoq5b6qiy\nQSzYCKI3H547sd0E/itODh+10WUk76l+Grb47qoBuOlxzfwXzv9UsNR97B8q52Kk\nUo6fVxG2sq4KJMku18FHZH+UGbMSw67bQxY+zowKtWPWN5MZ+a5sciEDaQ0ZSA0c\n0ryzTAnrsCQve4cjeN56NvZ8VF3dFwQEPbsOakGA7MqEKI61bhIV2aQoXe0LS9Uz\nKZ5Ajb11AgMBAAECggEAKvHX6A1ZuRDJYj6jWe5ipLmzPki0JEKyeudpGd7rQ/xj\na6PyoLidLZ9oIiTHaFKyMSC2iL7J78Arqqul2tOsY+Di1QSPRQfJjz3Nxzs5Qa5Z\nw65BXEcmsHa0ztKLQ+50Se5c5qZ9GpqlASZhFsClzWBp8Po/Rge0CX+vtlB47XgG\nOlUUauYWZgNeHPlJy5eHp3VL9Th/hs0prN6kc9c+5ORv/ksl5pvpJwSv+r0JJXNn\nJBycRWCgmcPKnAQFv34s066FkmjBYKSIwEABDdWDRHFTiIicDx1lq9U1eofCZD7c\nWDcYjFSCsehCJZiasdlrRp7CpmXDXN628JxBPmbt1QKBgQDtnINUzDCIpTJdO/zX\n3iGtl7pezg3pSTvQ0mIJbT+IjP9r8ZEwHZzmT0eCpC7r0lVojpLu/V0b3xJb9FQc\neiYvizmA2bXcl8du8LDVAr8+u3ebi8Ali4Mqo1hL8BIaJsjXR3cvACGpOG28mOCU\nB37yMjHC1LADVCJReQ4x9ELV3wKBgQDABpC9oC2x4z/IAohauzADujD6Odrsb/dF\nVRqRgj9v72W4GxZLRV64OoDFgJMO7qZTRt9CLv7rKas6ViYpk+Ebux4uHT533RWI\nYySXXOulqKolbQPSbpR3wTqhaJ8cTR6NHXi8BP5Hm06IHAizMcQtdTh8GRl7XjDU\nQwMoCSxPKwKBgQC3lDb7qw7MZCW3VwOQnLSUdCev269vz/8A5aqM8fUmQRmOgoLU\nE+0HG7V6P/Noi4clUxI+x03KnNyIYwshPVaHYR+6Z3pUxod1NUzKJmcvxpMwgBai\na1mZ9b3gXcj+n3yIp1Rz4bwgC9Ls5YiNlgUEhrdfegfLapNhMxA+lCOXLQKBgCeS\nss2BbylTzdcoPnWEUhbSjjljJuzG/kx5h2opT22ABpR0cJm+iBCrbdJF9wiCwiAz\nYNtA2CQaiEETc/XpleCjJUsXl8IX+9IJrIbNDXssUTQ5TSpWw54SYkTVTMUGV595\nTWJiHQ0gwoRmUpyrSuSbXbKlcYztEl8MGGBt04XVAoGACZueLqgH5j39beR/SbCN\n2bJotadwsXPHKAsg7djFhpRbjes1ORLTHBSULZ7ltiKVu6M+N1Us+Tn2O1dp+2MK\nC9csPG7NtB8xjZTMcJv31KF48gFrRGxGFUN/ArTDLn4a9V7sCc9lRYFoVq2q0/4P\n2z2a48Db3fJF2ngOGxO5pB8=\n-----END PRIVATE KEY-----\n',
  },
});


async function detectText(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['TEXT_DETECTION'],
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const textAnnotations =
    operationResult.annotationResults[0].textAnnotations;
  console.log('Text:');
  textAnnotations.forEach(text => console.log(text.description));
  res.send('<video width="320" height="240" controls>  <source src="https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

//detectText('gs://cloud-samples-data/video/cat.mp4');

  detectText('https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4');

});

app.get('/detectVideoTranscribeSpeech', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
    client_email: 'ravi-sa1@iconic-nation-410817.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyO3qCuDoTyV+m\nYbfNUVf/z5+jEsOP3FBOft+UvkebF6SyH+i7Ek0r/fQPk/1sihmk55A6MHOp2jeW\navlHodRRd/ZeYAK/1bJlDcfDD1xGnLGmJ5sjl9bAQwH0OEGZu0xQpdwfoq5b6qiy\nQSzYCKI3H547sd0E/itODh+10WUk76l+Grb47qoBuOlxzfwXzv9UsNR97B8q52Kk\nUo6fVxG2sq4KJMku18FHZH+UGbMSw67bQxY+zowKtWPWN5MZ+a5sciEDaQ0ZSA0c\n0ryzTAnrsCQve4cjeN56NvZ8VF3dFwQEPbsOakGA7MqEKI61bhIV2aQoXe0LS9Uz\nKZ5Ajb11AgMBAAECggEAKvHX6A1ZuRDJYj6jWe5ipLmzPki0JEKyeudpGd7rQ/xj\na6PyoLidLZ9oIiTHaFKyMSC2iL7J78Arqqul2tOsY+Di1QSPRQfJjz3Nxzs5Qa5Z\nw65BXEcmsHa0ztKLQ+50Se5c5qZ9GpqlASZhFsClzWBp8Po/Rge0CX+vtlB47XgG\nOlUUauYWZgNeHPlJy5eHp3VL9Th/hs0prN6kc9c+5ORv/ksl5pvpJwSv+r0JJXNn\nJBycRWCgmcPKnAQFv34s066FkmjBYKSIwEABDdWDRHFTiIicDx1lq9U1eofCZD7c\nWDcYjFSCsehCJZiasdlrRp7CpmXDXN628JxBPmbt1QKBgQDtnINUzDCIpTJdO/zX\n3iGtl7pezg3pSTvQ0mIJbT+IjP9r8ZEwHZzmT0eCpC7r0lVojpLu/V0b3xJb9FQc\neiYvizmA2bXcl8du8LDVAr8+u3ebi8Ali4Mqo1hL8BIaJsjXR3cvACGpOG28mOCU\nB37yMjHC1LADVCJReQ4x9ELV3wKBgQDABpC9oC2x4z/IAohauzADujD6Odrsb/dF\nVRqRgj9v72W4GxZLRV64OoDFgJMO7qZTRt9CLv7rKas6ViYpk+Ebux4uHT533RWI\nYySXXOulqKolbQPSbpR3wTqhaJ8cTR6NHXi8BP5Hm06IHAizMcQtdTh8GRl7XjDU\nQwMoCSxPKwKBgQC3lDb7qw7MZCW3VwOQnLSUdCev269vz/8A5aqM8fUmQRmOgoLU\nE+0HG7V6P/Noi4clUxI+x03KnNyIYwshPVaHYR+6Z3pUxod1NUzKJmcvxpMwgBai\na1mZ9b3gXcj+n3yIp1Rz4bwgC9Ls5YiNlgUEhrdfegfLapNhMxA+lCOXLQKBgCeS\nss2BbylTzdcoPnWEUhbSjjljJuzG/kx5h2opT22ABpR0cJm+iBCrbdJF9wiCwiAz\nYNtA2CQaiEETc/XpleCjJUsXl8IX+9IJrIbNDXssUTQ5TSpWw54SYkTVTMUGV595\nTWJiHQ0gwoRmUpyrSuSbXbKlcYztEl8MGGBt04XVAoGACZueLqgH5j39beR/SbCN\n2bJotadwsXPHKAsg7djFhpRbjes1ORLTHBSULZ7ltiKVu6M+N1Us+Tn2O1dp+2MK\nC9csPG7NtB8xjZTMcJv31KF48gFrRGxGFUN/ArTDLn4a9V7sCc9lRYFoVq2q0/4P\n2z2a48Db3fJF2ngOGxO5pB8=\n-----END PRIVATE KEY-----\n',
  },
});



async function transcribeSpeech(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['SPEECH_TRANSCRIPTION'],
    videoContext: {
      speechTranscriptionConfig: {
        languageCode: 'en-US',
        enableAutomaticPunctuation: true,
      },
    },
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const transcription = operationResult.annotationResults[0].speechTranscriptions[0];
  console.log(`Transcription: ${transcription.transcript}`);
  res.send('<video width="320" height="240" controls>  <source src="https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

transcribeSpeech('https://hackathon20-ravhad3964.quickbase.com/up/btv3y3ppi/g/rh/eg/va/EM.mp4');

});

/*
app.get('/home', (req, res) => {
  res.sendFile('index.html', { root: __dirname })
}); */


app.get('/chat', (req, res) => {
  res.sendFile('index1.html', { root: __dirname })
});


app.get('/bulk_store_success', (req, res) => {
  var projectId = req.query.projectId;
  var client_email = req.query.client_email;
  var private_key = req.query.private_key;
  var bucketName = req.query.bucketName;
  //console.log('projectId'+projectId);
  //console.log('client_email'+client_email);
  //console.log('private_key'+private_key);
  //console.log('bucketName'+bucketName);



  const { Storage } = require('@google-cloud/storage');

  const projectId1 = 'iconic-nation-410817';
  const client_email1 = "ravi-sa1@iconic-nation-410817.iam.gserviceaccount.com";
  const private_key1 = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyO3qCuDoTyV+m\nYbfNUVf/z5+jEsOP3FBOft+UvkebF6SyH+i7Ek0r/fQPk/1sihmk55A6MHOp2jeW\navlHodRRd/ZeYAK/1bJlDcfDD1xGnLGmJ5sjl9bAQwH0OEGZu0xQpdwfoq5b6qiy\nQSzYCKI3H547sd0E/itODh+10WUk76l+Grb47qoBuOlxzfwXzv9UsNR97B8q52Kk\nUo6fVxG2sq4KJMku18FHZH+UGbMSw67bQxY+zowKtWPWN5MZ+a5sciEDaQ0ZSA0c\n0ryzTAnrsCQve4cjeN56NvZ8VF3dFwQEPbsOakGA7MqEKI61bhIV2aQoXe0LS9Uz\nKZ5Ajb11AgMBAAECggEAKvHX6A1ZuRDJYj6jWe5ipLmzPki0JEKyeudpGd7rQ/xj\na6PyoLidLZ9oIiTHaFKyMSC2iL7J78Arqqul2tOsY+Di1QSPRQfJjz3Nxzs5Qa5Z\nw65BXEcmsHa0ztKLQ+50Se5c5qZ9GpqlASZhFsClzWBp8Po/Rge0CX+vtlB47XgG\nOlUUauYWZgNeHPlJy5eHp3VL9Th/hs0prN6kc9c+5ORv/ksl5pvpJwSv+r0JJXNn\nJBycRWCgmcPKnAQFv34s066FkmjBYKSIwEABDdWDRHFTiIicDx1lq9U1eofCZD7c\nWDcYjFSCsehCJZiasdlrRp7CpmXDXN628JxBPmbt1QKBgQDtnINUzDCIpTJdO/zX\n3iGtl7pezg3pSTvQ0mIJbT+IjP9r8ZEwHZzmT0eCpC7r0lVojpLu/V0b3xJb9FQc\neiYvizmA2bXcl8du8LDVAr8+u3ebi8Ali4Mqo1hL8BIaJsjXR3cvACGpOG28mOCU\nB37yMjHC1LADVCJReQ4x9ELV3wKBgQDABpC9oC2x4z/IAohauzADujD6Odrsb/dF\nVRqRgj9v72W4GxZLRV64OoDFgJMO7qZTRt9CLv7rKas6ViYpk+Ebux4uHT533RWI\nYySXXOulqKolbQPSbpR3wTqhaJ8cTR6NHXi8BP5Hm06IHAizMcQtdTh8GRl7XjDU\nQwMoCSxPKwKBgQC3lDb7qw7MZCW3VwOQnLSUdCev269vz/8A5aqM8fUmQRmOgoLU\nE+0HG7V6P/Noi4clUxI+x03KnNyIYwshPVaHYR+6Z3pUxod1NUzKJmcvxpMwgBai\na1mZ9b3gXcj+n3yIp1Rz4bwgC9Ls5YiNlgUEhrdfegfLapNhMxA+lCOXLQKBgCeS\nss2BbylTzdcoPnWEUhbSjjljJuzG/kx5h2opT22ABpR0cJm+iBCrbdJF9wiCwiAz\nYNtA2CQaiEETc/XpleCjJUsXl8IX+9IJrIbNDXssUTQ5TSpWw54SYkTVTMUGV595\nTWJiHQ0gwoRmUpyrSuSbXbKlcYztEl8MGGBt04XVAoGACZueLqgH5j39beR/SbCN\n2bJotadwsXPHKAsg7djFhpRbjes1ORLTHBSULZ7ltiKVu6M+N1Us+Tn2O1dp+2MK\nC9csPG7NtB8xjZTMcJv31KF48gFrRGxGFUN/ArTDLn4a9V7sCc9lRYFoVq2q0/4P\n2z2a48Db3fJF2ngOGxO5pB8=\n-----END PRIVATE KEY-----\n";


  const gcs = new Storage({
    projectId: projectId1,
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
    credentials: {
      client_email: client_email1,
      private_key: private_key1
    }
  });

  let bucketName1 = 'iconic-nation-410817.appspot.com';
  let bucket = gcs.bucket(bucketName1);
  bucket.getFiles({}, (err, files, apires) => {
    console.log("Total files available in Google Cloud Storage is " + files.length);
    var a;
    for (var i = 0; i < files.length; i++) {
      //console.log("Public URL");
      console.log("https://storage.googleapis.com/iconic-nation-410817.appspot.com/" + files[i].name);
      var path = "https://storage.googleapis.com/iconic-nation-410817.appspot.com/" + files[i].name;



      request.get(path, function(error, response, body) {
        ``
        if (!error && response.statusCode == 200) {
          data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
          //console.log(data);
          fs.writeFile("writeMe.txt", data);


          fetch('https://deep-index.moralis.io/api/v2/ipfs/uploadFolder', {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjY2ODM3OGE3LWVkMjItNDk0NS04NDM1LTFhMWUyMWE0YWQ1OCIsIm9yZ0lkIjoiMjEzMDM4IiwidXNlcklkIjoiMjEyNzE4IiwidHlwZUlkIjoiMzk2NTU3ZDItZjUwNi00NDQxLTlhYmEtMmUyZjM2OTBlNTFiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODU2Mzc4MTYsImV4cCI6NDg0MTM5NzgxNn0.Nsze3pKimlizkiimp4k6jE8aDEIWmAB_AuO5UCw-wVo',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify([
              {
                'path': path,
                'content': data
              }
            ])
          }).then(res => res.json())
            .then(jsonData => {
              console.log(JSON.stringify(jsonData[0]));



            });
        }
      });

    }
    res.send("Congratulations! Your files have been uploaded from Google Cloud Storage to IPFS Blockchain Storage.");
  });
});
/*
app.get('/bulk_mint', (req, res) => {
  res.send("<html><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><h2  style='color:blue;'>  Move Files from Google Cloud to IPFS</h2> <br/>          <br/><form action='./bulk_store_success' method='get'>  <label for='projectId'> GCP Project ID:</label>  <input type='text' id='projectId' name='projectId'><br><label for='client_email'>  Client Email:</label>  <input type='text' id='client_email' name='client_email'><br><label for='private_key'>  Private Key:</label>  <input type='text' id='private_key' name='private_key'><br><label for='bucketName'> Bucket Name:</label>  <input type='text' id='bucketName' name='bucketName'><br><br>   <input type='submit' value='Bulk Upload' style='background-color:blue; border-color:black; color:white;  width:auto;'></form>   </div>  </body></html>");

}); */

app.get('/send', (req, res) => {

  request.get('https://3.91.12.12/balance/saurabhksinha900.testnet', function(error, response, body) {
    ``
    if (!error && response.statusCode == 200) {
      data = parseFloat((Buffer.from(body)).toString('utf8').match(/[\d\.]+/));

      console.log(data);
      res.send("<html><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}/* Change styles for span and cancel button on extra small screens */@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='./home' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='./store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='./nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='./nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='./view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='./store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div>  <a href='./send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='./receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='./send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='./receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div></div><h2  style='color:blue;'>Send Asset</h2>    <form action='./send_success' method='get'>  <label for='asset'>Asset Name:</label>  <label for='asset_name'>NEAR</label><br><br><label for='amount'>Amount:</label>  <input type='text' id='amount' name='amount' value='19'><br><br><label for='receiver_id'>Receiver Account Address:</label>  <input type='text' id='receiver_id' name='receiver_id' value='saurabhksinha90.testnet'><br><br><label for='account'>Sender Account Address:</label>  <label for='account_value'>saurabhksinha900.testnet</label><br><br>   <label for='balance'>Wallet Balance:</label>  <label for='balance_value'>" + data + " NEAR</label><br><br>   <label for='balance'>Reserved for Storage:</label>  <label for='balance_value'>3.835 NEAR</label><br><br>   <label for='balance'>Reserved for Transactions:</label>  <label for='balance_value'>0.05 NEAR</label><br><br>   <label for='balance'>Available Balance:</label>  <label for='balance_value'>" + (data - 3.885) + " NEAR</label><br><br>   <input type='submit' value='Send' style='background-color:blue; border-color:black; color:white;  width:auto;'></form>   </div>  </body></html>");


    }
  });
});

app.get('/send_success', (req, res) => {
  var receiver_id = req.query.receiver_id;
  var amount = req.query.amount;
  var request = require('request');

  var options = {
    url: 'https://near-transfer.saurabhksinha90.repl.co/create-transaction?sender=saurabhksinha900.testnet&receiver=' + receiver_id + '&amt=' + amount
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body).actions[0].Transfer.deposit);
      res.send("<html><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='./home' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='./store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='./nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='./nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='./view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='./store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div>  <a href='./send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='./receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='./send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='./receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div></div><br/><B>Congratulations! </B>You have successfully transfered " + amount + " NEAR to " + receiver_id + ". Transaction ID: " + JSON.parse(body).hash + " <br/><table><tr><td>Hash:</td><td></td><td>" + JSON.parse(body).hash + "</td></tr><tr></tr><tr><td>Receiver ID:</td><td></td><td>" + JSON.parse(body).receiver_id + "</td></tr><tr></tr><tr><td>Nonce</td><td></td><td>" + JSON.parse(body).nonce + "</td></tr><tr></tr><tr><td>Public Key:</td><td></td><td>" + JSON.parse(body).public_key + "</td></tr><tr><tr><td>Signature:</td><td></td><td>" + JSON.parse(body).signature + "</td></tr><tr></tr><tr><td>Signer ID:</td><td></td><td>" + JSON.parse(body).signer_id + "</td></tr><tr></tr><tr><td>Account ID:</td><td></td><td>saurabhksinha900.testnet</td></tr><tr></tr></table><br/><a href='https://explorer.testnet.near.org/transactions/" + JSON.parse(body).hash + "' target='_blank'><input type='submit' value='Transaction Receipt' style='background-color:blue; border-color:black; color:white;  width:auto;'></div></body></html>");
    }
  }

  request(options, callback);


});

app.get('/receive', (req, res) => {

  res.send("<html><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}/* Change styles for span and cancel button on extra small screens */@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='./home' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='./store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='./nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='./nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='./view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='./store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div>  <a href='./send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='./receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='./send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='./receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div></div><h2  style='color:blue;'>Receive Asset</h2>      <br><br/><br><label for='account'>Account Address:</label>  <label for='account_value'>saurabhksinha900.testnet</label><br><br>   <br><br>      </div>  </body></html>");

});

app.get('/', (req, res) => {

  var options = {
    "method": "GET"
  };
  fetch('https://3.91.12.12/view_nft?account_id=saurabhksinha900.testnet', options).then(res => res.json())
    .then((jsontoken) => {
      console.log(jsontoken[0]);
      let text = '<html><link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><body><div class="w3-container">   <div class="w3-bar w3-black">    <a href="./home" class="w3-bar-item w3-button w3-mobile w3-green">Home</a>   <a href="./store_file" class="w3-bar-item w3-button w3-mobile">Upload File</a>    <a href="./nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">NFT <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="./nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>       <a href="./view_nft_marketplace" class="w3-bar-item w3-button w3-mobile">View NFT</a>        <a href="./store_file" class="w3-bar-item w3-button w3-mobile">Store NFT</a>     </div>    </div> <a href="./send" class="w3-bar-item w3-button w3-mobile">Send Asset</a><a href="./receive" class="w3-bar-item w3-button w3-mobile">Receive Asset</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">Asset <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="./send" class="w3-bar-item w3-button w3-mobile">Send</a>       <a href="./receive" class="w3-bar-item w3-button w3-mobile">Receive</a>         </div>    </div></div>';
      text = text + "<H1 align='center'  style='color:blue;'> Rewards and Recognition Platform</h1><br><br><table align='center' style='border: 1px solid black;'><tr style='border: 1px solid black;'><td align='center' style='border: 1px solid black;'><b>metadata_media</b></td><td align='center'style='border: 1px solid black;'> <b>token_id</b></td><td align='center' style='border: 1px solid black;'> <b>owner_id</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_title</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_description</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_copies</td><td align='center' style='border: 1px solid black;'> <b>Transfer NFT</b></td></tr>"

      for (var i = 0; i < jsontoken.length; i++) {

        text = text + "<tr style='border: 1px solid black;'><td align='center' style='border: 1px solid black;'> <a href='./nft_transfer?token_id=" + jsontoken[i].token_id + "&metadata_media=" + (jsontoken[i].metadata_media).replace("?", "%3F") + "&metadata_title=" + (jsontoken[i].metadata_title) + "&metadata_description=" + (jsontoken[i].metadata_description) + "&metadata_copies=" + (jsontoken[i].metadata_copies) + "&metadata_media_hash=" + (jsontoken[i].metadata_media_hash) + "&metadata_issued_at=" + (jsontoken[i].metadata_issued_at) + "&metadata_expires_at=" + (jsontoken[i].metadata_expires_at) + "&metadata_starts_at=" + (jsontoken[i].metadata_starts_at) + "&metadata_updated_at=" + (jsontoken[i].metadata_updated_at) + "&metadata_extra=" + (jsontoken[i].metadata_extra) + "&metadata_reference=" + (jsontoken[i].metadata_reference) + "&metadata_reference_hash=" + (jsontoken[i].metadata_reference_hash) + "&approved_account_ids=" + (jsontoken[i].approved_account_ids) + "&owner_id=" + (jsontoken[i].owner_id) + "'><img height='37px' width='37px' src='" + (jsontoken[i].metadata_media).replace("?", "%3F") + "'></a></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].token_id) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].owner_id) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_title) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_description) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_copies) + "</b></td><td align='center' style='border: 1px solid black;'> <a href='./nft_transfer?token_id=" + jsontoken[i].token_id + "&metadata_media=" + (jsontoken[i].metadata_media).replace("?", "%3F") + "&metadata_title=" + (jsontoken[i].metadata_title) + "&metadata_description=" + (jsontoken[i].metadata_description) + "&metadata_copies=" + (jsontoken[i].metadata_copies) + "&metadata_media_hash=" + (jsontoken[i].metadata_media_hash) + "&metadata_issued_at=" + (jsontoken[i].metadata_issued_at) + "&metadata_expires_at=" + (jsontoken[i].metadata_expires_at) + "&metadata_starts_at=" + (jsontoken[i].metadata_starts_at) + "&metadata_updated_at=" + (jsontoken[i].metadata_updated_at) + "&metadata_extra=" + (jsontoken[i].metadata_extra) + "&metadata_reference=" + (jsontoken[i].metadata_reference) + "&metadata_reference_hash=" + (jsontoken[i].metadata_reference_hash) + "&approved_account_ids=" + (jsontoken[i].approved_account_ids) + "&owner_id=" + (jsontoken[i].owner_id) + "'><button onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;block&quot;' style='background-color:blue; border-color:black; color:white;  width:auto;'>Transfer NFT!</button></a></td></tr>";
      }
      text = text + "</table></div><br/><br/></body></html>";

      res.send(text);
    });
});


app.get('/store_file', (req, res) => {

  res.send("<html><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}/* Change styles for span and cancel button on extra small screens */@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='./home' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='./store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='./nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='./nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='./view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='./store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div> <a href='./send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='./receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='./send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='./receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div> </div><h2  style='color:blue;'>Store File via Moralis on IPFS</h2>    <form action='./store_success' method='get'>  <label for='path'>Path:</label>  <input type='text' id='path' name='path'><br><br>   <input type='submit' value='Upload' style='background-color:blue; border-color:black; color:white;  width:auto;'></form>   </div>  </body></html>");

});

app.get('/store_success', (req, res) => {
  var path = (req.query.path).replace("?", "\?");
  console.log('path' + path);
  request.get(path, function(error, response, body) {
    ``
    if (!error && response.statusCode == 200) {
      data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
      //console.log(data);
      fs.writeFile("writeMe.txt", data);


      fetch('https://deep-index.moralis.io/api/v2/ipfs/uploadFolder', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjY2ODM3OGE3LWVkMjItNDk0NS04NDM1LTFhMWUyMWE0YWQ1OCIsIm9yZ0lkIjoiMjEzMDM4IiwidXNlcklkIjoiMjEyNzE4IiwidHlwZUlkIjoiMzk2NTU3ZDItZjUwNi00NDQxLTlhYmEtMmUyZjM2OTBlNTFiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODU2Mzc4MTYsImV4cCI6NDg0MTM5NzgxNn0.Nsze3pKimlizkiimp4k6jE8aDEIWmAB_AuO5UCw-wVo',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([
          {
            'path': path,
            'content': data
          }
        ])
      }).then(res => res.json())
        .then(jsonData => {
          let a = (JSON.stringify(jsonData[0].path).replace("?", "%3F").replace(/[&]/g, "%26")).substring(1, (JSON.stringify(jsonData[0].path).replace("?", "%3F").replace(/[&]/g, "%26")).length - 1);
          console.log(jsonData);
          res.send('<html><link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><body><div class="w3-container">   <div class="w3-bar w3-black">    <a href="./home" class="w3-bar-item w3-button w3-mobile w3-green">Home</a>   <a href="./store_file" class="w3-bar-item w3-button w3-mobile">Upload File</a>    <a href="./nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">NFT <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="./nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>       <a href="./view_nft_marketplace" class="w3-bar-item w3-button w3-mobile">View NFT</a>        <a href="./store_file" class="w3-bar-item w3-button w3-mobile">Store NFT</a>     </div>    </div> <a href="./send" class="w3-bar-item w3-button w3-mobile">Send Asset</a><a href="./send" class="w3-bar-item w3-button w3-mobile">Receive Asset</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">Asset <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="./send" class="w3-bar-item w3-button w3-mobile">Send</a>       <a href="./receive" class="w3-bar-item w3-button w3-mobile">Receive</a>         </div>    </div> </div><br/><b>Congratulations! Your file is successfully uploaded to IPFS via Moralis.</b><br/></br><img height="300px" src=' + JSON.stringify(jsonData[0].path).replace("?", "%3F") + '></br><br/><table><tr><td><b>File Path:</b><br/>' + path + '</td></tr><tr></tr><tr><td><br/><b>IPFS File Path:<br/></b>' + (JSON.stringify(jsonData[0].path).replace("?", "%3F")).substring(1, (JSON.stringify(jsonData[0].path).replace("?", "%3F")).length - 1) + '</td></tr></table><br/><a href="./store_file"><button style="background-color:grey; border-color:black; color:white; width:33%;" type="submit">BACK</button></a>     <a href="./nft_mint?metadata_media=' + a + '"><button style="background-color:green; border-color:black; color:white; width:33%;">MINT</button></a>     <a href="./home"><button  style="background-color:blue; border-color:black; color:white;  width:33%;" type="submit">HOME</button></a><br/><br/></div></body></html>')
        });
    }
  });
});
/*
app.get('/nft_mint', (req, res) => {
  var metadata_media = (req.query.metadata_media);

  console.log('hi' + metadata_media);
  res.send("<html><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='./home' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='./store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='./nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='./nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='./view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='./store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div> <a href='./send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='./receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='./send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='./receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div> </div><h2 style='color:blue;'>Store File via Moralis on IPFS</h2>   <div class='container'>  <form action='./nft_mint_success' method='get'>  <label for='token_id'><b>Token ID:</b></label>  <input type='text' id='token_id' name='token_id'value='This should be unique!'><label for='receiver_id'><b>Receiver ID:</b></label>  <input type='text' id='receiver_id' name='receiver_id' value='saurabhksinha900.testnet'><label for='description'><b>Description:</b></label>  <input type='text' id='description' name='description' value='Please write your description here!'><label for='contract'><b>Contract:</b></label>  <input type='text' id='contract' name='contract' value='saurabhksinha900.testnet'><label for='account_id'><b>Account ID:</b></label>  <input type='text' id='account_id' name='account_id' value='saurabhksinha900.testnet'><label for='seed_phrase'><b>Seed Phrase:</b></label>  <input type='text' id='seed_phrase' name='seed_phrase' value='next scene fury above pyramid travel chef help envelope invite surge slot'><label for='metadata_title'><b>Metadata Title:</b></label>  <input type='text' id='metadata_title' name='metadata_title' value='Test NFT'><label for='metadata_media'><b>Metadata Media:</b></label><input type='text' id='media' name='media' value=" + metadata_media.replace("?", "%3F").replace(/[&]/g, "%26") + "><br><br>   <input type='submit' value='Submit'></form>   </div></body></html>");

}); */

app.get('/nft_mint_success', (req, res) => {
	
	

    // Add more NFT objects as needed

	
  var token_id = req.query.token_id;
  var receiver_id = req.query.receiver_id;
  var description = req.query.description;
  var contract = req.query.contract;
  var account_id = req.query.account_id;
  var seed_phrase = req.query.seed_phrase;
  var metadata_title = req.query.metadata_title;
  var media = (req.query.media).replace("?", "%3F").replace(/[&]/g, "%26");
  console.log('NFT mint success!');
  console.log(token_id);
  console.log(receiver_id);
  console.log(description);
  console.log(contract);
  console.log(account_id);
  console.log(seed_phrase);
  console.log(metadata_title);
  console.log(media);

  var request = require('request');

  var options = {
    url: 'https://3.91.12.12/mint_nft?token_id=' + token_id + '&receiver_id=' + receiver_id + '&description=' + description + '&media=' + media.replace("?", "%3F").replace(/[&]/g, "%26") + '&contract=' + contract + '&account_id=' + account_id + '&seedphrase=' + seed_phrase + '&title=' + metadata_title
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
		
		const nft =   {
        token_id: req.query.token_id,
        receiver_id: req.query.receiver_id,
		description: req.query.description,
        contract: req.query.contract,
		account_id: req.query.account_id,
        seed_phrase: req.query.seed_phrase,
		metadata_title: req.query.metadata_title,
        media: req.query.media,
		body: body
       
    };
      console.log(body);
	  res.render('nft_success.ejs', { nft:nft  });
	  /*
      res.send("<html><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='./home' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='./store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='./nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='./nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='./view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='./store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div>  <a href='./send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='./receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='./send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='./receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div></div><br/><img height='300px' src='" + media + "'><br/><B>Congratulations! </B>Your NFT has been minted successfully. Transaction ID: " + body + "<br/><table><tr><td>Token ID:</td><td></td><td>" + token_id + "</td></tr><tr></tr><tr><td>Receiver ID:</td><td></td><td>" + receiver_id + "</td></tr><tr></tr><tr><td>Description</td><td></td><td>" + description + "</td></tr><tr></tr><tr><td>Metadata Title:</td><td></td><td>" + metadata_title + "</td></tr><tr><tr><td>Media:</td><td></td><td>" + media + "</td></tr><tr></tr><tr><td>Contract:</td><td></td><td>" + contract + "</td></tr><tr></tr><tr><td>Account ID:</td><td></td><td>" + account_id + "</td></tr><tr></tr><tr><td>Seed Phrase:</td><td></td><td>" + seed_phrase + "</td></tr><tr></tr></table><br/><a href='https://explorer.testnet.near.org/transactions/" + body + "' target='_blank'><input type='submit' value='Transaction Receipt' style='background-color:blue; border-color:black; color:white;  width:auto;'></div></body></html>");
	  */
    }
  }

  request(options, callback);


});
/*
app.get('/nft_transfer', (req, res) => {
  var token_id = req.query.token_id;
  var metadata_media = req.query.metadata_media;
  var owner_id = req.query.owner_id;
  var metadata_description = req.query.metadata_description;
  var metadata_title = req.query.metadata_title;
  var metadata_copies = req.query.metadata_copies;
  var metadata_media_hash = req.query.metadata_media_hash;
  var metadata_issued_at = req.query.metadata_issued_at;
  var metadata_expires_at = req.query.metadata_expires_at;
  var metadata_starts_at = req.query.metadata_starts_at;
  var metadata_updated_at = req.query.metadata_updated_at;
  var metadata_reference = req.query.metadata_reference;
  var metadata_reference_hash = req.query.metadata_reference_hash;
  var metadata_extra = req.query.metadata_extra;
  var metadata_reference = req.query.metadata_reference;
  var approved_account_ids = req.query.approved_account_ids;
  let text = "<head><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%;  padding: 12px 20px;  margin: 8px 0;  display: inline-block;  border: 1px solid #ccc;  box-sizing: border-box;}button {  background-color: #04AA6D;  color: white;  padding: 14px 20px;  margin: 8px 0;  border: none;  cursor: pointer;  width: 100%;}button:hover {  opacity: 0.8;}.cancelbtn {  width: auto;  padding: 10px 18px;  background-color: #f44336;}.imgcontainer {  text-align: center;  margin: 24px 0 12px 0;  position: relative;}img.avatar {  width: 20%;  border-radius: 50%;}.container {  padding: 16px;}span.psw {  float: right;  padding-top: 16px;}.modal {  display: none;   position: fixed;   z-index: 1;  left: 0;  top: 0;  width: 100%;  height: 100%;  overflow: auto;   background-color: rgb(0,0,0);   background-color: rgba(0,0,0,0.4);   padding-top: 60px;}.modal-content {  background-color: #fefefe;  margin: 5% auto 15% auto;   border: 1px solid #888;  width: 80%; }.close {  position: absolute;  right: 25px;  top: 0;  color: #000;  font-size: 35px;  font-weight: bold;}.close:hover,.close:focus {  color: red;  cursor: pointer;}.animate {  -webkit-animation: animatezoom 0.6s;  animation: animatezoom 0.6s}@-webkit-keyframes animatezoom {  from {-webkit-transform: scale(0)}   to {-webkit-transform: scale(1)}}  @keyframes animatezoom {  from {transform: scale(0)}   to {transform: scale(1)}}@media screen and (max-width: 300px) {  span.psw {     display: block;     float: none;  }  .cancelbtn {     width: 100%;  }}</style></head>  <link rel='stylesheet' href='/w3css/3/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css'><section>  <img class='mySlides' src='" + metadata_media + "'  style='width:50%; height:50%;'>  </section><section class='w3-container w3-center w3-content' style='max-width:1000px'>  <h2 class='w3-wide'>" + metadata_title + "</h2>  <p class='w3-opacity'><i>Owner ID: " + owner_id + "</i></p> <p class='w3-opacity'><i>Token ID: " + token_id + "</i></p> <p class='w3-opacity'><i>Metadata Media URL: " + metadata_media + "</i></p> <p class='w3-opacity'><i>Metadata Copies: " + metadata_copies + "</i></p><p class='w3-justify'>Metadata Description: " + metadata_description + "</p><p class='w3-justify'>Metadata Media Hash: " + metadata_media_hash + "</p><p class='w3-justify'>Metadata Issued At: " + metadata_issued_at + "</p><p class='w3-justify'>Metadata Expires At: " + metadata_expires_at + "</p><p class='w3-justify'>Metadata Starts At: " + metadata_starts_at + "</p><p class='w3-justify'>Metadata Updated At: " + metadata_updated_at + "</p><p class='w3-justify'>Metadata Extra: " + metadata_extra + "</p><p class='w3-justify'>Metadata Reference: " + metadata_reference + "</p><p class='w3-justify'>Metadata Reference Hash: " + metadata_reference_hash + "</p><p class='w3-justify'>Approved Account Ids: " + approved_account_ids + "</p> </section><button onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;block&quot'; style='width:auto;'>Transfer</button></br></br><footer class='w3-container w3-padding-64 w3-center w3-black w3-xlarge'>  <a ref='#'><i class='fa fa-facebook-official'></i></a>  <a href='#'><i class='fa fa-pinterest-p'></i></a>  <a href='#'><i class='fa fa-twitter'></i></a>  <a href='#'><i class='fa fa-flickr'></i></a>  <a href='#'><i class='fa fa-linkedin'></i></a>  <p class='w3-medium'>  </p></footer> <div id='id01' class='modal'>    <form class='modal-content animate' action='./success_nft_transfer' method='get'>    <div class='imgcontainer'>      <span onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;none&quot;' class='close' title='Close Modal'>&times;</span>      <img src='https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png' alt='Avatar' class='avatar'>    </div>    <div class='container'>      <label for='receiver_id'><b>Receiver Address</b></label>      <input type='text' placeholder='Enter Username' name='receiver_id' required>  <input type = 'hidden' name = 'token_id' value = '" + token_id + "' />               <button type='submit'>Transfer</button>        </div>    <div class='container' style='background-color:#f1f1f1'>      <button type='button' onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;none&quot;' class='cancelbtn'>Cancel</button>          </div>  </form></div><script>var modal = document.getElementById('id01');window.onclick = function(event) {    if (event.target == modal) {        modal.style.display = 'none';    }}</script>";
  res.send(text);
}); */
app.get('/success_nft_transfer', (req, res) => {

  var token_id = req.query.token_id;
  var receiver_id = req.query.receiver_id;
  var options = {
    "method": "GET"
  };
  fetch('https://3.91.12.12/transfer_nft?token_id=' + token_id + '&receiver_id=' + receiver_id + '&enforce_owner_id=saurabhksinha900.testnet&memo=Hi&contract=saurabhksinha900.testnet&seedphrase=next%20scene%20fury%20above%20pyramid%20travel%20chef%20help%20envelope%20invite%20surge%20slot', options).then(res => res.json())
    .then((jsontoken) => {
      res.send("<html><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='./home' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='./store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='./nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='./nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='./view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='./store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div>  <a href='./send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='./receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='./send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='./receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div></div><br/><b>Transaction ID: " + jsontoken.tx + "</b><br/></br> <br/>Transferred Token Id " + token_id + " to " + receiver_id + ".<br/><br/><a href='https://explorer.testnet.near.org/transactions/" + jsontoken.tx + "'>Click Here to see more details!</a>'</div></body></html>");
    });


});
app.get('/view_nft_marketplace', (req, res) => {

  var options = {
    "method": "GET"
  };
  fetch('https://3.91.12.12/view_nft?account_id=saurabhksinha900.testnet', options).then(res => res.json())
    .then((jsontoken) => {
      console.log(jsontoken[0]);
      let text = '<html><link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><body><div class="w3-container">   <div class="w3-bar w3-black">    <a href="./home" class="w3-bar-item w3-button w3-mobile w3-green">Home</a>   <a href="./store_file" class="w3-bar-item w3-button w3-mobile">Upload File</a>    <a href="./nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">NFT <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="./nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>       <a href="./view_nft_marketplace" class="w3-bar-item w3-button w3-mobile">View NFT</a>        <a href="./store_file" class="w3-bar-item w3-button w3-mobile">Store NFT</a>     </div>    </div> <a href="./send" class="w3-bar-item w3-button w3-mobile">Send Asset</a><a href="./receive" class="w3-bar-item w3-button w3-mobile">Receive Asset</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">Asset <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="./send" class="w3-bar-item w3-button w3-mobile">Send</a>       <a href="./receive" class="w3-bar-item w3-button w3-mobile">Receive</a>         </div>    </div></div>';
      text = text + "<H1 align='center'  style='color:blue;'> Rewards and Recognition Platform</h1><br><br><table align='center' style='border: 1px solid black;'><tr style='border: 1px solid black;'><td align='center' style='border: 1px solid black;'><b>metadata_media</b></td><td align='center'style='border: 1px solid black;'> <b>token_id</b></td><td align='center' style='border: 1px solid black;'> <b>owner_id</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_title</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_description</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_copies</td><td align='center' style='border: 1px solid black;'> <b>Transfer NFT</b></td></tr>"

      for (var i = 0; i < jsontoken.length; i++) {

        text = text + "<tr style='border: 1px solid black;'><td align='center' style='border: 1px solid black;'> <a href='./nft_transfer?token_id=" + jsontoken[i].token_id + "&metadata_media=" + (jsontoken[i].metadata_media).replace("?", "%3F") + "&metadata_title=" + (jsontoken[i].metadata_title) + "&metadata_description=" + (jsontoken[i].metadata_description) + "&metadata_copies=" + (jsontoken[i].metadata_copies) + "&metadata_media_hash=" + (jsontoken[i].metadata_media_hash) + "&metadata_issued_at=" + (jsontoken[i].metadata_issued_at) + "&metadata_expires_at=" + (jsontoken[i].metadata_expires_at) + "&metadata_starts_at=" + (jsontoken[i].metadata_starts_at) + "&metadata_updated_at=" + (jsontoken[i].metadata_updated_at) + "&metadata_extra=" + (jsontoken[i].metadata_extra) + "&metadata_reference=" + (jsontoken[i].metadata_reference) + "&metadata_reference_hash=" + (jsontoken[i].metadata_reference_hash) + "&approved_account_ids=" + (jsontoken[i].approved_account_ids) + "&owner_id=" + (jsontoken[i].owner_id) + "'><img height='37px' width='37px' src='" + (jsontoken[i].metadata_media).replace("?", "%3F") + "'></a></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].token_id) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].owner_id) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_title) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_description) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_copies) + "</b></td><td align='center' style='border: 1px solid black;'> <a href='./nft_transfer?token_id=" + jsontoken[i].token_id + "&metadata_media=" + (jsontoken[i].metadata_media).replace("?", "%3F") + "&metadata_title=" + (jsontoken[i].metadata_title) + "&metadata_description=" + (jsontoken[i].metadata_description) + "&metadata_copies=" + (jsontoken[i].metadata_copies) + "&metadata_media_hash=" + (jsontoken[i].metadata_media_hash) + "&metadata_issued_at=" + (jsontoken[i].metadata_issued_at) + "&metadata_expires_at=" + (jsontoken[i].metadata_expires_at) + "&metadata_starts_at=" + (jsontoken[i].metadata_starts_at) + "&metadata_updated_at=" + (jsontoken[i].metadata_updated_at) + "&metadata_extra=" + (jsontoken[i].metadata_extra) + "&metadata_reference=" + (jsontoken[i].metadata_reference) + "&metadata_reference_hash=" + (jsontoken[i].metadata_reference_hash) + "&approved_account_ids=" + (jsontoken[i].approved_account_ids) + "&owner_id=" + (jsontoken[i].owner_id) + "'><button onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;block&quot;' style='background-color:blue; border-color:black; color:white;  width:auto;'>Transfer NFT!</button></a></td></tr>";
      }
      text = text + "</table></div><br/><br/></body></html>";

      res.send(text);
    });
});


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))