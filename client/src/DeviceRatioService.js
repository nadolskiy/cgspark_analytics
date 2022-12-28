import axios from 'axios';

const url = 'https://stormy-brushlands-76369.herokuapp.com/api/etorox/';

class DeviceRatioService {
    // Gett Device Ratio
    static getRatio() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(screenSize => ({
                        ...screenSize
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });

        // return new Promise(async (resolve, reject) => {
        //     try {
        //         const res = await axios.get(url);
        //         const data = res.data;
        //         resolve(data.map(screenSize=>({
        //             ...screenSize,
        //             // screenSize: screenSize.screenSize
        //         })));
        //     } catch(err) {
        //         reject(err);
        //     }
        // })
    }
}

export default DeviceRatioService