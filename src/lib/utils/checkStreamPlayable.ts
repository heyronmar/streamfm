export function checkStreamPlayable(url: string, timeout = 5000): Promise<boolean> {
    return new Promise((resolve) => {
        const audio = new Audio(url);
        let resolved = false;

        const timer = setTimeout(() => {
        if (!resolved) {
            resolved = true;
            resolve(false); // Timeout: not playable
        }
        }, timeout);

        const cleanup = () => {
        clearTimeout(timer);
        audio.removeEventListener('canplaythrough', onCanPlay);
        audio.removeEventListener('error', onError);
        };

        const onCanPlay = () => {
        if (!resolved) {
            resolved = true;
            cleanup();
            resolve(true);
        }
        };

        const onError = () => {
        if (!resolved) {
            resolved = true;
            cleanup();
            resolve(false);
        }
        };

        audio.addEventListener('canplaythrough', onCanPlay);
        audio.addEventListener('error', onError);
        audio.load();
    });
}