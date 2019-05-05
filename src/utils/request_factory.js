import axios from 'axios';

export default {

    post(endpoint, data, headers) {
        return new Promise ((resolve, reject) => {
            axios.post (endpoint, data, headers || {})
                .then ((response) => {
                    resolve (response.data);
                })
                .catch ((error) => {
                    reject (error);
                });
        });
    },
    get(endpoint) {
        return new Promise ((resolve, reject) => {
            axios.get (endpoint, { crossdomain: true })
                .then ((response) => {
                    resolve (response.data);
                })
                .catch ((error) => {
                    reject (error);
                });
        });
    },
    all(ajaxCalls) {
        return new Promise ((resolve, reject) => {
            axios.all (ajaxCalls)
                .then (axios.spread ((acct, perms) => {
                    // Both requests are now complete
                    resolve (acct, perms);
                })).catch ((error) => {
                reject (error);
            })
        });
    }
};