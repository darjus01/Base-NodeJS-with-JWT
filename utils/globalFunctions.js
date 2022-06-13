exports.createFullDateString = () => {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();

    let hour = d.getHours();
    let minute = d.getMinutes();
    let seconds = d.getSeconds();

    return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
};
