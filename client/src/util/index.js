import moment from "moment";
const dateFormat = "DD/MM/YYYY HH:mm:ss";
export const format = data => {
    const newData = { ...data };
    if (typeof data.createdAt !== "undefined") {
        data.createdAt = moment(data.createdAt).format(dateFormat);
    }

    if (typeof data.createdAt !== "undefined") {
        data.updatedAt = moment(data.updatedAt).format(dateFormat);
    }
    return newData;
};
