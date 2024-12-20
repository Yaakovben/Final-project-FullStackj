export  const fetchTop = async(url:string)=>{
    try {
        const res: Response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
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