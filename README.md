# @meksiabdou/usepagination

A custom React Hook for `pagination`.


[![npm version](https://badge.fury.io/js/%40use-it%2Finterval.svg)](https://badge.fury.io/js/%40use-it%2Finterval)



## Installation

```bash
$ npm i @meksiabdou/usepagination
```

or

```bash
$ yarn add @meksiabdou/usepagination
```

## Usage

Here is a basic setup.

```js
import usePagination from '@meksiabdou/usepagination';
```


### Parameters

| Name | Type | Default Value |
|:------:|:------:|:---------------:|
| url | String | none |
| query | Object | {} |
| count | Number | 10 |
| page | Number | 1 |
| onPageChange | Function | null |
| headers | Object | {} |


### Return

| Name | Type | description |
|:------:|:------:|:---------------:|
| data | Object | The data is retrieved from api | 
| page | Number | Page number| 
| setPage | Function | Set page number | 
| paginate | Function | Function form pagination | 
| loading | Boolean | Loading | 
| moreLoading | Boolean | Loading on call paginate| 
| pageCount | Number | number of pages| 


## Example

```js
import React, { useState } from 'react';
import usePagination from '@meksiabdou/usepagination';


const Stores = () => {

    const url = "http://example.com/api/stores";
    const query = {active : 1};
    const count = 10;
    const currentPage = 1;
    const onPageChange = (p) => {

      window.history.pushState(
        {},
        null,
        `${window.location.origin}/#${pathname}?p=${p}`
      );
    
    };
    headers = {token : "mytoken"};

    const {
    page,
    setPage,
    data,
    loading,
    more,
    pageCount,
    paginate,
    } = usePagination({
        url : url, 
        query : query, 
        responseKeys: responseKeys,
        count: count, 
        page : currentPage,  
        onPageChange: onPageChange,
        headers : headers,
    });

    return (<div>
        {
            data.map((item, index) => {
                return <p key={index}>{item.name}</p>
            })
        }
        <button onclick={paginate}>more - page {page} / {pageCount}</button>
    </div>);
}

export default Stores;
```


## Request

```
http://example.com/api/stores?limit=10&offset&active=1
```

## Response

Output with status `200 OK`:

```json
{
    "results" : {
        "count_all" : 150,
        "data" : [
            {
                "id" : 1,
                "name" : "aliexpress",
            },
            {
                "id" : 2,
                "name" : "bengood",
            },
            {
                "id" : 3,
                "name" : "Gearbest",
            },
            ...
        ],
    },
    "status" : true,
}
```

## Live demo

You can view/edit the sample code above on CodeSandbox.

[![Edit demo app on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/)

## License

**[MIT](LICENSE)** Licensed

