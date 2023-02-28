export const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60) < 60
                    ? '0' + Math.floor(seconds / 60)
                    : Math.floor(seconds / 60)
    const sec = seconds % 60 < 10
                    ? '0' + Math.floor(seconds % 60)
                    : Math.floor(seconds % 60)
    return `${min} : ${sec}`;
}