import { Storage } from "../store/singlton";

async function toServer(type,data) {
    console.log(document.getElementById("imya"));
    let response = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
    });
    response=  await response.json();
    response = await JSON.parse(response);
    console.warn("!!!", response)
    const storage = new Storage()
    storage.setData(type, response)
    document.getElementById("result").innerHTML = `!!!${response.name}`;
    return response;
}

export default toServer;