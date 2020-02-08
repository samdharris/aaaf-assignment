import moment from "moment";
const dateFormat = "DD/MM/YYYY HH:mm:ss";
export const format = data => {
    return {
        ...data,
        createdAt: moment(data.createdAt).format(dateFormat),
        updatedAt: moment(data.updatedAt).format(dateFormat)
    };
};
