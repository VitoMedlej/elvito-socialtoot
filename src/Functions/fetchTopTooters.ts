const fetchTopTooters = async (qty:number) => {
    const {MongoClient} = require('mongodb')
    const url = process.env.URI;

    const client = new MongoClient(url);
    try {

        const users = await client
            .db("SocialToot")
            .collection("Users")
            .aggregate([
                {
                    $project: {
                        "password": 0,
                        'email': 0
                    }
                }
            ])
            .sort({tootsGiven: -1})
            .limit(qty|| 7)
            .toArray();

        if (!users) {
            throw 'Could not fetch tooters'
        }
        

        return   users
    }
    catch(e){
        console.log('e: ', e);

    }
    finally {
        await client.close()
    }
}
export default fetchTopTooters