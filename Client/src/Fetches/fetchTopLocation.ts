export  const fetchTopLocation = async()=>{
    try {
        const res: Response = await fetch(`http://localhost:8888/api/location/top-location`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(body)
        });
        if (!res.ok) {
          return "Can`t get top organization";
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);    
    }
}