/* eslint-disable react-hooks/exhaustive-deps */
const { useState, useEffect } = require("react");
const FormData = require("form-data");
const fetch = require("node-fetch");

async function _fetch(links, data, headers) {

  try {

    var myHeaders = new Headers();

    const requestOptions = {
      method: headers.method ? headers.method : 'GET',
    };

    for (let key in headers) {
      if (headers[key] !== undefined && headers[key] !== null && key !== "method") {
        myHeaders.append(key, data[key]);
      }
    }

    requestOptions.headers = myHeaders;

    if(headers.method.toLocaleUpperCase() === "POST")
    {
      var formdata = new FormData();

      for (let key in data) {
        if (data[key] !== undefined && data[key] !== null) {
          formdata.append(key, data[key]);
        }
      }
      requestOptions.body = formdata;
    }

    if(headers.method.toLocaleUpperCase() === "GET")
    {
      links = `${links}?${new URLSearchParams(data).toString()}`
    }

    let response = await fetch(links, headers);
    let responseJson = await response.json();
    if (response.status === 200) {
      return {
        ...responseJson,
        status: true,
      };
    } else {
      return {
        ...responseJson,
        status: false,
        results: {
          code: [response.status],
        },
      };
    }
  } catch (error) {
    return {
      status: false,
      data: [],
      results: {
        code: [500],
      },
      error,
    };
  }
}

const usePagination = ({ url, query, count, page, onPageChange, headers }) => {
  query = query ? query : {};
  page = page ? parseInt(page) : 1;
  count = count ? count : 10;
  onPageChange = onPageChange ? onPageChange : () => null;
  headers = headers ? headers : {};

  const [data, setData] = useState([]);
  const [_page, setPage] = useState(parseInt(page));
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getFromApi(page).then((response) => {
      if (response.status) {
        //console.log(response.results);
        if (isMounted) {
          setData(response.results.data);
          setPageCount(Math.ceil(response.results.count_all / count));
          setPage(page);
          setLoading(false);
        }
      } else {
        if (isMounted) {
          setData([]);
          setLoading(false);
        }
      }
    });
    return () => (isMounted = false);
  }, [page]);

  const getFromApi = async (p) => {
    p = parseInt(p);

    const offset = count * (p - 1);
    const response = await _fetch(
      url,
      { ...query, limit: count, offset },
      headers
    );
    return response;
  };

  const paginate = (p) => {
    p = parseInt(p);
    //console.log((p - 1) , pageCount);
    if (p - 1 >= pageCount) {
      return false;
    }
    setMore(true);
    getFromApi(p).then((response) => {
      if (response.status) {
        setData([...data, ...response.results.data]);
      }
      setMore(false);
    });
    setPage(p);
    onPageChange(p);
  };

  return {
    page: _page,
    setPage,
    data,
    loading,
    moreLoading: more,
    pageCount,
    paginate,
  };
};

module.exports = usePagination;
