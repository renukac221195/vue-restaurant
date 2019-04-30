import axios from "axios";

export default function callService(url) {
    return new Promise((resolve) => {
        axios.get(url)
        .then(response => {
            resolve(response);
        });
    })
}
