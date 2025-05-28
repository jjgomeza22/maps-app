export const getUserLocation = async (): Promise<[number, number]> => {
    return new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                resolve([coords.longitude, coords.latitude]);
            },
            ( err ) => {
                alert('No se pudo obtener la geolocalización');
                console.error(err);
                reject(new Error('no se pudo obtener la geolocation'));
            }
        )
    })
}