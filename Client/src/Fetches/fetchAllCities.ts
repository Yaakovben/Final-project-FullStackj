export  const fetchallCities = async()=>{
    try {
        const res: Response = await fetch("http://localhost:8888/api/location/all-cities", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          return "Can`t all cities";
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);    
    }
}