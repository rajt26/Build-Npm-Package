# dynemicmasters

## Installation

**Installation is done using the npm install command**
```
npm install dynemicmasters
```

- **simple to use**
```
const dynemicmasters = require('dynemicmasters')
dynemicmasters.master(action, params)
```


- **action** you can pass following action:
```
CREATE
UPDATE
SOFTDELETE
DELETE
VIEW

```

- **Methods of dynemicmasters**
```
1.master  //for master crud operations
2.country //for country crud operations
3.state  //for state crud operations
4.city  //for city crud operations

```

## Example \

```
const dynemicmasters = require('dynemicmasters')
app.post('/master/create', async (req, res) => {
    try {
        let params = {
            name: req.body.name,
        }
        let action = 'CREATE'
        let response = await dynemicmasters.master(action, params)
        return res.send(response)
    } catch (error) {
        console.log('error', error)
        res.send(error)

    }
})
```



## https://github.com/rajt26/dynemicmasters_demo