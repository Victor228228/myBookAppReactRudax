export default class RenderId {
    renderId() {
        let stringHablon = "abcdefghijklmnopqrstuvwxyz1234567890-";
        let resString = "";
        while (resString.length < 16) {
            resString += stringHablon[Math.floor(Math.random() * stringHablon.length)];
        }
        return resString;
    }
}
