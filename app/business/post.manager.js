import postDAO from '../DAO/postDAO';

function create(context) {
    async function query() {
        let result = postDAO.query();
        if (result) {
            return result;
        }
    }

    async function get(id) {
        let result = await postDAO.get(id);
        if (result) {
            return result;
        }
    }

    async function deleteOne(id) {
        let result = await postDAO.deleteOne(id);
        if (result) {
            return result;
        }
    }

    async function createNewOrUpdate(data) {
        let result = await postDAO.createNewOrUpdate(data);
        if (result) {
            return result;
        }
    }

    return {
        query: query,
        get: get,
        createNewOrUpdate: createNewOrUpdate,
        deleteOne: deleteOne,
    };
}

export default {
    create: create
};
