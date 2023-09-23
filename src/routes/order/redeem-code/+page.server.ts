import { browser } from '$app/environment';
export async function load({ url }) {

    const code = await redeemCode(url.searchParams.get('userId'), url.searchParams.get('activationCode'))

    return code;
}



async function redeemCode(userId: any, activationCode: any)
{
	const payload: any = {
        'userId': userId,
        'activationCode': activationCode
    }

    var formBody: any = [];
    for (var property in payload) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(payload[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

	const options = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: formBody,
	  };

	const response = await fetch('https://api.brelshaza.com/v3/data/kofi-expansion', options);
	const data = await response.json();

	return data;

}