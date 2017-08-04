abstract class BaseCtrl {

    abstract model: any;

    /* GET ALL DATA */
    getAll = (req, res) => {
        this.model.find({}, (err, docs) => {
            if(err)
                return console.error(err);

            res.json(docs);
        });
    };

    /* COUNTING DATA */
    count = (req, res) => {
        this.model.count((err, count) => {
            if(err)
                return console.error(err);

            res.json(count);
        })
    };

    /* INSERT DATA */
    insert = (req, res) => {
        
        const obj = new this.model(req.body);

        obj.save((err, item) => {
            //1100 is the code for duplication key
            if(err && err.code == 1100)
                res.sendStatus(400);

            if(err)
                return console.error(err);

            res.status(200).json(item);
        });

    };

    /* GET BY ID */
    get = (req, res) => {
        this.model.findOne({_id: req.params.id } , (err , obj) => {
            if(err)
                return console.error(err);
            res.json(obj);
        });
    }

    /* UPDATE BY ID */
    update = (req, res) => {
        this.model.findOneAndUpdate({_id: req.params.id}, req.body , (err) => {
            if(err)
                return console.error(err);

            res.sendStatus(200);
        });
    };

    /* DELETE BY ID */
    delete = (req, res) => {
        this.model.findOneAndRemove({_id: req.params.id}, (err) => {
            if(err)
                return console.error(err);

            res.sendStatus(200);
        });
    };
}

export default BaseCtrl;