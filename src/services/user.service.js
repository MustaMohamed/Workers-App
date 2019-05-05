import requestFactory from '../utils/request_factory';

export default {
    userLogin: (user) => {
        return requestFactory.get('https://jsonplaceholder.typicode.com/users/1');
    }
};
