import { useEffect, useState } from "react";
import axios from "axios";

const useUserSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let Cancel;
    axios({
      method: "GET",
      url: "https://randomuser.me/api",
      params: {
        page: pageNumber,
        results: 50,
        seed: query,
        inc: "name,login,email,cell,picture",
        noinfo: true,
      },
      cancelToken: new axios.CancelToken((c) => (Cancel = c)),
    })
      .then((response) => {
        setUsers((preUsers) => {
          return [
            ...preUsers,
            ...response.data.results.map((u) => {
              return {
                name: `${u.name.title} ${u.name.first} ${u.name.last}`,
                id: u.login.uuid,
                email: u.email,
                cell: u.cell,
                thumbnail: u.picture.thumbnail
              };
            }),
          ];
        });
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(true);
      })
      .then(() => {
        setLoading(false);
      });
    return () => Cancel();
  }, [query, pageNumber]);

  return { loading, error, users };
};

export default useUserSearch;
