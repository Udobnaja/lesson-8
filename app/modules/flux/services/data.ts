const TIMEOUT = 800;

const sendToServer = (data) => {
    // Выполняется какая то асинхронная операция

    return new Promise((resolve, reject) => {
        const id = setTimeout(() => {
            resolve(data);
            clearTimeout(id);
        }, TIMEOUT);
        // reject() if
    });
};

export { sendToServer };
