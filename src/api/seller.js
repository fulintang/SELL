import request from '@/utils/request.js';

export default {
    getlist() {
        return request({
            url: '/api/seller',
            method: 'get'
        });
    }
};
