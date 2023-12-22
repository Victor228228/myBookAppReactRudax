export default class FireBase {
     async getData(url) {
        const res = await fetch(url)
         if (!res.ok) {
             throw new Error(`Could not fetch ${url}, статус: ${res.status}`);
         }
         return await res.json();

    }
    async sendData(url, data, method = "POST") {
         const res = await fetch(url, {
             method: method,
             body: JSON.stringify(data),
             headers: {
                 "Content-Type": "application/json"
             }
         });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, статус: ${res.status}`);
        } else {
            return res;
        }
    }
}






