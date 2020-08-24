# dynamicmasters

## Installation

**Installation is done using the npm install command**
```
npm install dynamicmasters
```

- **simple to use**
```
const dynamicmasters = require('dynamicmasters')
dynamicmasters.master(action, params)
```


- **action** you can pass following action:
```
CREATE
UPDATE
SOFTDELETE
DELETE
VIEW

```

- **Methods of dynamicmasters**
```
1.master  //for master crud operations
2.country //for country crud operations
3.state  //for state crud operations
4.city  //for city crud operations

```

## Example \

```
const dynamicmasters = require('dynamicmasters')
app.post('/master/create', async (req, res) => {
    try {
        let params = {
            name: req.body.name,
        }
        let action = 'CREATE'
        let response = await dynamicmasters.master(action, params)
        return res.send(response)
    } catch (error) {
        console.log('error', error)
        res.send(error)

    }
})
```



## https://github.com/rajt26/dynamicmasters_demo