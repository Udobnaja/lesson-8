const TIMEOUT = 800;

const sendToServer = async (data) => {
    // Выполняется какая то асинхронная операция

    let id = await setTimeout(() => {
        clearTimeout(id);
    }, TIMEOUT);

    return data;
};

export { sendToServer }