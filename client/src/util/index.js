import moment from "moment";
const dateFormat = "DD/MM/YYYY HH:mm:ss";
import _ from "lodash";
export const format = data => {
    Object.keys(data).forEach(key => {
        if (_.isArray(data[key])) {
            data[key] = data[key].map(v => format(v));
            console.log(data[key]);
        }
    });

    return {
        ...data,
        createdAt: moment(data.createdAt).format(dateFormat),
        updatedAt: moment(data.updatedAt).format(dateFormat)
    };
};
